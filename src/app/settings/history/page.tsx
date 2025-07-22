
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { searchHistory as initialSearchHistory } from '@/lib/data';
import type { SearchHistoryItem } from '@/lib/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

export default function HistoryPage() {
  const [historyItems, setHistoryItems] = useState<SearchHistoryItem[]>(initialSearchHistory);
  const { toast } = useToast();

  const handleClearAll = () => {
    setHistoryItems([]);
    toast({ title: 'History Cleared', description: 'Your search history has been cleared.' });
  };

  const handleRemoveItem = (id: string) => {
    setHistoryItems(historyItems.filter(item => item.id !== id));
    toast({ title: 'Item Removed', description: 'Search entry has been removed from your history.' });
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-2xl py-8 px-4">
        <header className="relative flex items-center justify-center mb-8">
          <Link href="/settings" className="absolute left-0">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Search History</h1>
        </header>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Manage History</CardTitle>
              <CardDescription>View and manage your past searches.</CardDescription>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" disabled={historyItems.length === 0}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete all your search history.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearAll}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardHeader>
          <CardContent>
            {historyItems.length > 0 ? (
              <ul className="space-y-3">
                {historyItems.map((item) => (
                  <li key={item.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div className="flex-1">
                      <Link href={`/player/${item.videoId}?search=true`}>
                        <p className="font-semibold hover:underline">"{item.searchTerm}"</p>
                        <p className="text-sm text-muted-foreground">
                          Searched in "{item.videoTitle}" about {formatDistanceToNow(new Date(item.timestamp))} ago
                        </p>
                      </Link>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleRemoveItem(item.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">Your search history is empty.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
