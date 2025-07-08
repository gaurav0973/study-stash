import { DollarSign, Shield, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const features = [
    {
        icon: <Users className="w-6 h-6 text-[#61DAFB]" />,
        title: "Messy Sharing",
        description:
            "Relying on messy Google Drive links and WhatsApp groups.",
    },
    {
        icon: <Shield className="w-6 h-6 text-[#F596D3]" />,
        title: "Trust Issues",
        description:
            "Risk of scams, low-quality files, and no verification.",
    },
    {
        icon: <DollarSign className="w-6 h-6 text-[#D247BF]" />,
        title: "No Rewards",
        description:
            "Creators don't get rewarded for their hard work.",
    },
];

export const Problems = () => {
    return (
        <section
            id="problems"
            className="relative container mx-auto text-center py-20 md:py-28 px-4"
        >
            
            <h2 className="text-3xl md:text-5xl font-extrabold mb-12 relative z-10">
                <span className="bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
                    Problems
                </span>{" "}
                faced by students
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {features.map(({ icon, title, description }) => (
                    <Card
                        key={title}
                        className="bg-[#0f0f0f]/60 border border-white/10 rounded-xl p-6 transition hover:shadow-xl hover:bg-[#1a1a1a]/70"
                    >
                        <CardHeader className="flex flex-col items-center justify-center gap-3">
                            <div className="bg-white/10 p-3 rounded-full">{icon}</div>
                            <CardTitle className="text-xl font-semibold text-white">
                                {title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-gray-300 text-center">
                            {description}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};
