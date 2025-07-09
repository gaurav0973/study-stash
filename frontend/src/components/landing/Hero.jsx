import { Link } from "react-router-dom";
import { Button, buttonVariants } from "../ui/button";
import { ArrowRight, Search } from "lucide-react";
import growth from "../../assets/growth.png"; 

export const Hero = () => {
    return (
        <section className="container mx-auto grid lg:grid-cols-2 place-items-center py-10 md:py-16 gap-10 px-4">
            <div className="text-center lg:text-left space-y-6">
                <main className="text-4xl md:text-6xl font-extrabold leading-tight">
                    <h1>
                        <span className="bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
                            Turn Your Class Notes Into
                        </span>
                    </h1>
                    <h2>
                        <span className="bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                            Cash
                        </span>
                    </h2>
                </main>

                <p className="text-lg text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
                    The first student-to-student marketplace built specifically for your campus. Buy and sell high-quality class
                    notes, code, and study materials securely.
                </p>

                <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center lg:justify-start">
                    <Button asChild className="w-full md:w-auto">
                        <Link to="/signup" className="flex items-center">
                            Start Selling Notes
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>

                    <Link
                        to="/login"
                        className={buttonVariants({ variant: "outline", className: "w-full md:w-auto flex items-center justify-center" })}
                    >
                        Browse Notes
                        <Search className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </div>

            <div className="z-10">
                <img
                    src={growth}
                    alt="Student Growth Illustration"
                    className="w-[300px] md:w-[400px] object-contain rounded-lg shadow-lg"
                />
            </div>

            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1 left-1/4 transform -translate-x-1/2-translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#F596D3] to-[#D247BF] opacity-20 rounded-full blur-3xl"></div>
                <div className="absolute top-1 left-1/2 transform - translate-x-1/2-translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] opacity-20 rounded-full blur-3xl"></div>
            </div>
        </section>
    );
};
