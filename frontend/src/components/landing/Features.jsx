import {
    BookOpen,
    CheckCircle,
    DollarSign,
    Search,
    Shield,
    Star,
    Upload,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";

export const Features = () => {
    return (
        <section id="features" className="relative py-10 md:py-16 gap-10 px-4 z-10">

            <div className="container px-4 relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-extrabold">
                        <span className="bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                            How we Solves 
                        </span>{" "}
                        This
                    </h2>
                    <p className="text-muted-foreground text-lg mt-4">
                        A secure, campus-specific platform where students can monetize their notes
                        and access quality study materials from their peers.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    <Card className="bg-background/60 backdrop-blur border border-white/10 transition hover:shadow-xl hover:bg-background/70">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-pink-100/20 rounded-xl flex items-center justify-center">
                                    <Upload className="h-5 w-5 text-[#F596D3]" />
                                </div>
                                <h3 className="text-xl font-bold text-white">For Note Creators</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Turn your hard work into passive income.
                            </p>
                        </CardHeader>

                        <CardContent className="space-y-5">
                            {[
                                {
                                    icon: <CheckCircle className="h-4 w-4 text-white" />,
                                    title: "Upload & Price Your Notes",
                                    desc: "Set your own prices and upload notes in any format - PDF, Word, images, or code files.",
                                },
                                {
                                    icon: <DollarSign className="h-4 w-4 text-white" />,
                                    title: "Earn Passive Income",
                                    desc: "Get paid automatically every time someone downloads your notes - no extra work required.",
                                },
                                {
                                    icon: <Star className="h-4 w-4 text-white" />,
                                    title: "Build Your Reputation",
                                    desc: "Get rated by buyers and build a trusted profile to increase your sales.",
                                },
                            ].map(({ icon, title, desc }) => (
                                <div
                                    key={title}
                                    className="flex items-start gap-3 p-4 rounded-lg bg-[#F596D3]/10 border border-[#F596D3]/20"
                                >
                                    <div className="w-6 h-6 bg-[#F596D3] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        {icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1 text-sm">
                                            {title}
                                        </h4>
                                        <p className="text-xs text-muted-foreground">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-background/60 backdrop-blur border border-white/10 transition hover:shadow-xl hover:bg-background/70">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-blue-100/20 rounded-xl flex items-center justify-center">
                                    <Search className="h-5 w-5 text-[#61DAFB]" />
                                </div>
                                <h3 className="text-xl font-bold text-white">For Note Buyers</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Access premium study materials from your peers.
                            </p>
                        </CardHeader>

                        <CardContent className="space-y-5">
                            {[
                                {
                                    icon: <BookOpen className="h-4 w-4 text-white" />,
                                    title: "Browse Verified Notes",
                                    desc: "Find high-quality notes from your specific campus, courses, and professors.",
                                },
                                {
                                    icon: <Shield className="h-4 w-4 text-white" />,
                                    title: "Secure Payments",
                                    desc: "Pay safely with built-in buyer protection and instant download access.",
                                },
                                {
                                    icon: <CheckCircle className="h-4 w-4 text-white" />,
                                    title: "Quality Guaranteed",
                                    desc: "Read detailed reviews and ratings before purchasing to ensure you get the best materials.",
                                },
                            ].map(({ icon, title, desc }) => (
                                <div
                                    key={title}
                                    className="flex items-start gap-3 p-4 rounded-lg bg-[#61DAFB]/10 border border-[#61DAFB]/20"
                                >
                                    <div className="w-6 h-6 bg-[#61DAFB] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        {icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1 text-sm">
                                            {title}
                                        </h4>
                                        <p className="text-xs text-muted-foreground">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};
