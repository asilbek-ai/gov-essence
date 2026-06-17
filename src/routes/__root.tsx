import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AppProvider } from "@/context/AppContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress, BackToTop } from "@/components/layout/ScrollUtils";
import { ItineraryFab } from "@/components/layout/ItineraryFab";
import { ToastViewport } from "@/components/ui/ToastViewport";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-extrabold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-bold text-foreground">Sahifa topilmadi</h2>
        <p className="mt-2 text-sm text-muted-foreground">Siz qidirgan sahifa mavjud emas yoki o'chirilgan.</p>
        <a href="/" className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-primary-glow px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105">Bosh sahifaga</a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-bold text-foreground">Sahifa yuklanmadi</h1>
        <p className="mt-2 text-sm text-muted-foreground">Biron muammo yuz berdi. Sahifani yangilab ko'ring.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-xl bg-gradient-to-r from-primary to-primary-glow px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105">Qayta urinish</button>
          <a href="/" className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold transition hover:bg-muted">Bosh sahifa</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "SmartTour 360 — O'zbekiston rasmiy turizm portali" },
      { name: "description", content: "O'zbekistonni 360° kashf eting. Virtual sayohatlar, mehmonxonalar, restoranlar, taksi va chipta bron qilish — bitta premium platformada." },
      { name: "author", content: "SmartTour 360" },
      { property: "og:title", content: "SmartTour 360 — O'zbekiston rasmiy turizm portali" },
      { property: "og:description", content: "O'zbekistonni 360° kashf eting. Virtual sayohatlar, mehmonxonalar, restoranlar, taksi va chipta bron qilish — bitta premium platformada." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SmartTour 360 — O'zbekiston rasmiy turizm portali" },
      { name: "twitter:description", content: "O'zbekistonni 360° kashf eting. Virtual sayohatlar, mehmonxonalar, restoranlar, taksi va chipta bron qilish — bitta premium platformada." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/fcb1d49d-a2fc-422c-89a8-195caffb1476" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/fcb1d49d-a2fc-422c-89a8-195caffb1476" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" },
      { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="uz">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function Chrome({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname.startsWith("/admin");
  return (
    <>
      <ScrollProgress />
      {!isAdmin && <Header />}
      <main className={isAdmin ? "" : "min-h-screen"}>{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <ItineraryFab />}
      <BackToTop />
      <ToastViewport />
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Chrome>
          <Outlet />
        </Chrome>
      </AppProvider>
    </QueryClientProvider>
  );
}
