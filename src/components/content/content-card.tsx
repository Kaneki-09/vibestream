import Image from 'next/image';
import Link from 'next/link';
import { Play, Search } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Content } from '@/lib/types';

interface ContentCardProps {
  content: Content;
}

export default function ContentCard({ content }: ContentCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <CardDescription>{content.caption}</CardDescription>
      </CardHeader>
      <CardContent className="p-0 relative">
        <Link href={`/player/${content.id}`}>
          <Image
            src={content.thumbnail}
            alt={content.title}
            width={600}
            height={400}
            className="w-full h-auto object-cover"
            data-ai-hint={content.dataAiHint}
          />
        </Link>
        {content.duration && (
          <Badge variant="secondary" className="absolute bottom-2 right-2">
            {content.duration}
          </Badge>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2 p-4">
        <Link href={`/player/${content.id}?search=true`} passHref>
          <Button variant="outline" size="sm">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </Link>
        <Link href={`/player/${content.id}`} passHref>
          <Button size="sm">
            <Play className="mr-2 h-4 w-4" />
            Play
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
