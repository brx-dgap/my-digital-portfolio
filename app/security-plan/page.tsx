import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, Lock, Shield, Zap, Eye, Users, Clock } from "lucide-react"

export default function SecurityPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Security Plan</h1>
              <p className="max-w-[700px] text-gray-400 md:text-xl/relaxed">
                A comprehensive security framework and best practices to protect AI systems, MCP servers, and modern web applications
              </p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px] opacity-10"></div>
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      </section>

      {/* Security Pillars */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Framework</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Security Pillars</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Five core pillars forming the foundation of secure system design and operation
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            <Card className="bg-background border-primary/20">
              <CardHeader>
                <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Prevention</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Implement controls to prevent unauthorized access and attacks before they occur</p>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20">
              <CardHeader>
                <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Monitor systems continuously to identify suspicious activities and anomalies</p>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20">
              <CardHeader>
                <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                  <AlertCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Response</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">React quickly to incidents with coordinated response procedures</p>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20">
              <CardHeader>
                <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Recovery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Restore systems to normal operations and minimize impact</p>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20">
              <CardHeader>
                <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Governance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Establish policies, processes, and oversight for continuous improvement</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Defense Layers */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Layered Defense</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Defense in Depth</h2>
              <p className="max-w-[700px] text-muted-foreground md:text/xl/relaxed">
                Multiple layers of security controls to ensure that if one fails, others provide protection
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                title: "Perimeter Security",
                description: "WAF (Web Application Firewall), DDoS Protection, DNS Filtering",
                icon: Shield,
              },
              {
                title: "Network Security",
                description: "Network segmentation, VPN, Intrusion Detection/Prevention Systems (IDS/IPS)",
                icon: Zap,
              },
              {
                title: "Application Security",
                description: "Input validation, OAuth 2.1, HTTPS/TLS encryption, API authentication",
                icon: Lock,
              },
              {
                title: "Data Security",
                description: "Encryption at rest, Encryption in transit, Data classification, Access controls",
                icon: Eye,
              },
              {
                title: "Endpoint Security",
                description: "Host-based firewalls, Antivirus, EDR (Endpoint Detection & Response)",
                icon: CheckCircle,
              },
            ].map((layer, index) => {
              const Icon = layer.icon;
              return (
                <Card key={index} className="bg-background border-primary/20">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{layer.title}</CardTitle>
                        <CardDescription>{layer.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security Best Practices */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Best Practices</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Implementation Guidelines</h2>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="bg-background border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Access Control
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">• Implement principle of least privilege</p>
                <p className="text-sm text-muted-foreground">• Use role-based access control (RBAC)</p>
                <p className="text-sm text-muted-foreground">• Enable multi-factor authentication (MFA)</p>
                <p className="text-sm text-muted-foreground">• Regular access reviews and audits</p>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Secrets Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">• Never hardcode secrets in code</p>
                <p className="text-sm text-muted-foreground">• Use environment variables (.env.local)</p>
                <p className="text-sm text-muted-foreground">• Rotate secrets regularly</p>
                <p className="text-sm text-muted-foreground">• Use secure secret management tools</p>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Data Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">• Encrypt data at rest and in transit</p>
                <p className="text-sm text-muted-foreground">• Use HTTPS/TLS for all communications</p>
                <p className="text-sm text-muted-foreground">• Implement data classification</p>
                <p className="text-sm text-muted-foreground">• Maintain audit logs</p>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Monitoring & Logging
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">• Implement comprehensive logging</p>
                <p className="text-sm text-muted-foreground">• Use SIEM for log analysis</p>
                <p className="text-sm text-muted-foreground">• Set up real-time alerts</p>
                <p className="text-sm text-muted-foreground">• Retain logs for compliance</p>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Vulnerability Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">• Regular security assessments</p>
                <p className="text-sm text-muted-foreground">• Penetration testing</p>
                <p className="text-sm text-muted-foreground">• Keep dependencies updated</p>
                <p className="text-sm text-muted-foreground">• SBOM (Software Bill of Materials)</p>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Incident Response
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">• Have a documented IR plan</p>
                <p className="text-sm text-muted-foreground">• Define escalation procedures</p>
                <p className="text-sm text-muted-foreground">• Regular tabletop exercises</p>
                <p className="text-sm text-muted-foreground">• Post-incident reviews</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* MCP & AI Security */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Emerging Tech</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">AI & MCP Security</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Security considerations for AI agents and Model Context Protocol servers
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-background border-primary/20">
              <CardHeader>
                <CardTitle>MCP Authentication</CardTitle>
                <CardDescription>Secure MCP server connections</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• OAuth 2.1 implementation</li>
                  <li>• Token-based authentication</li>
                  <li>• API key rotation</li>
                  <li>• Scope-based permissions</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20">
              <CardHeader>
                <CardTitle>AI Model Hardening</CardTitle>
                <CardDescription>Protect AI systems from attacks</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Input validation & sanitization</li>
                  <li>• Output filtering</li>
                  <li>• Rate limiting</li>
                  <li>• Prompt injection prevention</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-background border-primary/20">
              <CardHeader>
                <CardTitle>API Security</CardTitle>
                <CardDescription>Secure API endpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Rate limiting & throttling</li>
                  <li>• Request validation</li>
                  <li>• CORS policies</li>
                  <li>• API versioning</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">Need a Security Assessment?</h2>
            <p className="max-w-[700px] text-gray-400 md:text/xl/relaxed">
              Get in touch to discuss your security needs and explore how to implement these practices in your organization.
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px] opacity-10"></div>
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      </section>
    </div>
  );
}
