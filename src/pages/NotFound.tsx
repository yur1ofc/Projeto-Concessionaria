import { useLocation, Link } from "react-router-dom"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

const NotFound = () => {
  const location = useLocation()

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-gradient-gold mb-4">404</h1>
        <p className="text-2xl font-semibold mb-2">Página não encontrada</p>
        <p className="text-muted-foreground mb-8">
          A página que você está procurando não existe ou foi removida.
        </p>
        <Link to="/">
          <Button size="lg" className="gap-2">
            <Home size={18} />
            Voltar para o início
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound