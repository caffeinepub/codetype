import { Outlet } from '@tanstack/react-router';
import { Navigation } from './Navigation';

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Desktop: offset for sidebar; Mobile: offset for top bar */}
      <main className="lg:ml-56 pt-14 lg:pt-0 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
