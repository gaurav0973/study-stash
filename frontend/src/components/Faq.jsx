import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQList = [
    {
        value: "item-1",
        question: "What is StudyStash?",
        answer:
            "StudyStash is a secure campus-specific marketplace where students can buy and sell class notes, study materials, and code within their own university.",
    },
    {
        value: "item-2",
        question: "Who can sell notes on StudyStash?",
        answer:
            "Only verified university students are allowed to upload and sell notes, ensuring a trusted and relevant ecosystem.",
    },
    {
        value: "item-3",
        question: "How do I make money as a note creator?",
        answer:
            "Upload your notes, set your price, and earn passive income every time someone from your campus purchases them.",
    },
    {
        value: "item-4",
        question: "How are notes verified for quality?",
        answer:
            "Buyers can rate and review content. This feedback system ensures only high-quality notes are circulated.",
    },
    {
        value: "item-5",
        question: "Is it safe to buy notes on StudyStash?",
        answer:
            "Yes, all payments are secure and backed by buyer protection. You get instant access to downloads after purchase.",
    },
];

export const FAQ = () => {
    return (
        <section id="faq" className="relative py-24 sm:py-32 z-10">
            <div className="container px-4 relative z-10">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-center">
                    <span className="bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                        Questions{" "}
                    </span>
                    that were asked
                </h2>

                <Accordion
                    type="single"
                    collapsible
                    className="w-full max-w-3xl mx-auto space-y-4"
                >
                    {FAQList.map(({ value, question, answer }) => (
                        <AccordionItem
                            key={value}
                            value={value}
                            className="border border-white/10 bg-background/60 backdrop-blur-sm rounded-xl p-4"
                        >
                            <AccordionTrigger className="text-left text-base md:text-lg font-medium text-white hover:underline">
                                {question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground mt-2 text-sm leading-relaxed">
                                {answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <div className="text-center mt-10">
                    <h3 className="text-white font-medium">
                        Still have questions?{" "}
                        <a
                            href="#contact"
                            className="text-blue-300 hover:text-blue-400 transition-colors"
                        >
                            Contact us
                        </a>
                    </h3>
                </div>
            </div>
        </section>
    );
};

