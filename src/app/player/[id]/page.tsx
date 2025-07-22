
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useParams } from 'next/navigation';
import { ArrowLeft, Bookmark, Share2, Minimize2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contentFeed, savedItems as initialSavedItems } from '@/lib/data';
import SmartSearchModal from '@/components/search/smart-search-modal';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { SavedItem } from '@/lib/types';

export default function PlayerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedItems, setSavedItems] = useState<SavedItem[]>(initialSavedItems);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const params = useParams();
  const video = contentFeed.find((v) => v.id === params.id);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (video) {
      setIsBookmarked(savedItems.some(item => item.id === video.id));
    }
  }, [video, savedItems]);
  
  useEffect(() => {
    if (searchParams.get('search') === 'true') {
      setIsModalOpen(true);
    }
  }, [searchParams]);
  
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
    <div className="relative flex flex-col h-screen w-screen bg-black text-white overflow-hidden">
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/70 to-transparent">
        <Link href="/" passHref>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold truncate px-4">{video.title}</h1>
        <div className="w-10"></div>
      </header>

      <div className="flex-grow flex items-center justify-center">
        <Image
          src={video.thumbnail}
          alt={video.title}
          layout="fill"
          objectFit="cover"
          className="opacity-80"
          data-ai-hint={video.dataAiHint}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-6 flex flex-col items-center gap-4 bg-gradient-to-t from-black/80 to-transparent">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-full max-w-sm h-14 text-lg font-bold rounded-full bg-primary/80 text-primary-foreground backdrop-blur-sm hover:bg-primary"
        >
          <Search className="mr-3 h-6 w-6" />
          Search this moment
        </Button>
      </div>
      
      <div className="absolute bottom-28 md:bottom-24 right-4 z-20 flex flex-col gap-3">
          <Button variant="ghost" size="icon" onClick={handleBookmark} className={cn("h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/30", isBookmarked && "bg-primary text-primary-foreground")}>
            <Bookmark className="h-6 w-6 md:h-7 md:w-7" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleShare} className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/30">
            <Share2 className="h-6 w-6 md:h-7 md:w-7" />
          </Button>
           <Button variant="ghost" size="icon" onClick={handleMinimize} className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/30">
            <Minimize2 className="h-6 w-6 md:h-7 md:w-7" />
          </Button>
        </div>
      
      <SmartSearchModal open={isModalOpen} onOpenChange={setIsModalOpen} videoThumbnail={video.thumbnail} />
    </div>
  );
}
