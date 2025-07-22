import Image from 'next/image';
import Link from 'next/link';
import { Play, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Content } from '@/lib/types';

interface ContentCardProps {
  content: Content;
}

export default function ContentCard({ content }: ContentCardProps) {
  return (
    <div className="soft-neumorphism overflow-hidden group transition-all duration-500 ease-in-out hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        <Link href={`/player/${content.id}`} className="block w-full h-full">
            <Image
              src={content.thumbnail}
              alt={content.title}
              width={600}
              height={400}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              data-ai-hint={content.dataAiHint}
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-colors duration-300" />
        </Link>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg truncate">{content.title}</h3>
        <p className="text-muted-foreground text-sm mt-1 truncate">{content.caption}</p>
        <div className="mt-4 flex space-x-4">
          <Link href={`/player/${content.id}`} passHref className="flex-1">
            <Button variant="ghost" className="w-full soft-neumorphism-inset text-primary font-semibold hover:text-primary-foreground hover:bg-primary/90 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-none">
                <Play />
                <span>Play</span>
            </Button>
          </Link>
          <Link href={`/player/${content.id}?search=true`} passHref className="flex-1">
             <Button variant="ghost" className="w-full soft-neumorphism-inset text-primary font-semibold hover:text-primary-foreground hover:bg-primary/90 transition-all duration-300">
                <Search />
                <span>Search</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
