
import Link from 'next/link';
import { ArrowLeft, ChevronRight, History, MessageSquare, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/settings/theme-toggle';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-2xl py-8 px-4">
        <header className="relative flex items-center justify-center mb-8">
          <Link href="/profile" className="absolute left-0">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Settings</h1>
        </header>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="p-4 rounded-lg bg-secondary/50">
                <ThemeToggle />
              </div>
              <Separator />
              <Link href="/settings/history" passHref>
                <button className="w-full flex justify-between items-center p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <History className="h-5 w-5 text-muted-foreground" />
                    <span className="text-base">Manage Search History</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Support & Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <button className="w-full flex justify-between items-center p-4 rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  <span className="text-base">Feedback</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
              <Separator />
              <div className="w-full flex justify-between items-center p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Info className="h-5 w-5 text-muted-foreground" />
                  <span className="text-base">App Info</span>
                </div>
                <span className="text-muted-foreground text-sm">VibeStream Lite v1.0.0</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
