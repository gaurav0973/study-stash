import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { buttonVariants } from "../ui/button";
import { BookOpenIcon, Menu, User } from "lucide-react";
import { Link } from "react-router-dom";
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
    const {data} = userData ;
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
    try{
        const response = await axios.post(`${baseURL}/user/logout`, {}, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("Logout response:", response.data);
    }catch(error){
        console.error("Logout failed:", error);
    }finally{
        logoutUser();
        setIsOpen(false);
    }
};

    return (
        <header className="sticky top-0 z-50 w-full border-border bg-background/80 backdrop-blur-md">
            <div className="container max-w-7xl mx-auto px-4 flex h-16 items-center justify-between">
                <Link to="/" className="flex items-center text-xl font-bold text-foreground">
                    <BookOpenIcon className="mr-2 h-5 w-5" />
                    Study Stash
                </Link>

                <nav className="hidden md:flex gap-4 items-center ml-auto">
                    {routeList.map(({ href, label }) => (
                        <a
                            key={label}
                            href={href}
                            className="text-sm font-medium px-3 py-2 rounded-md transition-all duration-200 hover:bg-muted/30"
                        >
                            {label}
                        </a>
                    ))}

                    {
                        isAuthenticated ? (
                            <>  
                                <div className="px-3 py-2 text-sm font-semibold bg-gradient-to-r from-[#61DAFB] to-[#03a3d7] text-transparent bg-clip-text">
                                    Welcome, {data.user.username || "User"}
                                </div>

                                <Link to="/profile" className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-md transition-all duration-200 hover:bg-muted/30">
                                    <User className="h-4 w-4" />
                                    Profile
                                </Link>
                            </>
                        ) : (
                            <>
                            </>
                        )
                    }

                    {isAuthenticated ? (

                        <button
                            onClick={handleLogout}
                            className={buttonVariants({ variant: "outline" })}
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className={buttonVariants({ variant: "ghost" })}>
                                Sign In
                            </Link>
                            <Link to="/signup" className={buttonVariants({ variant: "default" })}>
                                Sign Up
                            </Link>
                        </>
                    )}
                </nav>

                {/* Mobile Nav */}
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger className="px-2">
                            <Menu className="h-5 w-5" />
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetHeader>
                                <SheetTitle className="text-lg font-bold">Study Stash</SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-3 mt-4">
                                {routeList.map(({ href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-sm font-medium px-4 py-2 rounded-md hover:bg-muted/50 transition"
                                    >
                                        {label}
                                    </a>
                                ))}
                                {isAuthenticated ? (
                                    <button
                                        onClick={handleLogout}
                                        className={buttonVariants({ variant: "ghost" })}
                                    >
                                        Logout
                                    </button>
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
