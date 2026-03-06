import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Estoque", href: "/estoque" },
  { label: "Diferenciais", href: "/#diferenciais" },
  { label: "Depoimentos", href: "/#depoimentos" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
]

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  // Função para lidar com cliques em links com âncora
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes("#") && location.pathname === "/") {
      // Se está na home e clicou em âncora, faz scroll suave
      e.preventDefault()
      const targetId = href.split("#")[1]
      const element = document.getElementById(targetId)
      if (element) {
        const offset = 80 // altura do header
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth"
        })
      }
    }
  }

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/"
    if (href.includes("#")) {
      return location.pathname === "/" && location.hash === href.substring(1)
    }
    return location.pathname === href
  }

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link to="/" className="text-2xl font-display font-bold text-gradient-gold">
          {siteConfig.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className={cn(
                "text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "text-primary"
                  : "text-foreground/70 hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-foreground"
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden glass border-t border-border"
        >
          <div className="flex flex-col items-center gap-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={(e) => {
                  handleAnchorClick(e, link.href)
                  setMenuOpen(false)
                }}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "text-primary"
                    : "text-foreground/70 hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.nav>
      )}
    </motion.header>
  )
}

export default Header