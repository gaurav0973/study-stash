import { useState } from "react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { buttonVariants } from "../ui/button";
import { BookOpenIcon, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const routeList = [
    { href: "#problems", label: "Problems" },
    { href: "#features", label: "Features" },
    { href: "#faq", label: "FAQ" },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-border bg-background/80 backdrop-blur-md bg-transparent--dark">
            <div className="container max-w-7xl mx-auto px-4 flex h-16 items-center justify-between">

                <Link to="/" className="flex items-center text-xl font-bold text-foreground">
                    <BookOpenIcon className="mr-2 h-5 w-5 text" />
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
                </nav>

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
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};
