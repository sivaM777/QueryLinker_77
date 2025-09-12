import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, Workflow } from "lucide-react";
import JiraPanel from "@/components/SystemPanels/JiraPanel";

export default function JiraAutomation() {
  return (
    <div className="w-full px-2 space-y-4 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 px-2 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Workflow className="h-6 w-6 text-orange-600" />
              Jira Automation
            </h1>
            <p className="text-gray-600 dark:text-slate-400 mt-1">Create rules, view issues and manage workflows</p>
          </div>
          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">Jira</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Automation Workspace</span>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <JiraPanel />
        </CardContent>
      </Card>
    </div>
  );
}
