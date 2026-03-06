import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Send } from "lucide-react"
import { useState } from "react"
import { siteConfig } from "@/config/site"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const Contact = () => {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)

    // Simula envio (você pode integrar com EmailJS ou backend)
    setTimeout(() => {
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
      })
      setFormData({ name: "", email: "", phone: "", message: "" })
      setSending(false)
    }, 1500)
  }

  return (
    <section id="contato" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase">Fale conosco</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Entre em <span className="text-gradient-gold">Contato</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {[
              { icon: MapPin, title: "Endereço", text: siteConfig.contact.address },
              { icon: Phone, title: "Telefone", text: siteConfig.contact.phone },
              { icon: Mail, title: "Email", text: siteConfig.contact.email },
            ].map((info) => (
              <div key={info.title} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <info.icon className="text-primary" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{info.title}</h4>
                  <p className="text-muted-foreground text-sm">{info.text}</p>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <Phone size={16} />
                WhatsApp: {siteConfig.contact.whatsapp}
              </a>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <Input
              type="text"
              placeholder="Seu nome"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              type="email"
              placeholder="Seu email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              type="tel"
              placeholder="Seu telefone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <Textarea
              placeholder="Sua mensagem"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              required
            />
            <Button
              type="submit"
              disabled={sending}
              className="w-full py-6"
              size="lg"
            >
              {sending ? (
                "Enviando..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Mensagem
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default Contact