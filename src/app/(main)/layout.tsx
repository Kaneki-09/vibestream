import BottomNav from '@/components/navigation/bottom-nav';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow pb-24">{children}</main>
      <BottomNav />
    </div>
  );
}
