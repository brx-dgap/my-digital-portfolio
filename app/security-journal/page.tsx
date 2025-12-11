import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import JournalEntries from "@/components/journal-entries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle, Clock, FileText } from "lucide-react";

/**
 * Security Journal - Week 3 Submission Requirements
 * 
 * This page documents all mini projects and their submission requirements
 * Students must complete all items for a mini project before submission
 */

export default async function SecurityJournalPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  // Mini project definitions with requirements
  const miniProjects = [
    {
      id: "mp-auth",
      title: "Authentication & Authorization Implementation",
      description: "Implement secure Clerk authentication with role-based access control",
      requirements: [
        "✓ Clerk integration with protected routes (/admin, /security-journal, /resources, /projects)",
        "✓ User role system (admin, user) with database storage",
        "✓ First user automatically becomes admin",
        "✓ Middleware protecting sensitive routes",
        "✓ AuthSync component syncing Clerk users to database",
        "✓ Environment variables properly secured (.env.local, .env.example)",
      ],
      submission_category: "mini-project",
      learning_outcomes: [
        "Authentication security best practices",
        "Role-based access control implementation",
        "Protected route patterns in Next.js",
      ],
    },
    {
      id: "mp-env-security",
      title: "Secure Environment Variables & Config",
      description: "Configure secure environment variables and security headers",
      requirements: [
        "✓ .env.example file with all required variables",
        "✓ .env.local for local development (never committed)",
        "✓ Security headers in next.config (X-Content-Type-Options, X-Frame-Options, CSP)",
        "✓ No sensitive data in repository (.gitignore configured)",
        "✓ Vercel environment variables setup guide",
        "✓ HTTPS redirect configuration",
      ],
      submission_category: "mini-project",
      learning_outcomes: [
        "Environment variable management",
        "Security headers implementation",
        "Secrets management in production",
      ],
    },
    {
      id: "mp-storage",
      title: "Vercel Storage Integration",
      description: "Setup and configure Vercel Postgres or KV storage",
      requirements: [
        "✓ Vercel project created with database",
        "✓ PostgreSQL connection configured (Neon or Vercel Postgres)",
        "✓ Connection string properly handled (.env)",
        "✓ Database schema initialized",
        "✓ VERCEL_STORAGE_SETUP.md documentation",
        "✓ Local development database connection tested",
        "✓ Migration scripts functional",
      ],
      submission_category: "mini-project",
      learning_outcomes: [
        "Database provisioning and management",
        "Connection pooling concepts",
        "Serverless database operations",
      ],
    },
    {
      id: "mp-migrations",
      title: "Drizzle ORM Migrations with Rollback",
      description: "Implement migration infrastructure with rollback support",
      requirements: [
        "✓ Migration utilities (lib/migrations.ts) with full documentation",
        "✓ Migration tracking table (_migrations) in database",
        "✓ Run pending migrations functionality",
        "✓ Rollback capability (rollback N migrations)",
        "✓ Migration status command",
        "✓ Migration scripts (scripts/migrate.ts)",
        "✓ Error handling and logging",
        "✓ Tested on local database",
      ],
      submission_category: "mini-project",
      learning_outcomes: [
        "Database migration patterns",
        "Version control for schemas",
        "Reversible changes concept",
      ],
    },
    {
      id: "mp-security-logging",
      title: "Deployment Security & Logging",
      description: "Implement comprehensive logging and security utilities",
      requirements: [
        "✓ Security utilities (lib/security.ts) with logging functions",
        "✓ Log levels (DEBUG, INFO, WARN, ERROR, CRITICAL)",
        "✓ Sensitive data sanitization in logs",
        "✓ Pattern masking for secrets (emails, APIs, tokens)",
        "✓ Audit event logging for security events",
        "✓ File-based logging (logs/ directory)",
        "✓ Old log cleanup utility",
        "✓ Environment variable verification",
        "✓ Deployment report generation",
      ],
      submission_category: "mini-project",
      learning_outcomes: [
        "Security event logging",
        "Sensitive data handling",
        "Audit trail creation",
      ],
    },
    {
      id: "mp-custom-domain",
      title: "Custom Domain Configuration",
      description: "Prepare custom domain setup for production deployment",
      requirements: [
        "✓ CUSTOM_DOMAIN_SETUP.md comprehensive guide",
        "✓ Nameserver vs CNAME configuration options",
        "✓ SSL certificate setup (Let's Encrypt via Vercel)",
        "✓ DNS propagation explanation",
        "✓ Troubleshooting guide included",
        "✓ HTTP to HTTPS redirect configured",
        "✓ Security headers applied",
        "✓ Environment variables updated for production",
      ],
      submission_category: "mini-project",
      learning_outcomes: [
        "DNS configuration and management",
        "SSL/TLS certificate setup",
        "Domain deployment preparation",
      ],
    },
    {
      id: "mp-security-journal",
      title: "Security Journal Implementation",
      description: "Complete security journal page with submission tracking",
      requirements: [
        "✓ Enhanced journal_entries schema with categories and requirements tracking",
        "✓ Security journal page displaying mini projects",
        "✓ Journal entries component with filters (category, status)",
        "✓ Requirements checklist display",
        "✓ Submission form with category selection",
        "✓ Journal entries CRUD operations",
        "✓ Responsive UI with Shadcn components",
        "✓ Submission status tracking (submitted, reviewed, completed)",
      ],
      submission_category: "mini-project",
      learning_outcomes: [
        "Full-stack CRUD implementation",
        "Database schema design",
        "Form handling and validation",
      ],
    },
  ];

  return (
    <main className="max-w-7xl mx-auto py-8 px-4 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Security Journal</h1>
        <p className="text-muted-foreground">
          Track your mini projects, requirements, and submissions for Week 3
        </p>
      </div>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="projects">Mini Projects</TabsTrigger>
          <TabsTrigger value="submissions">My Submissions</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6">
          <div className="space-y-6">
            {miniProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <CardTitle className="text-2xl">{project.title}</CardTitle>
                      <CardDescription className="text-base">
                        {project.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Requirements Section */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Requirements
                    </h3>
                    <ul className="space-y-2 bg-muted/30 p-4 rounded-lg">
                      {project.requirements.map((req, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm"
                        >
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Learning Outcomes Section */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      Learning Outcomes
                    </h3>
                    <ul className="space-y-2 bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
                      {project.learning_outcomes.map((outcome, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm text-blue-900 dark:text-blue-100"
                        >
                          <span className="text-blue-600 dark:text-blue-400">→</span>
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Submission Status Badge */}
                  <div className="flex items-center gap-2 pt-2">
                    <Clock className="h-4 w-4 text-amber-600" />
                    <span className="text-sm text-amber-600">
                      Status: <span className="font-semibold">Pending Submission</span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Submission Info Card */}
          <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-900">
            <CardHeader>
              <CardTitle className="text-blue-900 dark:text-blue-100">
                How to Submit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-blue-900 dark:text-blue-100">
              <p>
                1. Complete all requirements for each mini project
              </p>
              <p>
                2. Use the "My Submissions" tab to add your project entry
              </p>
              <p>
                3. Include the project link and document what you learned
              </p>
              <p>
                4. Select the category and verify all requirements are met
              </p>
              <p>
                5. Submit for review
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Journal Entries</CardTitle>
              <CardDescription>
                Add, edit, and manage your mini project submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <JournalEntries userId={user.id} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Submission Requirements Info */}
      <Card className="border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-900">
        <CardHeader>
          <CardTitle className="text-green-900 dark:text-green-100">
            Week 3 Completion Checklist
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-green-900 dark:text-green-100">
          <div className="space-y-2">
            <p className="font-semibold">To complete Week 3, you must:</p>
            <ul className="space-y-1 ml-4">
              <li>✓ Complete all 7 mini projects</li>
              <li>✓ Submit entries for each project in the journal</li>
              <li>✓ Document lessons learned for each project</li>
              <li>✓ Provide links to mini project code/documentation</li>
              <li>✓ Verify all requirements are met for each submission</li>
              <li>✓ Get all submissions approved before final submission</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
