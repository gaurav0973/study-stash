import { BookOpen } from "lucide-react"
import { Button } from "./ui/button"
import { Link } from "react-router"

const Navbar = () => {
    return (
        <div>
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link to="/" className="flex items-center gap-2">
                            <BookOpen className="h-8 w-8 text-blue-600" />                       
                            <span className="text-2xl font-bold text-gray-900"></span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost">
                                <Link to="/signin">Sign in</Link>
                        </Button>
                        <Button>
                            <Link to="/signup">Get Started</Link>
                        </Button>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Navbar