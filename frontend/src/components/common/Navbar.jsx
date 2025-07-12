import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buttonVariants } from "../ui/button";
import { BookOpenIcon, Menu, User, Upload } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { baseURL } from "@/lib/helper";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";

const routeList = [
  { href: "#problems", label: "Problems" },
  { href: "#features", label: "Features" },
  { href: "#faq", label: "FAQ" },
];

export const Navbar = () => {
  const { isAuthenticated, logoutUser, userData } = useAuth();
  const data = userData?.data; // Safe navigation
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const showNavLinks = location.pathname === "/";

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/user/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Logout response:", response.data);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      logoutUser();
      setIsOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/90 backdrop-blur-md">
      <div className="container max-w-7xl mx-auto px-4 flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center text-xl font-bold text-white">
          <BookOpenIcon className="mr-2 h-5 w-5" />
          Study Stash
        </Link>

        <nav className="hidden md:flex gap-4 items-center ml-auto">
          {showNavLinks &&
            routeList.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                className="text-sm font-medium px-3 py-2 rounded-md transition-all duration-200 hover:bg-white/10 text-white"
              >
                {label}
              </a>
            ))}

          {isAuthenticated ? (
            <>
              <div className="px-3 py-2 text-sm font-semibold text-white">
                Welcome, {data?.user?.username || "User"}
              </div>
              <Link
                to="/upload-note"
                className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-md transition-all duration-200 hover:bg-white/10 text-white"
              >
                <Upload className="h-4 w-4" />
                Upload Notes
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-md transition-all duration-200 hover:bg-white/10 text-white"
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className={buttonVariants({ variant: "outline" })}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={buttonVariants({ variant: "ghost" })}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className={buttonVariants({ variant: "default" })}
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="px-2">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="text-lg font-bold text-white">
                  Study Stash
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-3 mt-4">
                {showNavLinks &&
                  routeList.map(({ href, label }) => (
                    <a
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-medium px-4 py-2 rounded-md hover:bg-white/10 text-white transition"
                    >
                      {label}
                    </a>
                  ))}

                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-2 text-sm font-semibold text-white">
                      Welcome, {data?.user?.username || "User"}
                    </div>
                    <Link
                      to="/upload-note"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md hover:bg-white/10 text-white transition"
                    >
                      <Upload className="h-4 w-4" />
                      Upload Notes
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md hover:bg-white/10 text-white transition"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "default" })}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
