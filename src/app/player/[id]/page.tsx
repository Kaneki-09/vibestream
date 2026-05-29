'use client';

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Bookmark, Share2, Minimize2, Search, Maximize, SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contentFeed, savedItems as initialSavedItems, transcriptItems } from '@/lib/data';
import SmartSearchModal from '@/components/search/smart-search-modal';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { SavedItem } from '@/lib/types';

export default function PlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedItems, setSavedItems] = useState<SavedItem[]>(initialSavedItems);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const video = contentFeed.find((v) => v.id === id);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchParams.get('search') === 'true') {
      setIsModalOpen(true);
    }
  }, [searchParams]);

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
        alert(`Error: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
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

  return (
    <div className="flex flex-col h-screen bg-background text-foreground transition-colors duration-500">
       <header className="flex items-center justify-between p-4 flex-shrink-0 z-10">
          <Link href="/" passHref>
            <Button variant="ghost" size="icon" className="soft-neumorphism active:scale-95">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-lg font-black truncate px-4 text-gradient-shiny">{video.title}</h1>
          <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="soft-neumorphism active:scale-95">
            <Maximize className="h-6 w-6" />
          </Button>
      </header>
      
      <div className="px-4">
        <div ref={playerRef} className="relative w-full aspect-video rounded-[20px] soft-neumorphism-inset overflow-hidden flex-shrink-0 border-4 border-background">
            <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover"
                data-ai-hint={video.dataAiHint}
            />
        </div>
      </div>

      <div className="flex-grow overflow-y-auto mt-6 space-y-4 px-6 pb-20 scrollbar-hide">
        {transcriptItems.map((item, index) => (
            <p key={item.id} className="text-sm md:text-base leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                <span className={cn("font-black px-2 py-0.5 rounded-md soft-neumorphism-inset mr-2", index % 2 === 0 ? "text-primary" : "text-accent")}>{item.timestamp}</span> 
                <span className="opacity-90">{item.text}</span>
            </p>
        ))}
      </div>
      
      <div className="p-6 fixed bottom-4 left-0 right-0 z-20">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-full h-16 text-xl font-black soft-neumorphism text-primary active:scale-95 transition-all duration-300 hover:text-primary-foreground hover:bg-primary shadow-xl"
        >
          <Search className="mr-3 h-7 w-7" />
          Search this moment
        </Button>
      </div>
      
      <div className="absolute bottom-32 right-6 z-20 flex flex-col gap-4">
          <Button variant="ghost" size="icon" onClick={handleBookmark} className={cn("h-16 w-16 soft-neumorphism active:scale-95 transition-all duration-300 shadow-lg", isBookmarked ? "text-primary-foreground bg-primary" : "text-primary")}>
            <Bookmark className="h-8 w-8" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleShare} className="h-16 w-16 soft-neumorphism text-accent active:scale-95 transition-all duration-300 shadow-lg">
            <Share2 className="h-8 w-8" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleMinimize} className="h-16 w-16 soft-neumorphism text-primary active:scale-95 transition-all duration-300 shadow-lg">
            <Minimize2 className="h-8 w-8" />
          </Button>
      </div>
      
      <SmartSearchModal open={isModalOpen} onOpenChange={setIsModalOpen} videoThumbnail={video.thumbnail} />
    </div>
  );
}
