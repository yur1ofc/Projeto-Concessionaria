import { useEffect, useState } from "react"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import FeaturedCars from "@/components/FeaturedCars"
import Differentials from "@/components/Differentials"
import Financing from "@/components/Financing"
import Testimonials from "@/components/Testimonials"
import About from "@/components/About"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import { Car } from "@/types/car"

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([])

  useEffect(() => {
    const savedCars = localStorage.getItem("cars")
    if (savedCars) {
      const allCars = JSON.parse(savedCars)
      setFeaturedCars(allCars.slice(0, 6)) // Mostra só os 6 primeiros na home
    }
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FeaturedCars cars={featuredCars} />
      <Differentials />
      <Financing />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}

export default Home