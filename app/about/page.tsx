import { Award, GraduationCap, Briefcase, Calendar, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/80 relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Me</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                I'm Brix Digap — a 2nd‑year IT student currently taking the ECA Cybersecurity class. 
                I'm building practical, portfolio-ready security skills through hands-on learning and real projects.
              </p>
            </div>
          </div>
        </div>
        {/* Animated background */}
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 opacity-90"></div>
      </section>

      {/* Profile Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Brix Digap</h2>
                <p className="text-xl text-muted-foreground">
                  <span className="text-primary font-semibold">2nd‑Year IT Student • ECA Cybersecurity Program Graduate</span>
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  I completed the ECA Cybersecurity Program — a 10‑week, security‑first class that taught secure AI
                  development lifecycles, layered defenses (WAF, Arcjet, Vercel Firewall), MCP authentication (OAuth 2.1),
                  and practical offensive testing with Kali Linux. The program equipped me to evaluate and defend AI
                  systems from development through production.
                </p>
                <p className="text-muted-foreground">
                  I’m focused on applying these skills to real projects and building a security‑first portfolio. Below are
                  some of the technical skills I practice and the achievements that reflect my leadership and tech
                  experience.
                </p>
                <p className="text-muted-foreground">
                  Contact: digapbrix@gmail.com
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[400px] aspect-square">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-3xl opacity-20"></div>
                <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-background p-2">
                  <Image
                    src="/profile.jpg"
                    alt="Brix Digap"
                    width={500}
                    height={500}
                    className="rounded-lg object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Achievements</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Awards & Recognition</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Selected accomplishments and leadership roles showcasing technical curiosity and community impact.
                </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-background border-primary/20">
              <CardHeader className="pb-2">
                <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>With Honors</CardTitle>
                <CardDescription>Academic recognition for strong performance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Dean's Lister (2024, 2025) and consistent academic honors.</p>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20">
              <CardHeader className="pb-2">
                <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Awards & Competitions</CardTitle>
                <CardDescription>Technical & innovation recognitions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Best in Coding; Most Innovative Science Project; Agri Tech Innovate Top 3 Regionals & Top 12 Nationals; ECA Cybersecurity Program (10 weeks).</p>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20">
              <CardHeader className="pb-2">
                <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Leadership & Service</CardTitle>
                <CardDescription>Student leadership roles and community involvement</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Social Media Director, Environmental Chairman, PYAP Officer, Socio‑Cultural Coordinator, SMS Chairman.</p>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20">
              <CardHeader className="pb-2">
                <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Community & Participation</CardTitle>
                <CardDescription>Hackathons & events</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">AI Singapore Competition; App Con (2024–2025); Start Up Challenge (2025); International Work Immersion Award (2023–2024).</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Expertise</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Skills & Specializations</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Technical skills I practiced during the AI Protector Workshop and in my projects.
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Secure Development</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Environment hardening & secrets management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Secure Node.js & VS Code setups</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Secure SDLC basics for AI projects</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">Agent & MCP Security</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Threat modeling for MCP servers and AI agents</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>OAuth 2.1 integration & access controls</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>WAF & edge protection basics (Vercel, Arcjet)</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">Testing & Reporting</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Penetration testing fundamentals (Kali Linux workflows)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Executive-ready security summaries and runbooks</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Presentation and collaboration for portfolio delivery</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Experience</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Learning & Development Journey</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Building security expertise through hands-on workshops, projects, and practical application of AI security principles.
              </p>
            </div>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/40 before:to-transparent">
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 bg-background shadow-sm z-10 md:group-odd:ml-8 md:group-even:mr-8">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <div className="w-full md:w-[calc(50%-4rem)] bg-background p-5 rounded-lg border border-primary/20 shadow-sm">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <h3 className="font-bold text-lg">2nd Year IT Student</h3>
                  <time className="font-semibold text-primary flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    2024-Present
                  </time>
                </div>
                <p className="text-muted-foreground mb-2">College Education</p>
                <p className="text-sm text-muted-foreground">
                  Currently pursuing IT degree with focus on cybersecurity. Achieved Dean's Lister honors in 2024 and 2025, 
                  demonstrating consistent academic excellence and dedication to technical learning.
                </p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 bg-background shadow-sm z-10 md:group-odd:ml-8 md:group-even:mr-8">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div className="w-full md:w-[calc(50%-4rem)] bg-background p-5 rounded-lg border border-primary/20 shadow-sm">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <h3 className="font-bold text-lg">ECA Cybersecurity Program</h3>
                  <time className="font-semibold text-primary flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    10 Weeks
                  </time>
                </div>
                <p className="text-muted-foreground mb-2">Security-First Training</p>
                <p className="text-sm text-muted-foreground">
                  Completed comprehensive cybersecurity program covering secure AI development lifecycles, layered defenses 
                  (WAF, Arcjet, Vercel Firewall), MCP authentication (OAuth 2.1), and practical offensive testing with Kali Linux. 
                  Equipped to evaluate and defend AI systems from development through production.
                </p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 bg-background shadow-sm z-10 md:group-odd:ml-8 md:group-even:mr-8">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div className="w-full md:w-[calc(50%-4rem)] bg-background p-5 rounded-lg border border-primary/20 shadow-sm">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <h3 className="font-bold text-lg">Leadership & Competitions</h3>
                  <time className="font-semibold text-primary flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    2023-Present
                  </time>
                </div>
                <p className="text-muted-foreground mb-2">Student Leadership & Innovation</p>
                <p className="text-sm text-muted-foreground">
                  Active in student leadership roles including Social Media Director, Environmental Chairman, PYAP Officer, and SMS Chairman. 
                  Competed in AI Singapore, App Con, Start Up Challenge, and Agri Tech Innovate (Top 3 Regionals, Top 12 Nationals). 
                  Awarded Best in Coding, Most Innovative Science Project, and International Work Immersion Award.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
