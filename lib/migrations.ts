/**
 * Migration Utilities for Drizzle ORM
 * Provides migration execution, rollback, and status tracking
 */

import fs from 'fs';
import path from 'path';
import { db } from './db';
import { sql } from 'drizzle-orm';

/**
 * Migration metadata stored in database
 */
interface MigrationRecord {
  id: string;
  name: string;
  executedAt: Date;
  hash: string;
  status: 'success' | 'failed' | 'rolled_back';
}

/**
 * Create migrations table if it doesn't exist
 */
async function ensureMigrationsTable() {
  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS _migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP DEFAULT NOW(),
        hash VARCHAR(255),
        status VARCHAR(50) DEFAULT 'success'
      )
    `);
  } catch (error) {
    console.error('Error creating migrations table:', error);
    throw error;
  }
}

/**
 * Get all executed migrations
 */
async function getExecutedMigrations(): Promise<MigrationRecord[]> {
  try {
    const result = await db.execute(sql`
      SELECT name, executed_at as executedAt, hash, status 
      FROM _migrations 
      ORDER BY executed_at ASC
    `);
    return result.rows as unknown as MigrationRecord[];
  } catch (error) {
    console.error('Error getting migrations:', error);
    return [];
  }
}

/**
 * Record a migration execution
 */
async function recordMigration(name: string, hash: string, status: 'success' | 'failed' = 'success') {
  try {
    await db.execute(sql`
      INSERT INTO _migrations (name, hash, status, executed_at)
      VALUES (${name}, ${hash}, ${status}, NOW())
      ON CONFLICT (name) DO UPDATE SET status = ${status}
    `);
  } catch (error) {
    console.error('Error recording migration:', error);
    throw error;
  }
}

/**
 * Calculate hash of migration content for verification
 */
function calculateHash(content: string): string {
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(content).digest('hex');
}

/**
 * Get all migration files from drizzle directory
 */
function getMigrationFiles(): string[] {
  const drizzlePath = path.join(process.cwd(), 'drizzle');
  if (!fs.existsSync(drizzlePath)) {
    return [];
  }
  
  return fs.readdirSync(drizzlePath)
    .filter(file => file.endsWith('.sql') || file.endsWith('.ts'))
    .sort();
}

/**
 * Read migration file content
 */
function readMigrationFile(filename: string): string {
  const filePath = path.join(process.cwd(), 'drizzle', filename);
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * Execute pending migrations
 */
async function runPendingMigrations() {
  await ensureMigrationsTable();
  
  const executed = await getExecutedMigrations();
  const executedNames = new Set(executed.map(m => m.name));
  
  const allMigrations = getMigrationFiles();
  const pending = allMigrations.filter(name => !executedNames.has(name));
  
  if (pending.length === 0) {
    console.log('No pending migrations');
    return;
  }
  
  console.log(`Found ${pending.length} pending migrations`);
  
  for (const migration of pending) {
    try {
      const content = readMigrationFile(migration);
      const hash = calculateHash(content);
      
      console.log(`Executing migration: ${migration}`);
      
      // Execute the migration SQL
      if (migration.endsWith('.sql')) {
        await db.execute(sql.raw(content));
      }
      
      await recordMigration(migration, hash, 'success');
      console.log(`✓ Migration ${migration} completed successfully`);
    } catch (error) {
      console.error(`✗ Migration ${migration} failed:`, error);
      await recordMigration(migration, '', 'failed');
      throw error;
    }
  }
}

/**
 * Rollback the last N migrations
 */
async function rollbackMigrations(steps: number = 1) {
  await ensureMigrationsTable();
  
  const executed = await getExecutedMigrations();
  const toRollback = executed.reverse().slice(0, steps);
  
  if (toRollback.length === 0) {
    console.log('No migrations to rollback');
    return;
  }
  
  console.log(`Rolling back ${toRollback.length} migrations`);
  
  for (const migration of toRollback) {
    try {
      console.log(`Rolling back: ${migration.name}`);
      
      // Mark as rolled back (actual rollback SQL should be in down migrations)
      await db.execute(sql`
        UPDATE _migrations SET status = 'rolled_back' WHERE name = ${migration.name}
      `);
      
      console.log(`✓ Rollback ${migration.name} recorded`);
    } catch (error) {
      console.error(`✗ Rollback ${migration.name} failed:`, error);
      throw error;
    }
  }
}

/**
 * Get migration status
 */
async function getMigrationStatus() {
  await ensureMigrationsTable();
  
  const executed = await getExecutedMigrations();
  const pending = getMigrationFiles().filter(
    name => !executed.some(m => m.name === name)
  );
  
  console.log('\n=== Migration Status ===');
  console.log(`\nExecuted Migrations (${executed.length}):`);
  executed.forEach(m => {
    console.log(`  ✓ ${m.name} - ${m.status} (${m.executedAt})`);
  });
  
  if (pending.length > 0) {
    console.log(`\nPending Migrations (${pending.length}):`);
    pending.forEach(name => {
      console.log(`  ○ ${name}`);
    });
  } else {
    console.log('\n✓ All migrations completed');
  }
}

export {
  runPendingMigrations,
  rollbackMigrations,
  getMigrationStatus,
  ensureMigrationsTable,
  recordMigration,
  getExecutedMigrations,
};
