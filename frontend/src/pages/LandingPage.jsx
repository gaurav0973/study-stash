import { Problems } from "@/components/Problems"
import { Hero } from "../components/Hero"
import { Features } from "@/components/Features"
import { FAQ } from "@/components/Faq"
import { ScrollToTop } from "@/components/ScrollToTop"

export const LandingPage = () => {
    return (
        <>
            <Hero/>
            <Problems/>
            <Features/>
            <FAQ/>
            <ScrollToTop/>
        </>
    )
}
