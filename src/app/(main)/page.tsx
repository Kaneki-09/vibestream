import ContentCard from '@/components/content/content-card';
import { contentFeed } from '@/lib/data';

export default function HomePage() {
  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          VibeStream
        </h1>
        <p className="text-muted-foreground mt-2">
          Discover content in a new way.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
        {contentFeed.map((content) => (
          <ContentCard key={content.id} content={content} />
        ))}
      </div>
    </div>
  );
}
