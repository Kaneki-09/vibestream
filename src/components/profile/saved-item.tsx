
import Image from 'next/image';
import Link from 'next/link';
import { Play, Search, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { SavedItem as SavedItemType } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';


interface SavedItemProps {
  item: SavedItemType;
  onRemove?: (id: string) => void;
}

export default function SavedItem({ item, onRemove }: SavedItemProps) {
  const { toast } = useToast();
  
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({ title: 'Shared!', description: `Shared "${item.title}".` });
  };
  
  return (
    <div className="flex items-center gap-4 p-3 bg-card rounded-lg shadow-sm hover:bg-accent/50 transition-colors">
      <Link href={`/player/${item.id}`} className="flex-shrink-0">
        <Image
          src={item.thumbnail}
          alt={item.title}
          width={100}
          height={60}
          className="rounded-md object-cover w-24 h-16"
          data-ai-hint={item.dataAiHint}
        />
      </Link>
      <div className="flex-1 min-w-0">
        <Link href={`/player/${item.id}`} className="block">
          <p className="font-semibold text-card-foreground truncate">{item.title}</p>
          <p className="text-sm text-muted-foreground">Saved at {item.timestamp}</p>
        </Link>
      </div>
      <div className="flex gap-1 flex-shrink-0">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/player/${item.id}`}>
            <Play className="h-5 w-5" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/player/${item.id}?search=true`}>
            <Search className="h-5 w-5" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" onClick={handleShare}>
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
