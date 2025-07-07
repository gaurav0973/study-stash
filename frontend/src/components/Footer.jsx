import { BookOpen } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
    return (
        <div className="bg-gray-100">
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <Link
                                to="/"
                                className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
                            >
                                <BookOpen className="h-6 w-6" />
                                <span className="text-xl font-bold">StudyStash</span>
                            </Link>
                            <p className="text-gray-400">
                                The campus marketplace for student notes and study materials.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <Link
                                        to="/"
                                        className="hover:text-white transition-colors"
                                    >
                                        How it Works
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/pricing"
                                        className="hover:text-white transition-colors"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/"
                                        className="hover:text-white transition-colors"
                                    >
                                        Features
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <Link
                                        to="/help"
                                        className="hover:text-white transition-colors"
                                    >
                                        Help Center
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/contact"
                                        className="hover:text-white transition-colors"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/safety"
                                        className="hover:text-white transition-colors"
                                    >
                                        Safety
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <Link
                                        to="/privacy"
                                        className="hover:text-white transition-colors"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/terms"
                                        className="hover:text-white transition-colors"
                                    >
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/cookies"
                                        className="hover:text-white transition-colors"
                                    >
                                        Cookie Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 StudyStash. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
