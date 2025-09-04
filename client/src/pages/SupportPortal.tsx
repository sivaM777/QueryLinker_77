import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardList, RefreshCw } from "lucide-react";
import ZendeskPanel from "@/components/SystemPanels/ZendeskPanel";

export default function SupportPortal() {
  return (
    <div className="min-h-screen space-y-6 animate-fadeIn p-4 lg:p-6">
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 px-4 lg:px-6 py-4 -mx-4 lg:-mx-6 -mt-4 lg:-mt-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ClipboardList className="h-6 w-6 text-green-600" />
              Support Portal
            </h1>
            <p className="text-gray-600 dark:text-slate-400 mt-1">Zendesk customer support integration</p>
          </div>
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Zendesk</Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Tickets & Knowledge Base</span>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ZendeskPanel />
        </CardContent>
      </Card>
    </div>
  );
}
