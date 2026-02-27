import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { Layout } from '@/components/Layout';
import { Home } from '@/pages/Home';
import { Practice } from '@/pages/Practice';
import { Learn } from '@/pages/Learn';
import { Test } from '@/pages/Test';
import { Progress } from '@/pages/Progress';
import { Challenges } from '@/pages/Challenges';
import { Profile } from '@/pages/Profile';
import { Settings } from '@/pages/Settings';

const rootRoute = createRootRoute({
  component: () => (
    <SettingsProvider>
      <Layout />
      <Toaster richColors position="top-right" />
    </SettingsProvider>
  ),
});

const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: Home });
const practiceRoute = createRoute({ getParentRoute: () => rootRoute, path: '/practice', component: Practice });
const learnRoute = createRoute({ getParentRoute: () => rootRoute, path: '/learn', component: Learn });
const testRoute = createRoute({ getParentRoute: () => rootRoute, path: '/test', component: Test });
const progressRoute = createRoute({ getParentRoute: () => rootRoute, path: '/progress', component: Progress });
const challengesRoute = createRoute({ getParentRoute: () => rootRoute, path: '/challenges', component: Challenges });
const profileRoute = createRoute({ getParentRoute: () => rootRoute, path: '/profile', component: Profile });
const settingsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/settings', component: Settings });

const routeTree = rootRoute.addChildren([
  indexRoute,
  practiceRoute,
  learnRoute,
  testRoute,
  progressRoute,
  challengesRoute,
  profileRoute,
  settingsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
