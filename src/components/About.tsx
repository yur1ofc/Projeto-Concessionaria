import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

const About = () => (
  <section id="sobre" className="py-24 bg-secondary/30">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase">Sobre nós</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
            A <span className="text-gradient-gold">{siteConfig.shortName}</span> Motors
          </h2>
          <p className="text-foreground/70 mb-4 leading-relaxed">
            Há mais de 15 anos no mercado automotivo, a AutoPrime Motors se consolidou como referência em veículos premium e seminovos selecionados. Nossa missão é proporcionar a melhor experiência de compra, com transparência, agilidade e excelência no atendimento.
          </p>
          <p className="text-foreground/70 mb-8 leading-relaxed">
            Cada veículo do nosso estoque passa por uma inspeção rigorosa de mais de 150 itens, garantindo a procedência e qualidade que nossos clientes merecem.
          </p>
          <div className="grid grid-cols-3 gap-6">
            {[
              { value: "500+", label: "Carros vendidos/ano" },
              { value: "15+", label: "Anos de mercado" },
              { value: "98%", label: "Satisfação" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-card to-card border border-border overflow-hidden flex items-center justify-center">
            <div className="text-center p-8">
              <div className="text-8xl font-display font-bold text-gradient-gold mb-4">{siteConfig.initials}</div>
              <div className="text-xl font-semibold text-foreground/60">{siteConfig.name}</div>
              <div className="text-sm text-muted-foreground mt-2">Desde {siteConfig.foundedYear}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default About;
