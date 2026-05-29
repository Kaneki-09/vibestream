
'use client';

<<<<<<< HEAD
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Bookmark, Share2, Minimize2, Search, Maximize, Mic, ImageUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contentFeed, savedItems as initialSavedItems, transcriptItems, TranscriptItem } from '@/lib/data';
=======
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Bookmark, Share2, Minimize2, Search, Maximize, Mic, ImageUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contentFeed, savedItems as initialSavedItems, transcriptItems } from '@/lib/data';
>>>>>>> b092b23 ("<!DOCTYPE html>)
import SmartSearchModal from '@/components/search/smart-search-modal';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { SavedItem } from '@/lib/types';

export default function PlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedItems, setSavedItems] = useState<SavedItem[]>(initialSavedItems);
  const { toast } = useToast();
<<<<<<< HEAD
  const params = useParams();
  const video = contentFeed.find((v) => v.id === params.id);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
=======
  const searchParams = useSearchParams();
  const video = contentFeed.find((v) => v.id === unwrappedParams.id);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchParams.get('search') === 'true') {
      setIsModalOpen(true);
    }
  }, [searchParams]);
>>>>>>> b092b23 ("<!DOCTYPE html>)

  useEffect(() => {
    if (video) {
      setIsBookmarked(savedItems.some(item => item.id === video.id));
    }
  }, [video, savedItems]);

  const handleBookmark = () => {
    if (!video) return;

    const currentlyBookmarked = savedItems.some(item => item.id === video.id);

    let updatedItems;
    if (currentlyBookmarked) {
      updatedItems = savedItems.filter(item => item.id !== video.id);
      toast({ title: 'Removed from Bookmarks', description: `"${video.title}" removed.` });
    } else {
      const newItem: SavedItem = {
        id: video.id,
        title: video.title,
        timestamp: '00:00',
        thumbnail: video.thumbnail,
        dataAiHint: video.dataAiHint,
      };
      updatedItems = [...savedItems, newItem];
      toast({ title: 'Bookmarked!', description: `"${video.title}" saved.` });
    }
    setSavedItems(updatedItems);
    setIsBookmarked(!currentlyBookmarked);
  };

  const handleShare = () => {
    toast({ title: 'Shared!', description: 'Content shared successfully.' });
  }

  const handleMinimize = () => {
    toast({ title: 'Minimized', description: 'Player minimized.' });
  }

  const toggleFullscreen = () => {
    const elem = playerRef.current;
    if (!elem) return;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);
  
  if (!video) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <h1 className="text-2xl font-bold">Video not found</h1>
        <Link href="/" passHref>
          <Button className="mt-4">Go back to Home</Button>
        </Link>
      </div>
    );
  }

  const getTimestampColor = (index: number) => {
    const colors = ['text-primary', 'dark:text-accent'];
    return colors[index % colors.length];
  }

  return (
<<<<<<< HEAD
    <div className="flex flex-col h-screen bg-background text-foreground">
       <header className="flex items-center justify-between p-4 flex-shrink-0">
          <Link href="/" passHref>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold truncate px-4">{video.title}</h1>
          <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
=======
    <div className="flex flex-col h-screen bg-background text-foreground transition-colors duration-500">
       <header className="flex items-center justify-between p-4 flex-shrink-0 z-10">
          <Link href="/" passHref>
            <Button variant="ghost" size="icon" className="soft-neumorphism active:scale-95 transition-all">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-lg font-bold truncate px-4 text-gradient-shiny">{video.title}</h1>
          <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="soft-neumorphism active:scale-95 transition-all">
>>>>>>> b092b23 ("<!DOCTYPE html>)
            <Maximize className="h-6 w-6" />
          </Button>
      </header>
      
      <div className="px-4">
<<<<<<< HEAD
        <div ref={playerRef} className="relative w-full aspect-video rounded-2xl soft-neumorphism-inset overflow-hidden flex-shrink-0">
=======
        <div ref={playerRef} className="relative w-full aspect-video rounded-3xl soft-neumorphism-inset overflow-hidden flex-shrink-0 border-4 border-background">
>>>>>>> b092b23 ("<!DOCTYPE html>)
            <Image
                src={video.thumbnail}
                alt={video.title}
                fill
<<<<<<< HEAD
                objectFit="cover"
=======
                className="object-cover"
>>>>>>> b092b23 ("<!DOCTYPE html>)
                data-ai-hint={video.dataAiHint}
            />
        </div>
      </div>

<<<<<<< HEAD
      <div className="flex-grow overflow-y-auto mt-4 space-y-2 px-4">
        {transcriptItems.map((item, index) => (
            <p key={item.id} className="text-sm leading-relaxed">
                <span className={cn("font-bold", getTimestampColor(index))}>{item.timestamp}</span> {item.text}
=======
      <div className="flex-grow overflow-y-auto mt-6 space-y-4 px-6 pb-20 scrollbar-hide">
        {transcriptItems.map((item, index) => (
            <p key={item.id} className="text-sm md:text-base leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                <span className={cn("font-black px-2 py-0.5 rounded-md soft-neumorphism-inset mr-2", getTimestampColor(index))}>{item.timestamp}</span> 
                <span className="opacity-90">{item.text}</span>
>>>>>>> b092b23 ("<!DOCTYPE html>)
            </p>
        ))}
      </div>
      
<<<<<<< HEAD
      <div className="p-4 mt-auto flex-shrink-0">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-full h-14 text-lg font-bold soft-neumorphism text-primary active:scale-95 transition-all duration-200 hover:text-primary-foreground hover:bg-primary/90"
=======
      <div className="p-6 fixed bottom-4 left-0 right-0 z-20">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-full h-16 text-xl font-black soft-neumorphism text-primary active:scale-95 transition-all duration-300 hover:text-primary-foreground hover:bg-primary shadow-xl"
>>>>>>> b092b23 ("<!DOCTYPE html>)
        >
          <Search className="mr-3 h-7 w-7" />
          Analyze this vibe
        </Button>
      </div>
      
<<<<<<< HEAD
      <div className="absolute bottom-28 md:bottom-24 right-4 z-20 flex flex-col gap-3">
          <Button variant="ghost" size="icon" onClick={handleBookmark} className={cn("h-14 w-14 soft-neumorphism active:scale-95 transition-all duration-200", isBookmarked ? "text-primary-foreground bg-primary" : "text-primary")}>
            <Bookmark className="h-7 w-7" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleShare} className="h-14 w-14 soft-neumorphism text-primary active:scale-95 transition-all duration-200 dark:text-accent">
            <Share2 className="h-7 w-7" />
          </Button>
           <Button variant="ghost" size="icon" onClick={handleMinimize} className="h-14 w-14 soft-neumorphism text-primary active:scale-95 transition-all duration-200">
            <Minimize2 className="h-7 w-7" />
=======
      <div className="absolute bottom-32 right-6 z-20 flex flex-col gap-4">
          <Button variant="ghost" size="icon" onClick={handleBookmark} className={cn("h-16 w-16 soft-neumorphism active:scale-95 transition-all duration-300 shadow-lg", isBookmarked ? "text-primary-foreground bg-primary" : "text-primary")}>
            <Bookmark className="h-8 w-8" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleShare} className="h-16 w-16 soft-neumorphism text-accent active:scale-95 transition-all duration-300 shadow-lg">
            <Share2 className="h-8 w-8" />
          </Button>
           <Button variant="ghost" size="icon" onClick={handleMinimize} className="h-16 w-16 soft-neumorphism text-primary active:scale-95 transition-all duration-300 shadow-lg">
            <Minimize2 className="h-8 w-8" />
>>>>>>> b092b23 ("<!DOCTYPE html>)
          </Button>
        </div>
      
      <SmartSearchModal open={isModalOpen} onOpenChange={setIsModalOpen} videoThumbnail={video.thumbnail} />
    </div>
  );
}
