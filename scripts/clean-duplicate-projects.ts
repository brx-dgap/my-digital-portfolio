import { db, projects } from "@/lib/db";
import { sql } from "drizzle-orm";

/**
 * Script to identify and clean up duplicate projects
 * Run with: npx tsx scripts/clean-duplicate-projects.ts
 */

async function cleanDuplicateProjects() {
  try {
    console.log("🔍 Fetching all projects...\n");
    
    // Get all projects
    const allProjects = await db.select().from(projects);
    
    console.log(`Found ${allProjects.length} total projects\n`);
    console.log("📋 Current Projects:");
    console.log("=".repeat(80));
    
    allProjects.forEach((project, index) => {
      console.log(`\n${index + 1}. ID: ${project.id}`);
      console.log(`   Title: ${project.title}`);
      console.log(`   Description: ${project.description.substring(0, 60)}...`);
      console.log(`   Created: ${project.createdAt}`);
    });
    
    console.log("\n" + "=".repeat(80));
    
    // Group by title to find duplicates
    const titleGroups: Record<string, typeof allProjects> = {};
    allProjects.forEach(project => {
      const title = project.title.trim().toLowerCase();
      if (!titleGroups[title]) {
        titleGroups[title] = [];
      }
      titleGroups[title].push(project);
    });
    
    // Find duplicates
    const duplicates = Object.entries(titleGroups).filter(([_, group]) => group.length > 1);
    
    if (duplicates.length === 0) {
      console.log("\n✅ No duplicate projects found!");
      return;
    }
    
    console.log(`\n⚠️  Found ${duplicates.length} sets of duplicate projects:\n`);
    
    duplicates.forEach(([title, group]) => {
      console.log(`\n📦 "${group[0].title}" has ${group.length} duplicates:`);
      group.forEach((project, idx) => {
        console.log(`   ${idx + 1}. ID: ${project.id} | Created: ${project.createdAt}`);
      });
    });
    
    console.log("\n" + "=".repeat(80));
    console.log("\n🗑️  To delete duplicates, keeping only the oldest (first) project:");
    console.log("    Run this script with --delete flag\n");
    console.log("    Example: npx tsx scripts/clean-duplicate-projects.ts --delete\n");
    
    // Check if delete flag is provided
    if (process.argv.includes("--delete")) {
      console.log("\n🚀 Starting deletion process...\n");
      
      let deletedCount = 0;
      
      for (const [title, group] of duplicates) {
        // Sort by createdAt to keep the oldest
        const sorted = [...group].sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateA - dateB;
        });
        
        // Keep the first (oldest), delete the rest
        const toKeep = sorted[0];
        const toDelete = sorted.slice(1);
        
        console.log(`\n📦 Processing "${title}"...`);
        console.log(`   ✅ Keeping ID ${toKeep.id} (created ${toKeep.createdAt})`);
        
        for (const project of toDelete) {
          console.log(`   🗑️  Deleting ID ${project.id} (created ${project.createdAt})`);
          await db.delete(projects).where(sql`${projects.id} = ${project.id}`);
          deletedCount++;
        }
      }
      
      console.log("\n" + "=".repeat(80));
      console.log(`\n✅ Cleanup complete! Deleted ${deletedCount} duplicate projects.`);
      
      // Show remaining projects
      const remainingProjects = await db.select().from(projects);
      console.log(`\n📊 Remaining projects: ${remainingProjects.length}\n`);
      remainingProjects.forEach((project, index) => {
        console.log(`${index + 1}. ${project.title} (ID: ${project.id})`);
      });
    }
    
  } catch (error) {
    console.error("\n❌ Error:", error);
    throw error;
  } finally {
    process.exit(0);
  }
}

cleanDuplicateProjects();
