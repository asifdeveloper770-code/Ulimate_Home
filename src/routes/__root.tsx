import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow mb-4">404</p>
        <h1 className="text-6xl text-foreground">Page not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center border border-gold px-6 py-3 text-xs tracking-[0.3em] uppercase text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl text-foreground">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Please try again or return home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="border border-gold px-6 py-3 text-xs tracking-[0.3em] uppercase text-gold hover:bg-gold hover:text-primary-foreground transition-colors"
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-border px-6 py-3 text-xs tracking-[0.3em] uppercase text-foreground hover:border-gold hover:text-gold transition-colors"
          >
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ultimate Pro Builders — Luxury Custom Home Construction" },
      { name: "description", content: "Ultimate Pro Builders designs and constructs bespoke luxury homes, estates, and interiors — where uncompromising craftsmanship meets architectural vision." },
      { name: "author", content: "Ultimate Pro Builders" },
      { property: "og:title", content: "Ultimate Pro Builders — Luxury Custom Home Construction" },
      { property: "og:description", content: "Ultimate Pro Builders designs and constructs bespoke luxury homes, estates, and interiors — where uncompromising craftsmanship meets architectural vision." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ultimate Pro Builders — Luxury Custom Home Construction" },
      { name: "twitter:description", content: "Ultimate Pro Builders designs and constructs bespoke luxury homes, estates, and interiors — where uncompromising craftsmanship meets architectural vision." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2a167fc9-7745-4d33-9fca-0474c43f66cf/id-preview-04c4ac21--73de7b45-bc2e-494e-9761-bb3ad9430105.lovable.app-1783366559968.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2a167fc9-7745-4d33-9fca-0474c43f66cf/id-preview-04c4ac21--73de7b45-bc2e-494e-9761-bb3ad9430105.lovable.app-1783366559968.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
