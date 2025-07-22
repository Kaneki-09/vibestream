import Image from 'next/image';
import Link from 'next/link';
import { Play, Search, Film } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Content } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  content: Content;
}

export default function ContentCard({ content }: ContentCardProps) {
  return (
    <Card className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col h-full rounded-2xl border-2 border-transparent hover:border-primary">
      <CardContent className="p-0 relative aspect-video">
        <Link href={`/player/${content.id}`} className="block w-full h-full">
          <Image
            src={content.thumbnail}
            alt={content.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            data-ai-hint={content.dataAiHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </Link>
        {content.duration && (
          <Badge variant="secondary" className="absolute bottom-3 left-3 flex items-center gap-1">
             <Film className="h-3 w-3" />
            {content.duration}
          </Badge>
        )}
         <div className="absolute top-0 right-0 p-3">
          <Link href={`/player/${content.id}?search=true`} passHref>
            <Button variant="ghost" size="icon" className="h-10 w-10 bg-white/20 text-white backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 scale-0 group-hover:scale-100">
                <Search className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4 mt-auto bg-card">
         <h3 className="font-bold text-lg text-card-foreground">{content.title}</h3>
         <p className="text-sm text-muted-foreground">{content.caption}</p>
         <Link href={`/player/${content.id}`} passHref className="w-full mt-2">
          <Button size="lg" className="w-full text-base font-bold">
            <Play className="mr-2 h-5 w-5" />
            Watch Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
