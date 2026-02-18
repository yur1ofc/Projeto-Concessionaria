import { siteConfig } from "@/config/site";

const Footer = () => (
  <footer className="py-8 border-t border-border bg-secondary/20">
    <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
      <p>© {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.</p>
    </div>
  </footer>
);

export default Footer;
