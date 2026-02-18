import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { siteConfig, whatsappLink } from "@/config/site";
import heroCar from "@/assets/hero-car.jpg";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroCar} alt="Carro de luxo" loading="eager" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      <div className="relative container mx-auto px-4 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-block text-primary font-medium text-sm tracking-widest uppercase mb-4"
          >
            Concessionária Premium
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Dirija seus{" "}
            <span className="text-gradient-gold">sonhos</span>
          </h1>
          <p className="text-lg text-foreground/60 mb-10 max-w-lg">
            Encontre o veículo perfeito para você. Carros selecionados com procedência garantida e as melhores condições do mercado.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#estoque"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all shadow-gold"
            >
              Ver Estoque
            </a>
            <a
              href={whatsappLink("Olá! Gostaria de mais informações sobre os veículos.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-primary/40 text-primary font-semibold hover:bg-primary/10 transition-all"
            >
              <MessageCircle size={20} />
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
