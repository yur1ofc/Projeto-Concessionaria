import { useState } from "react";
import { motion } from "framer-motion";
import { whatsappLink } from "@/config/site";
import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import car4 from "@/assets/car-4.jpg";
import car5 from "@/assets/car-5.jpg";
import car6 from "@/assets/car-6.jpg";

type Category = "Todos" | "Luxo" | "Popular" | "SUV" | "Sedan" | "Hatch";

interface Car {
  id: number;
  name: string;
  year: number;
  km: string;
  price: string;
  category: Category;
  image: string;
}

const cars: Car[] = [
  { id: 1, name: "BMW 540i M Sport", year: 2023, km: "12.000 km", price: "R$ 389.900", category: "Luxo", image: car1 },
  { id: 2, name: "Mercedes GLS 450", year: 2024, km: "5.000 km", price: "R$ 620.000", category: "SUV", image: car2 },
  { id: 3, name: "Porsche 911 GT3", year: 2023, km: "8.500 km", price: "R$ 1.250.000", category: "Luxo", image: car3 },
  { id: 4, name: "Audi A6 Performance", year: 2022, km: "28.000 km", price: "R$ 310.000", category: "Sedan", image: car4 },
  { id: 5, name: "Kia Picanto", year: 2024, km: "0 km", price: "R$ 72.990", category: "Hatch", image: car5 },
  { id: 6, name: "Toyota Corolla XEi", year: 2023, km: "18.000 km", price: "R$ 145.900", category: "Popular", image: car6 },
];

const categories: Category[] = ["Todos", "Luxo", "Popular", "SUV", "Sedan", "Hatch"];

const FeaturedCars = () => {
  const [active, setActive] = useState<Category>("Todos");

  const filtered = active === "Todos" ? cars : cars.filter((c) => c.category === active);

  return (
    <section id="estoque" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase">Nosso Estoque</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Carros em <span className="text-gradient-gold">Destaque</span>
          </h2>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                active === cat
                  ? "bg-primary text-primary-foreground shadow-gold"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((car, i) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-xl overflow-hidden bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-gold hover:-translate-y-1"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  {car.category}
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
                <a
                  href={whatsappLink(`Olá! Tenho interesse no ${car.name} (${car.year}) - ${car.price}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-3 rounded-lg bg-primary/10 text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  Ver detalhes
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
