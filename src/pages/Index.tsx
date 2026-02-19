import { useEffect, useState } from "react"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Differentials from "@/components/Differentials"
import Financing from "@/components/Financing"
import Testimonials from "@/components/Testimonials"
import About from "@/components/About"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"

interface Car {
  id: number
  name: string
  price: string
  description: string
  image: string
}

const Index = () => {
  const [cars, setCars] = useState<Car[]>([])

  useEffect(() => {
    const savedCars = localStorage.getItem("cars")
    if (savedCars) {
      setCars(JSON.parse(savedCars))
    }
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />

      {/* Seção de Carros Dinâmicos */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Veículos Disponíveis
        </h2>

        {cars.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Nenhum veículo cadastrado ainda.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {cars.map((car) => (
              <div
                key={car.id}
                className="bg-card rounded-2xl shadow-md overflow-hidden"
              >
                {car.image && (
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-52 object-cover"
                  />
                )}

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {car.name}
                  </h3>

                  <p className="text-primary font-bold text-lg mb-2">
                    {car.price}
                  </p>

                  <p className="text-muted-foreground text-sm">
                    {car.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

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

export default Index
