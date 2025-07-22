import ContentCard from '@/components/content/content-card';
import { contentFeed } from '@/lib/data';

export default function HomePage() {
  return (
    <div className="container mx-auto max-w-2xl py-8 px-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          VibeStream
        </h1>
        <p className="text-muted-foreground mt-2">
          Discover content in a new way.
        </p>
      </header>
      <div className="space-y-6">
        {contentFeed.map((content) => (
          <ContentCard key={content.id} content={content} />
        ))}
      </div>
    </div>
  );
}
