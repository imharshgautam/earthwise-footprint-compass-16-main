import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LogIn, User, Lock } from "lucide-react";
import ParallaxBg from "@/components/login/ParallaxBg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Dummy login function for UI only
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Fake redirect to dashboard
      navigate("/calculate-impact");
    }, 1200);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <ParallaxBg />
      <div className="flex items-center justify-center w-full min-h-screen z-10 pt-24 sm:pt-12">
        <Card className="w-full max-w-md shadow-2xl border-none bg-white/70 dark:bg-green-900/80 glass-effect animate-fade-in backdrop-blur-lg">
          <CardHeader className="flex flex-col items-center space-y-2">
            <span className="flex items-center justify-center rounded-full bg-green-300 h-12 w-12 mb-2 shadow-lg animate-bounce-slow">
              <LogIn className="text-green-700 h-7 w-7" />
            </span>
            <CardTitle className="text-2xl font-bold text-green-900 dark:text-green-100 text-center">
              Welcome Back
            </CardTitle>
            <p className="text-muted-foreground font-medium text-center text-base">
              Log in to your GreenMiles account
            </p>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-6"
              autoComplete="off"
              onSubmit={handleLogin}
            >
              <div className="space-y-2">
                <Label htmlFor="email" className="font-semibold text-green-900 dark:text-green-100">
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="you@email.com"
                    className="pl-10 bg-white/70 dark:bg-green-950/80"
                    autoFocus
                    disabled={loading}
                  />
                  <User className="absolute left-2 top-2.5 h-5 w-5 text-green-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="font-semibold text-green-900 dark:text-green-100">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    placeholder="••••••••"
                    className="pl-10 pr-10 bg-white/70 dark:bg-green-950/80"
                    disabled={loading}
                  />
                  <Lock className="absolute left-2 top-2.5 h-5 w-5 text-green-400" />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2 top-2.5 inline-flex items-center text-green-400 hover:text-green-600 focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full mt-4 bg-green-500 hover:bg-green-400 text-green-950 font-bold rounded-md shadow-md shadow-green-300/20 transition"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-green-700" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="h-5 w-5" /> Log In
                  </span>
                )}
              </Button>
            </form>
            <div className="mt-6 text-center text-green-900 dark:text-green-100">
              <span>Don't have an account? </span>
              <Link
                to="/signup"
                className="font-semibold text-green-700 hover:underline"
                tabIndex={-1}
              >
                Sign Up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
