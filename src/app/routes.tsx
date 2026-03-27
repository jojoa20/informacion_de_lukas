import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { TheBrainPage } from "./pages/TheBrainPage";
import { TheHeartPage } from "./pages/TheHeartPage";
import { TheMagicPage } from "./pages/TheMagicPage";
import { AppProvider } from "./context/AppContext";

function RootLayout({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: () => (
      <RootLayout>
        <HomePage />
      </RootLayout>
    ),
  },
  {
    path: "/brain",
    Component: () => (
      <RootLayout>
        <TheBrainPage />
      </RootLayout>
    ),
  },
  {
    path: "/heart",
    Component: () => (
      <RootLayout>
        <TheHeartPage />
      </RootLayout>
    ),
  },
  {
    path: "/magic",
    Component: () => (
      <RootLayout>
        <TheMagicPage />
      </RootLayout>
    ),
  },
]);