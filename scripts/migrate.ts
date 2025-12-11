#!/usr/bin/env node
/**
 * Migration runner script
 * Usage: npx tsx scripts/migrate.ts [command] [options]
 * 
 * Commands:
 *   up       - Run all pending migrations
 *   down     - Rollback last migration  
 *   status   - Show migration status
 *   reset    - Rollback all migrations (dangerous!)
 */

import { 
  runPendingMigrations, 
  rollbackMigrations, 
  getMigrationStatus 
} from '../lib/migrations';

const command = process.argv[2] || 'up';
const steps = parseInt(process.argv[3] || '1', 10);

async function main() {
  try {
    console.log(`\n🔄 Running migration command: ${command}\n`);
    
    switch (command) {
      case 'up':
        await runPendingMigrations();
        break;
      
      case 'down':
        if (steps > 0) {
          await rollbackMigrations(steps);
        } else {
          console.error('Invalid step count');
          process.exit(1);
        }
        break;
      
      case 'status':
        await getMigrationStatus();
        break;
      
      case 'reset':
        console.warn('⚠️  WARNING: This will rollback ALL migrations!');
        if (process.argv[3] !== '--force') {
          console.log('Use --force flag to confirm: npm run db:migrate reset --force');
          process.exit(1);
        }
        await rollbackMigrations(999);
        break;
      
      default:
        console.error(`Unknown command: ${command}`);
        console.log('\nAvailable commands: up, down, status, reset');
        process.exit(1);
    }
    
    console.log('\n✅ Migration completed successfully\n');
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

main();
