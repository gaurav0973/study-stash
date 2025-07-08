import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom"; 

export const Footer = () => {
    return (
        <footer className="relative bg-background border-t border-white/10 text-muted-foreground">
            <div className="container px-4 py-16 mx-auto relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                    <div>
                        <Link
                            to="/"
                            className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity text-white"
                        >
                            <BookOpen className="h-6 w-6" />
                            <span className="text-xl font-bold">StudyStash</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            The campus marketplace for student notes and study materials.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Product</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="hover:text-white transition-colors">
                                    How it Works
                                </Link>
                            </li>
                            <li>
                                <Link to="/pricing" className="hover:text-white transition-colors">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="hover:text-white transition-colors">
                                    Features
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/help" className="hover:text-white transition-colors">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-white transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/safety" className="hover:text-white transition-colors">
                                    Safety
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/privacy" className="hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link to="/cookies" className="hover:text-white transition-colors">
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} StudyStash. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
