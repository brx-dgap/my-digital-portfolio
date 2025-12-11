"use client";

import { useEffect, useState } from "react";
import { getJournalEntries, addJournalEntry, deleteJournalEntry, updateJournalEntry } from "../app/actions/journal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Trash2, Loader2, AlertCircle } from "lucide-react";
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

const categories = [
  { value: "mini-project", label: "Mini Project" },
  { value: "assignment", label: "Assignment" },
  { value: "research", label: "Research" },
  { value: "challenge", label: "Challenge" },
];

const statusOptions = [
  { value: "submitted", label: "Submitted" },
  { value: "reviewed", label: "Under Review" },
  { value: "completed", label: "Completed" },
  { value: "pending", label: "Pending" },
];

export default function JournalEntries({ userId }: { userId: string }) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [link, setLink] = useState("");
  const [lesson, setLesson] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState<string>("mini-project");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        setLoading(true);
        const data = await getJournalEntries(userId);
        setEntries(data || []);
        setError(null);
      } catch (err) {
        setError("Failed to load journal entries");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadEntries();
  }, [userId]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!link || !lesson) {
      setError("Please fill in both link and lesson fields");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      const newEntry = await addJournalEntry(userId, link, lesson, category, notes);
      if (newEntry) {
        setEntries([newEntry, ...entries]);
        setLink("");
        setLesson("");
        setNotes("");
        setCategory("mini-project");
      }
    } catch (err) {
      setError("Failed to add entry");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteJournalEntry(id);
      setEntries(entries.filter((e) => e.id !== id));
      setError(null);
    } catch (err) {
      setError("Failed to delete entry");
      console.error(err);
    }
  };

  const filteredEntries = entries.filter((entry) => {
    if (filterCategory && entry.submissionCategory !== filterCategory) return false;
    if (filterStatus && entry.status !== filterStatus) return false;
    return true;
  });

  const getCategoryBadge = (cat: string | null) => {
    const categoryObj = categories.find(c => c.value === cat);
    return categoryObj?.label || "Uncategorized";
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Submission Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Entry</CardTitle>
          <CardDescription>
            Submit a mini project, assignment, or learning documentation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="space-y-4">
            {error && (
              <div className="flex gap-2 items-start p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg text-sm text-red-700 dark:text-red-200">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Link</label>
                <Input
                  placeholder="https://github.com/your-project"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  type="url"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Lesson Learned</label>
              <Textarea
                placeholder="What did you learn from this project? What challenges did you face?"
                value={lesson}
                onChange={(e) => setLesson(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Notes (Optional)</label>
              <Textarea
                placeholder="Any additional notes or requirements met..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Entry"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Filter by Category</label>
          <Select
            value={filterCategory || "all"}
            onValueChange={(val) => setFilterCategory(val === "all" ? null : val)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Filter by Status</label>
          <Select
            value={filterStatus || "all"}
            onValueChange={(val) => setFilterStatus(val === "all" ? null : val)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statusOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Journal Entries ({filteredEntries.length})
          </h3>
        </div>

        {filteredEntries.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              No entries yet. Start by adding your first entry above!
            </p>
          </Card>
        ) : (
          <ul className="space-y-4">
            {filteredEntries.map((entry) => (
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
                        <Badge variant="outline">
                          {getCategoryBadge(entry.submissionCategory)}
                        </Badge>
                        <Badge className={getStatusColor(entry.status)}>
                          {entry.status ? statusOptions.find(o => o.value === entry.status)?.label : "Pending"}
                        </Badge>
                      </div>
                      {entry.submissionDate && (
                        <p className="text-xs text-muted-foreground">
                          Submitted: {format(new Date(entry.submissionDate), "PPpp")}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(entry.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-2">Lesson Learned:</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {entry.lesson}
                    </p>
                  </div>

                  {entry.notes && (
                    <div>
                      <p className="text-sm font-medium mb-2">Notes:</p>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {entry.notes}
                      </p>
                    </div>
                  )}

                  {entry.requirementsMet && Array.isArray(entry.requirementsMet) && (entry.requirementsMet as unknown[]).length > 0 ? (
                    <div className="flex items-start gap-2 pt-2 border-t">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-green-700 dark:text-green-400">
                          {(entry.requirementsMet as unknown[]).length} requirements met
                        </p>
                      </div>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
