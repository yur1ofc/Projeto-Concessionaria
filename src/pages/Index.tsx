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
  year: string
  km: string
  transmission: string
  fuel: string
  description: string
  image: string
  createdAt: string
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

      {/* SEÇÃO DE VEÍCULOS */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-14 text-center text-gradient-gold">
          Veículos Disponíveis
        </h2>

        {cars.length === 0 ? (
          <p className="text-center text-muted-foreground text-lg">
            Nenhum veículo cadastrado ainda.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {cars.map((car) => (
              <div
                key={car.id}
                className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-gold transition duration-300 border border-border"
              >
                {/* IMAGEM */}
                <div className="relative">
                  <img
                    src={car.image || "https://via.placeholder.com/600x400"}
                    alt={car.name}
                    className="w-full h-56 object-cover"
                    onError={(e: any) =>
                      (e.target.src =
                        "https://via.placeholder.com/600x400")
                    }
                  />

                  <span className="absolute top-4 left-4 bg-primary text-black px-3 py-1 text-sm font-bold rounded-lg">
                    {car.year}
                  </span>
                </div>

                {/* CONTEÚDO */}
                <div className="p-6 space-y-3 text-left">
                  <h3 className="text-xl font-semibold">
                    {car.name}
                  </h3>

                  <p className="text-primary font-bold text-lg">
                    {car.price}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {car.km} km • {car.transmission} • {car.fuel}
                  </p>

                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {car.description}
                  </p>

                  <a
                    href={`https://wa.me/5599999999999?text=Olá, tenho interesse no ${car.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 bg-primary text-black px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                  >
                    Tenho Interesse
                  </a>
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
