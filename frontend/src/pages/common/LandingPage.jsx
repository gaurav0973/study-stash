import { Problems } from "@/components/landing/Problems"
import { Hero } from "../../components/landing/Hero"
import { Features } from "@/components/landing/Features"
import { FAQ } from "@/components/landing/Faq"
import { ScrollToTop } from "@/components/landing/ScrollToTop"

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
