import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { siteConfig } from "@/config/site"
import { Car } from "@/types/car"

interface FeaturedCarsProps {
  cars: Car[]
}

const FeaturedCars = ({ cars }: FeaturedCarsProps) => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase">
            Nosso Estoque
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Carros em <span className="text-gradient-gold">Destaque</span>
          </h2>
        </motion.div>

        {cars.length === 0 ? (
          <p className="text-center text-muted-foreground text-lg">
            Nenhum veículo cadastrado ainda.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car, i) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group rounded-xl overflow-hidden bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-gold hover:-translate-y-1"
                >
                  <Link to={`/estoque/${car.id}`}>
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={car.image || "/placeholder-car.jpg"}
                        alt={car.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder-car.jpg"
                        }}
                      />
                      <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                        {car.year}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold mb-2">{car.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>{car.year}</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                        <span>{car.km}</span>
                      </div>
                      <div className="text-2xl md:text-3xl font-extrabold text-gradient-gold mb-4">
                        {car.price}
                      </div>
                      <span className="block w-full text-center px-4 py-3 rounded-lg bg-primary/10 text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all">
                        Ver detalhes
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/estoque"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-primary/40 text-primary font-semibold hover:bg-primary/10 transition-all"
              >
                Ver todos os veículos
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default FeaturedCars