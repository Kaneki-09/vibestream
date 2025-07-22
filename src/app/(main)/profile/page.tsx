import Link from 'next/link';
import { Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import SavedItem from '@/components/profile/saved-item';
import { savedItems, userProfile } from '@/lib/data';

export default function ProfilePage() {
  return (
    <div className="container mx-auto max-w-2xl py-8 px-4">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-primary">
            <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} data-ai-hint="profile person" />
            <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{userProfile.name}</h1>
            <p className="text-muted-foreground">VibeStream Enthusiast</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/settings">
            <Settings className="h-6 w-6" />
          </Link>
        </Button>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Saved Clips & Moments</h2>
        <div className="space-y-4">
          {savedItems.map((item) => (
            <SavedItem key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
