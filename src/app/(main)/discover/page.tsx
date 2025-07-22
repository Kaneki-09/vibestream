import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import ContentCard from '@/components/content/content-card';
import { filterTags, trendingClips } from '@/lib/data';

export default function DiscoverPage() {
  return (
    <div className="container mx-auto max-w-6xl py-8 px-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Discover
        </h1>
        <p className="text-muted-foreground mt-2">
          Find trending and personalized content.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Filter by Tags</h2>
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <div className="flex w-max space-x-2 pb-4">
            {filterTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-md py-2 px-4 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                {tag}
              </Badge>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Trending Clips</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trendingClips.map((content) => (
            <ContentCard key={content.id} content={content} />
          ))}
        </div>
      </section>
    </div>
  );
}
