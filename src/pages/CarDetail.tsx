import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"
import { Car } from "@/types/car"
import { siteConfig } from "@/config/site"
import { 
  ArrowLeft, 
  Calendar, 
  Gauge, 
  Fuel, 
  Cog, 
  Info,
  Car as CarIcon,
  MapPin,
  Users,
  DoorOpen,
  Briefcase,
  Scale,
  Droplet,
  Award,
  CheckCircle,
  XCircle,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const CarDetail = () => {
  const { id } = useParams()
  const [car, setCar] = useState<Car | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const savedCars = localStorage.getItem("cars")
    if (savedCars) {
      const cars = JSON.parse(savedCars)
      const found = cars.find((c: Car) => c.id === Number(id))
      setCar(found || null)

      // Incrementar visualizações
      if (found) {
        found.views = (found.views || 0) + 1
        localStorage.setItem("cars", JSON.stringify(cars))
      }
    }
    setLoading(false)
  }, [id])

  const nextImage = () => {
    if (!car) return
    const totalImages = [car.mainImage, ...(car.images || [])].filter(Boolean)
    setCurrentImageIndex((prev) => (prev + 1) % totalImages.length)
  }

  const prevImage = () => {
    if (!car) return
    const totalImages = [car.mainImage, ...(car.images || [])].filter(Boolean)
    setCurrentImageIndex((prev) => (prev - 1 + totalImages.length) % totalImages.length)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">Carregando...</div>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Veículo não encontrado</h1>
          <Link to="/estoque" className="text-primary underline">
            Voltar para estoque
          </Link>
        </div>
      </div>
    )
  }

  const allImages = [car.mainImage, ...(car.images || [])].filter(Boolean)
  const whatsappMessage = `Olá! Tenho interesse no ${car.name} (${car.year}) - ${car.priceFormatted}`

  const formatNumber = (num: number) => {
    return num.toLocaleString('pt-BR')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        {/* Breadcrumb e ações */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <Link to="/estoque" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={18} />
            Voltar para estoque
          </Link>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 size={16} />
              Compartilhar
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Heart size={16} />
              Favoritar
            </Button>
          </div>
        </div>

        {/* Título e preço */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{car.name}</h1>
          <div className="flex flex-wrap items-center gap-4">
            <Badge variant="outline" className="text-primary border-primary">
              {car.conservation}
            </Badge>
            <Badge variant="outline" className="text-muted-foreground">
              Código: {car.id}
            </Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin size={14} />
              {car.city}, {car.state}
            </span>
            <span className="text-sm text-muted-foreground">
              👁️ {car.views || 0} visualizações
            </span>
          </div>
        </div>

        {/* Galeria de imagens */}
        {allImages.length > 0 && (
          <div className="mb-8 relative">
            <div className="aspect-video bg-secondary/30 rounded-2xl overflow-hidden border border-border">
              <img
                src={allImages[currentImageIndex]}
                alt={`${car.name} - Imagem ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder-car.jpg"
                }}
              />
            </div>

            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Miniaturas */}
            {allImages.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition ${
                      index === currentImageIndex ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumb ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder-car.jpg"
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Preço e botões de ação */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-2xl mb-8 border border-primary/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Preço</p>
              <p className="text-4xl md:text-5xl font-extrabold text-gradient-gold">
                {car.priceFormatted}
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
                onClick={() => window.open(`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`, '_blank')}
              >
                Tenho Interesse
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/40 text-primary hover:bg-primary/10 px-8"
                onClick={() => window.open(`tel:${siteConfig.contact.phone}`)}
              >
                Ligar Agora
              </Button>
            </div>
          </div>
        </div>

        {/* Abas de informação */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="specs">Especificações</TabsTrigger>
            <TabsTrigger value="features">Itens de série</TabsTrigger>
            <TabsTrigger value="description">Descrição</TabsTrigger>
          </TabsList>

          {/* Visão Geral */}
          <TabsContent value="overview">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Calendar className="mx-auto text-primary mb-2" size={24} />
                  <p className="text-sm text-muted-foreground">Ano</p>
                  <p className="font-bold">{car.year}/{car.yearModel}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Gauge className="mx-auto text-primary mb-2" size={24} />
                  <p className="text-sm text-muted-foreground">Quilometragem</p>
                  <p className="font-bold">{car.kmFormatted} km</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Fuel className="mx-auto text-primary mb-2" size={24} />
                  <p className="text-sm text-muted-foreground">Combustível</p>
                  <p className="font-bold">{car.fuel}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Cog className="mx-auto text-primary mb-2" size={24} />
                  <p className="text-sm text-muted-foreground">Câmbio</p>
                  <p className="font-bold">{car.transmission}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <CarIcon className="mx-auto text-primary mb-2" size={24} />
                  <p className="text-sm text-muted-foreground">Tração</p>
                  <p className="font-bold">{car.traction}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <DoorOpen className="mx-auto text-primary mb-2" size={24} />
                  <p className="text-sm text-muted-foreground">Portas</p>
                  <p className="font-bold">{car.doors}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="mx-auto text-primary mb-2" size={24} />
                  <p className="text-sm text-muted-foreground">Lugares</p>
                  <p className="font-bold">{car.seats}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Briefcase className="mx-auto text-primary mb-2" size={24} />
                  <p className="text-sm text-muted-foreground">Porta-malas</p>
                  <p className="font-bold">{car.trunk} L</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-2">Dados do motor</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Motor:</span>
                      <span className="font-semibold">{car.engine || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Potência:</span>
                      <span className="font-semibold">{car.horsepower} cv</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Consumo cidade:</span>
                      <span className="font-semibold">{car.consumptionCity || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Consumo estrada:</span>
                      <span className="font-semibold">{car.consumptionHighway || 'N/A'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-2">Dimensões</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Tanque:</span>
                      <span className="font-semibold">{car.fuelTank} L</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Peso:</span>
                      <span className="font-semibold">{car.weight} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cor:</span>
                      <span className="font-semibold">{car.color}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cor interior:</span>
                      <span className="font-semibold">{car.interiorColor}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Especificações */}
          <TabsContent value="specs">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Info size={16} className="text-primary" />
                      Histórico
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nº de donos:</span>
                        <span className="font-semibold">{car.owners}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Já sofreu acidentes:</span>
                        <span className="font-semibold flex items-center gap-1">
                          {car.hasAccidents ? (
                            <>
                              <XCircle size={16} className="text-destructive" />
                              Sim
                            </>
                          ) : (
                            <>
                              <CheckCircle size={16} className="text-green-500" />
                              Não
                            </>
                          )}
                        </span>
                      </div>
                      {car.hasAccidents && (
                        <div className="mt-2 p-3 bg-secondary/30 rounded">
                          <p className="text-sm">{car.accidentDescription}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Award size={16} className="text-primary" />
                      Documentação
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">IPVA:</span>
                        <span className="font-semibold">{car.ipvaPaid ? 'Pago' : 'A pagar'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Licenciamento:</span>
                        <span className="font-semibold">{car.licensingPaid ? 'Pago' : 'A pagar'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Droplet size={16} className="text-primary" />
                      Pintura e interior
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tipo de pintura:</span>
                        <span className="font-semibold">{car.colorType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Material interior:</span>
                        <span className="font-semibold">{car.interiorMaterial}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Scale size={16} className="text-primary" />
                      Conservação
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Estado:</span>
                        <span className="font-semibold">{car.conservation}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Itens de série */}
          <TabsContent value="features">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {car.safetyFeatures && car.safetyFeatures.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 text-primary">Segurança</h3>
                      <ul className="space-y-2">
                        {car.safetyFeatures.map((item) => (
                          <li key={item} className="text-sm flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {car.comfortFeatures && car.comfortFeatures.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 text-primary">Conforto</h3>
                      <ul className="space-y-2">
                        {car.comfortFeatures.map((item) => (
                          <li key={item} className="text-sm flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {car.technologyFeatures && car.technologyFeatures.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 text-primary">Tecnologia</h3>
                      <ul className="space-y-2">
                        {car.technologyFeatures.map((item) => (
                          <li key={item} className="text-sm flex items-start gap-2">
                            <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {(!car.safetyFeatures?.length && !car.comfortFeatures?.length && !car.technologyFeatures?.length) && (
                  <p className="text-muted-foreground text-center py-8">
                    Nenhum item adicional cadastrado para este veículo.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Descrição */}
          <TabsContent value="description">
            <Card>
              <CardContent className="p-6">
                <div className="prose prose-invert max-w-none">
                  <p className="whitespace-pre-line text-foreground/80 leading-relaxed">
                    {car.description}
                  </p>
                </div>

                {car.shortDescription && (
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h3 className="font-semibold mb-2 text-primary">Resumo</h3>
                    <p className="text-foreground/70">{car.shortDescription}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Seção de financiamento */}
        <div className="mt-12 bg-gradient-to-br from-primary/10 via-background to-primary/5 rounded-2xl p-8 text-center border border-primary/20">
          <h3 className="text-2xl font-bold mb-3">Financiamento facilitado</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Simule seu financiamento e saia dirigindo hoje mesmo. Taxas a partir de 0,99% a.m.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
            onClick={() => window.open(`https://wa.me/${siteConfig.contact.whatsapp}?text=Olá! Gostaria de simular um financiamento para o ${car.name}`, '_blank')}
          >
            Simular financiamento
          </Button>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default CarDetail