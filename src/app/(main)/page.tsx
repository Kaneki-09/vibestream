import ContentCard from '@/components/content/content-card';
import { contentFeed } from '@/lib/data';

export default function HomePage() {
  return (
    <div className="container mx-auto max-w-6xl py-8 px-4">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
          VibeStream
        </h1>
        <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
          Immerse yourself in a universe of content. Your next vibe is just a tap away.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
        {contentFeed.map((content) => (
          <ContentCard key={content.id} content={content} />
        ))}
      </div>
    </div>
  );
}
