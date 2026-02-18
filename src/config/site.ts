/**
 * ============================================
 * CONFIGURAÇÃO DO SITE - AutoPrime Motors
 * ============================================
 * Altere os valores abaixo para personalizar
 * o site para qualquer concessionária.
 * ============================================
 */

export const siteConfig = {
  /** Nome da empresa */
  name: "AutoPrime Motors",
  /** Nome curto / sigla */
  shortName: "AutoPrime",
  /** Iniciais (logo texto) */
  initials: "AP",
  /** Slogan principal */
  slogan: "Dirija seus sonhos",
  /** Descrição para SEO */
  description:
    "Concessionária premium de veículos novos e seminovos. Carros selecionados com procedência garantida e as melhores condições do mercado.",
  /** Ano de fundação */
  foundedYear: 2010,

  /** Contato */
  contact: {
    whatsapp: "5511999999999",
    phone: "(11) 99999-9999",
    email: "contato@autoprimemotors.com.br",
    address: "Av. das Nações, 1500 - São Paulo, SP",
  },

  /** Redes sociais (deixe vazio para ocultar) */
  social: {
    instagram: "https://instagram.com/autoprimemotors",
    facebook: "https://facebook.com/autoprimemotors",
  },

  /** SEO */
  seo: {
    title: "AutoPrime Motors | Carros Premium e Seminovos Selecionados",
    ogImage: "/og-image.jpg",
  },
} as const;

/** Gera link de WhatsApp com mensagem pré-preenchida */
export const whatsappLink = (message?: string) => {
  const base = `https://wa.me/${siteConfig.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};
