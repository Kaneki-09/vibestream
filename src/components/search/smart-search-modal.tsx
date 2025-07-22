'use client';

import { useState, useRef, type ChangeEvent } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ImageUp, Mic, Search, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { searchContentFromMoment, type SearchContentFromMomentOutput } from '@/ai/flows/search-content-from-moment';
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';
import { Card, CardContent } from '../ui/card';
import Link from 'next/link';

interface SmartSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SmartSearchModal({ open, onOpenChange }: SmartSearchModalProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<SearchContentFromMomentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSearch = async () => {
    if (!file) {
      toast({
        title: 'No screenshot selected',
        description: 'Please upload a screenshot to search.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const dataUri = reader.result as string;
      try {
        const res = await searchContentFromMoment({ screenshotDataUri: dataUri });
        setResult(res);
      } catch (err) {
        console.error(err);
        setError('Failed to analyze the moment. Please try again.');
        toast({
          title: 'Search Failed',
          description: 'An error occurred while searching. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] flex flex-col rounded-t-lg">
        <SheetHeader className="text-left">
          <SheetTitle>Smart Search</SheetTitle>
          <SheetDescription>
            Find anything in the video. Use text, voice, or upload a screenshot.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-grow overflow-y-auto p-1 space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Type to search..." className="flex-1" />
            <Button variant="ghost" size="icon"><Mic /></Button>
            <Button variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()}>
              <ImageUp />
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </div>

          {preview && (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
              <Image src={preview} alt="Screenshot preview" layout="fill" objectFit="contain" />
            </div>
          )}
          
          {preview && (
             <Button onClick={handleSearch} disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Search className="mr-2 h-4 w-4" />
                )}
                Analyze this moment
              </Button>
          )}

          {isLoading && (
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-8 w-1/4" />
              <div className="flex gap-4">
                <Skeleton className="h-24 w-1/2" />
                <Skeleton className="h-24 w-1/2" />
              </div>
            </div>
          )}
          
          {error && <p className="text-destructive text-center">{error}</p>}

          {result && (
            <div className="space-y-4 animate-in fade-in-50">
              <h3 className="text-xl font-semibold">Analysis Results</h3>
              <p className="text-muted-foreground">{result.relatedInformation}</p>

              <h4 className="font-semibold">Similar Content</h4>
              <div className="grid grid-cols-2 gap-4">
                {result.similarContent.slice(0, 2).map((url, index) => (
                   <Card key={index} className="overflow-hidden">
                     <CardContent className="p-0">
                       <Link href={url} target="_blank">
                         <Image src={`https://placehold.co/300x200.png`} alt={`Similar content ${index + 1}`} width={300} height={200} className="w-full h-auto object-cover" data-ai-hint="abstract tech" />
                         <p className="p-2 text-sm text-center truncate">{url.split('/')[2]}</p>
                       </Link>
                     </CardContent>
                   </Card>
                ))}
              </div>
            </div>
          )}

        </div>
        <SheetFooter>
            <Button variant="outline" className="w-full" onClick={() => onOpenChange(false)}>Close</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
