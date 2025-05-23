import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import LandingLayout from "./components/layout/LandingLayout";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import Activities from "./pages/Activities";
import Challenges from "./pages/Challenges";
import TreeTracker from "./pages/TreeTracker";
import Leaderboard from "./pages/Leaderboard";
import Learn from "./pages/Learn";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CarbonOffset from "./pages/CarbonOffset";
import ImpactCalc from "./pages/ImpactCalc";
import Track from "./pages/Track";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LandingLayout>
                <Landing />
              </LandingLayout>
            }
          />
          {/* <Route
            path="/dashboard"
            element={
              <MainLayout>
                <Index />
              </MainLayout>
            }
          /> */}
          <Route
            path="/calculate-impact"
            element={
              <MainLayout>
                <ImpactCalc />
              </MainLayout>
            }
          />
          <Route
            path="/activities"
            element={
              <MainLayout>
                <Activities />
              </MainLayout>
            }
          />
          <Route
            path="/challenges"
            element={
              <MainLayout>
                <Challenges />
              </MainLayout>
            }
          />
          <Route
            path="/tree-tracker"
            element={
              <MainLayout>
                <TreeTracker />
              </MainLayout>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <MainLayout>
                <Leaderboard />
              </MainLayout>
            }
          />
          <Route
            path="/learn"
            element={
              <MainLayout>
                <Learn />
              </MainLayout>
            }
          />
          <Route
            path="/carbon-offset"
            element={
              <MainLayout>
                <CarbonOffset />
              </MainLayout>
            }
          />
          <Route path="/track" element={<Track />} />
          <Route
            path="/login"
            element={
              <LandingLayout>
                <Login />
              </LandingLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <LandingLayout>
                <SignUp />
              </LandingLayout>
            }
          />
          <Route path="*" element={<NotFound />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
