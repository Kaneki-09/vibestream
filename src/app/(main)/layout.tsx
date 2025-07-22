import BottomNav from '@/components/navigation/bottom-nav';
import VibeCritter from '@/components/vibe-critter';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow pb-32">{children}</main>
      <BottomNav />
      <VibeCritter />
    </div>
  );
}
