import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Mendes",
    text: "Comprei meu BMW na AutoPrime e foi a melhor experiência que já tive em uma concessionária. Atendimento impecável!",
    rating: 5,
  },
  {
    name: "Ana Beatriz",
    text: "Processo super rápido e transparente. O financiamento foi aprovado em poucas horas. Super recomendo!",
    rating: 5,
  },
  {
    name: "Roberto Alves",
    text: "Excelente seleção de veículos. Encontrei exatamente o que procurava e com preço justo. Voltarei com certeza.",
    rating: 5,
  },
];

const Testimonials = () => (
  <section id="depoimentos" className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <span className="text-primary text-sm font-medium tracking-widest uppercase">Depoimentos</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-3">
          O que dizem nossos <span className="text-gradient-gold">clientes</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="p-6 rounded-xl glass"
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} size={16} className="fill-primary text-primary" />
              ))}
            </div>
            <p className="text-foreground/80 mb-6 italic">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                {t.name[0]}
              </div>
              <span className="font-semibold text-sm">{t.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
