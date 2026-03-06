import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import { Car } from "@/types/car"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

const Stock = () => {
  const [cars, setCars] = useState<Car[]>([])
  const [filtered, setFiltered] = useState<Car[]>([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("todos")

  useEffect(() => {
    const savedCars = localStorage.getItem("cars")
    if (savedCars) {
      const allCars = JSON.parse(savedCars)
      setCars(allCars)
      setFiltered(allCars)
    }
  }, [])

  useEffect(() => {
    let result = cars

    if (search) {
      result = result.filter(car => 
        car.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (filter !== "todos") {
      // Você pode adaptar conforme seus dados
      // Exemplo: filtrar por ano, preço, etc
    }

    setFiltered(result)
  }, [search, filter, cars])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Nosso <span className="text-gradient-gold">Estoque</span>
        </h1>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-3xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Buscar por modelo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filtrar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="menor-preco">Menor preço</SelectItem>
              <SelectItem value="maior-preco">Maior preço</SelectItem>
              <SelectItem value="mais-novo">Mais novo</SelectItem>
              <SelectItem value="menos-km">Menos km</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Resultados */}
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground text-lg py-12">
            Nenhum veículo encontrado.
          </p>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              {filtered.length} {filtered.length === 1 ? 'veículo encontrado' : 'veículos encontrados'}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((car) => (
                <Link
                  key={car.id}
                  to={`/estoque/${car.id}`}
                  className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-gold transition-all duration-300 hover:-translate-y-1 border border-border"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={car.image || "/placeholder-car.jpg"}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder-car.jpg"
                      }}
                    />
                    <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-sm font-bold rounded-full">
                      {car.year}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                    <p className="text-primary font-bold text-2xl mb-3">{car.price}</p>
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-4">
                      <span className="px-3 py-1 bg-secondary rounded-full">{car.km} km</span>
                      <span className="px-3 py-1 bg-secondary rounded-full">{car.transmission}</span>
                      <span className="px-3 py-1 bg-secondary rounded-full">{car.fuel}</span>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {car.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default Stock