import { Header } from "./components/Header"
import { HeroSection } from "./components/HeroSection"
import { ComparisonSection } from "./components/ComparisonSection"
import { FeaturesSection } from "./components/FeaturesSection"
import { CtaSection } from "./components/CtaSection"
import { Footer } from "./components/Footer"

export default function Home() {
    return (
        <div className="min-h-screen">
            <Header />
            <HeroSection />
            <ComparisonSection />
            <FeaturesSection />
            <CtaSection />
            <Footer />
        </div>
    )
}