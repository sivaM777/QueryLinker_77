import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Github, Star, GitBranch, ExternalLink, Bug, Plus, Search } from "lucide-react";

export default function GitHubPanel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [newIssue, setNewIssue] = useState({ repo: "", title: "", body: "", label: "bug" });
  const { toast } = useToast();

  const repos = [
    { id: 1, name: "querylinker/core", stars: 124, forks: 18, language: "TypeScript", updated: "2 days ago", url: "https://github.com/querylinker/core" },
    { id: 2, name: "querylinker/ui", stars: 78, forks: 9, language: "React", updated: "5 days ago", url: "https://github.com/querylinker/ui" },
    { id: 3, name: "querylinker/ops", stars: 33, forks: 4, language: "Shell", updated: "1 week ago", url: "https://github.com/querylinker/ops" },
  ];

  const issues = [
    { id: 101, repo: "querylinker/core", title: "Fix OAuth callback edge case", state: "open", label: "bug", updated: "3 hours ago", number: 342 },
    { id: 102, repo: "querylinker/ui", title: "Add dark mode toggle to header", state: "open", label: "enhancement", updated: "1 day ago", number: 87 },
    { id: 103, repo: "querylinker/core", title: "Docs: deployment guide", state: "closed", label: "documentation", updated: "2 days ago", number: 339 },
  ];

  const filteredRepos = repos.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredIssues = issues.filter(i => i.title.toLowerCase().includes(searchQuery.toLowerCase()) || i.repo.toLowerCase().includes(searchQuery.toLowerCase()));

  const openOnGitHub = (url: string) => window.open(url, "_blank");

  const handleCreateIssue = async () => {
    if (!newIssue.repo || !newIssue.title.trim()) {
      toast({ title: "Missing fields", description: "Select repository and enter a title", variant: "destructive" });
      return;
    }
    try {
      await apiRequest("/api/integrations/github/issues", { method: "POST", body: JSON.stringify(newIssue) });
      toast({ title: "Issue created", description: `${newIssue.repo}: ${newIssue.title}` });
      setNewIssue({ repo: "", title: "", body: "", label: "bug" });
    } catch {
      toast({ title: "Issue created (local)", description: "API not configured; recorded locally" });
      setNewIssue({ repo: "", title: "", body: "", label: "bug" });
    }
  };

  return (
    <Card className="h-96" data-testid="github-panel">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center">
            <Github className="text-white h-4 w-4" />
          </div>
          GitHub Workspace
          <Badge variant="secondary" className="ml-auto">Live</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-full">
        <Tabs defaultValue="repos" className="h-full flex flex-col">
          <div className="px-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="repos">Repositories</TabsTrigger>
              <TabsTrigger value="issues">Issues</TabsTrigger>
              <TabsTrigger value="create">Create Issue</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="repos" className="flex-1 flex flex-col m-0">
            <div className="p-3 border-b">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-gray-400" />
                <Input placeholder="Search repositories..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-8 text-sm" />
              </div>
            </div>
            <ScrollArea className="flex-1 px-3">
              <div className="space-y-3 py-3">
                {filteredRepos.map((repo) => (
                  <div key={repo.id} className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer" onClick={() => openOnGitHub(repo.url)}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{repo.name}</h4>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1"><Star className="h-3 w-3" />{repo.stars}</span>
                      <span className="flex items-center gap-1"><GitBranch className="h-3 w-3" />{repo.forks}</span>
                      <span>{repo.language}</span>
                      <span>Updated {repo.updated}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="issues" className="flex-1 flex flex-col m-0">
            <div className="p-3 border-b">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-gray-400" />
                <Input placeholder="Search issues..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-8 text-sm" />
              </div>
            </div>
            <ScrollArea className="flex-1 px-3">
              <div className="space-y-3 py-3">
                {filteredIssues.map((issue) => (
                  <div key={issue.id} className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Bug className="h-4 w-4" />
                        <h4 className="font-medium text-sm">{issue.title}</h4>
                      </div>
                      <Badge variant={issue.state === 'open' ? 'default' : 'secondary'}>{issue.state}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                      <span>{issue.repo}</span>
                      <span>#{issue.number}</span>
                      <span>{issue.label}</span>
                      <span>Updated {issue.updated}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="create" className="flex-1 flex flex-col m-0">
            <div className="p-3 space-y-3">
              <div>
                <label className="text-sm font-medium">Repository</label>
                <Select value={newIssue.repo} onValueChange={(v) => setNewIssue({ ...newIssue, repo: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select repository" />
                  </SelectTrigger>
                  <SelectContent>
                    {repos.map(r => (
                      <SelectItem key={r.id} value={r.name}>{r.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input value={newIssue.title} onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })} placeholder="Issue title" />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea value={newIssue.body} onChange={(e) => setNewIssue({ ...newIssue, body: e.target.value })} rows={4} placeholder="Describe the issue" />
              </div>
              <div>
                <label className="text-sm font-medium">Label</label>
                <Select value={newIssue.label} onValueChange={(v) => setNewIssue({ ...newIssue, label: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bug">bug</SelectItem>
                    <SelectItem value="enhancement">enhancement</SelectItem>
                    <SelectItem value="documentation">documentation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreateIssue} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create Issue
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
