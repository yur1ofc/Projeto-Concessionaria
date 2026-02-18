import { motion } from "framer-motion";
import { Shield, Award, Handshake, Clock, CreditCard, Wrench } from "lucide-react";

const items = [
  { icon: Shield, title: "Procedência Garantida", desc: "Todos os veículos passam por rigorosa inspeção." },
  { icon: Award, title: "Qualidade Premium", desc: "Seleção criteriosa dos melhores carros do mercado." },
  { icon: Handshake, title: "Negociação Transparente", desc: "Sem pegadinhas. Tudo claro e direto." },
  { icon: Clock, title: "Atendimento Rápido", desc: "Respostas em até 30 minutos pelo WhatsApp." },
  { icon: CreditCard, title: "Financiamento Fácil", desc: "Taxas competitivas e aprovação simplificada." },
  { icon: Wrench, title: "Garantia Mecânica", desc: "3 meses de garantia em todos os veículos." },
];

const Differentials = () => (
  <section id="diferenciais" className="py-24 bg-secondary/30">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <span className="text-primary text-sm font-medium tracking-widest uppercase">Por que nos escolher</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-3">
          Nossos <span className="text-gradient-gold">Diferenciais</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl glass hover:border-primary/40 transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <item.icon className="text-primary" size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Differentials;
