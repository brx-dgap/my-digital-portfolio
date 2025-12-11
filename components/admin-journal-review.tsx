"use client";

import { useEffect, useState } from "react";
import { getJournalEntries, updateJournalEntry } from "@/app/actions/journal";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, AlertCircle, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface JournalEntry {
  id: number;
  userId: string;
  link: string;
  lesson: string;
  submissionCategory: string | null;
  submissionDate: Date;
  requirementsMet: unknown;
  notes: string | null;
  status: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

const statusOptions = [
  { value: "submitted", label: "Submitted", icon: "📤" },
  { value: "reviewed", label: "Under Review", icon: "👀" },
  { value: "completed", label: "Completed", icon: "✅" },
  { value: "pending", label: "Pending", icon: "⏳" },
];

const miniProjects: { [key: string]: string } = {
  "authentication": "Authentication & Authorization",
  "environment": "Secure Environment Variables",
  "storage": "Vercel Storage Integration",
  "migrations": "Drizzle ORM Migrations",
  "security-logging": "Deployment Security & Logging",
  "custom-domain": "Custom Domain Configuration",
  "journal": "Security Journal Implementation",
};

export default function AdminJournalReview() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAllEntries();
  }, []);

  const loadAllEntries = async () => {
    try {
      setLoading(true);
      // Pass empty string to get all entries (admin view)
      const data = await getJournalEntries("");
      setEntries(data || []);
      setError(null);
    } catch (err) {
      setError("Failed to load submissions");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      setUpdating(id);
      await updateJournalEntry(id, { status: newStatus });
      setEntries(
        entries.map((e) =>
          e.id === id ? { ...e, status: newStatus } : e
        )
      );
    } catch (err) {
      setError("Failed to update status");
      console.error(err);
    } finally {
      setUpdating(null);
    }
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "reviewed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case "submitted":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
    }
  };

  const getMiniProjectName = (requirementsMet: unknown) => {
    if (Array.isArray(requirementsMet) && requirementsMet.length > 0) {
      const key = requirementsMet[0] as string;
      return miniProjects[key] || "Unknown Project";
    }
    return "Unassigned";
  };

  const filteredEntries = filterStatus
    ? entries.filter((e) => e.status === filterStatus)
    : entries;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Submission Review Dashboard</h2>
        <div className="text-sm text-muted-foreground">
          Total submissions: <span className="font-semibold">{entries.length}</span>
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex gap-2">
        <Button
          variant={filterStatus === null ? "default" : "outline"}
          onClick={() => setFilterStatus(null)}
          size="sm"
        >
          All ({entries.length})
        </Button>
        {statusOptions.map((opt) => {
          const count = entries.filter((e) => e.status === opt.value).length;
          return (
            <Button
              key={opt.value}
              variant={filterStatus === opt.value ? "default" : "outline"}
              onClick={() => setFilterStatus(opt.value)}
              size="sm"
            >
              {opt.icon} {opt.label} ({count})
            </Button>
          );
        })}
      </div>

      {error && (
        <div className="flex gap-2 items-start p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg text-sm text-red-700 dark:text-red-200">
          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Submissions Grid */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No submissions to review</p>
          </Card>
        ) : (
          filteredEntries.map((entry) => (
            <Card key={entry.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={entry.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium break-all"
                      >
                        {entry.link}
                      </a>
                      <Badge variant="outline">{getMiniProjectName(entry.requirementsMet)}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
                      <span>User ID: {entry.userId.slice(0, 8)}...</span>
                      <span>•</span>
                      <span>
                        Submitted: {format(new Date(entry.submissionDate), "PPp")}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Lesson Learned */}
                <div>
                  <p className="text-sm font-medium mb-2">Lesson Learned:</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap bg-muted/50 p-2 rounded">
                    {entry.lesson}
                  </p>
                </div>

                {/* Notes */}
                {entry.notes && (
                  <div>
                    <p className="text-sm font-medium mb-2">Notes:</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap bg-muted/50 p-2 rounded">
                      {entry.notes}
                    </p>
                  </div>
                )}

                {/* Status Management */}
                <div className="flex items-center gap-4 pt-2 border-t">
                  <div className="flex-1">
                    <label className="text-sm font-medium block mb-2">Change Status:</label>
                    <Select
                      value={entry.status || "pending"}
                      onValueChange={(val) => handleStatusChange(entry.id, val)}
                      disabled={updating === entry.id}
                    >
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.icon} {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Badge className={getStatusColor(entry.status)}>
                      {entry.status
                        ? statusOptions.find((o) => o.value === entry.status)?.label
                        : "Pending"}
                    </Badge>
                  </div>
                  {updating === entry.id && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
