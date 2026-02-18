import { motion } from "framer-motion";
import { Calculator, CheckCircle, TrendingDown, Clock } from "lucide-react";
import { whatsappLink } from "@/config/site";

const benefits = [
  { icon: TrendingDown, text: "Taxas a partir de 0,99% a.m." },
  { icon: Clock, text: "Aprovação em até 30 minutos" },
  { icon: CheckCircle, text: "Entrada facilitada" },
  { icon: Calculator, text: "Parcelas que cabem no bolso" },
];

const Financing = () => (
  <section className="py-24 relative overflow-hidden">
    {/* Background gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(43_74%_49%/0.08),transparent_60%)]" />

    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase">
            Realize seu sonho
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Financiamento{" "}
            <span className="text-gradient-gold">Facilitado</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto mb-12">
            Condições especiais para você sair dirigindo hoje. Trabalhamos com os
            principais bancos para oferecer as melhores taxas do mercado.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {benefits.map((b, i) => (
            <motion.div
              key={b.text}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-xl glass text-center group hover:border-primary/40 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                <b.icon className="text-primary" size={22} />
              </div>
              <p className="text-sm font-medium text-foreground/80">{b.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.a
          href={whatsappLink("Olá! Gostaria de simular um financiamento.")}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-10 py-4 rounded-lg bg-primary text-primary-foreground font-bold text-lg hover:brightness-110 transition-all shadow-gold"
        >
          <Calculator size={22} />
          Simular Financiamento
        </motion.a>
      </div>
    </div>
  </section>
);

export default Financing;
