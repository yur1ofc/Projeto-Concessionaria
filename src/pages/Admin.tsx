import { FipeSearch } from "@/components/FipeSearch"
import { modelSpecs } from "@/services/fipeService"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Car } from "@/types/car"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pencil, Trash2, LogOut, Plus } from "lucide-react"
import { CustomSelect } from "@/components/ui/CustomSelect"
import { FeatureChecklist } from "@/components/ui/FeatureChecklist"
import {
  fuelOptions,
  transmissionOptions,
  tractionOptions,
  colorTypeOptions,
  interiorMaterialOptions,
  conservationOptions,
  doorOptions,
  seatOptions,
  brandOptions,
  safetyItems,
  comfortItems,
  technologyItems,
  getYearOptions
} from "@/config/carOptions"

const emptyForm: Omit<Car, 'id' | 'createdAt' | 'views'> = {
  name: "",
  brand: "",
  model: "",
  version: "",
  year: new Date().getFullYear(),
  yearModel: new Date().getFullYear(),
  price: 0,
  priceFormatted: "",
  engine: "",
  horsepower: 0,
  fuel: "Flex",
  transmission: "Automático",
  gears: 6,
  traction: "Dianteira",
  consumptionCity: "",
  consumptionHighway: "",
  doors: 4,
  seats: 5,
  trunk: 0,
  weight: 0,
  fuelTank: 0,
  km: 0,
  kmFormatted: "",
  owners: 1,
  hasAccidents: false,
  accidentDescription: "",
  features: [],
  safetyFeatures: [],
  comfortFeatures: [],
  technologyFeatures: [],
  color: "",
  colorType: "Metálica",
  interiorColor: "",
  interiorMaterial: "Couro",
  conservation: "Seminovo",
  ipvaPaid: true,
  licensingPaid: true,
  plate: "",
  renavam: "",
  chassi: "",
  images: [],
  mainImage: "",
  city: "São Paulo",
  state: "SP",
  description: "",
  shortDescription: "",
  featured: false
}

export default function Admin() {
  const navigate = useNavigate()
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [cars, setCars] = useState<Car[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [activeTab, setActiveTab] = useState("basic")

  // Disponibilizar modelSpecs globalmente para o componente FipeSearch
  useEffect(() => {
    (window as any).modelSpecs = modelSpecs;
  }, []);

  // Carregar dados do localStorage
  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (auth === "true") setAuthenticated(true)

    const savedCars = localStorage.getItem("cars")
    if (savedCars) {
      try {
        const parsed = JSON.parse(savedCars)
        setCars(parsed)
      } catch (e) {
        console.error("Erro ao carregar carros:", e)
      }
    }
  }, [])

  // Salvar carros no localStorage
  useEffect(() => {
    localStorage.setItem("cars", JSON.stringify(cars))
  }, [cars])

  // Quando entrar em modo de edição, preencher o formulário
  useEffect(() => {
    if (editingId && form) {
      setForm(prev => ({
        ...prev,
        year: prev.year || new Date().getFullYear(),
        yearModel: prev.yearModel || new Date().getFullYear()
      }))
    }
  }, [editingId])

  const handleLogin = () => {
    if (password === "1234") {
      setAuthenticated(true)
      localStorage.setItem("adminAuth", "true")
    } else {
      alert("Senha incorreta")
    }
  }

  const handleLogout = () => {
    setAuthenticated(false)
    localStorage.removeItem("adminAuth")
    navigate("/")
  }

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const handleFipeData = (data: Partial<Car>) => {
    setForm(prev => ({
      ...prev,
      ...data,
      // Manter valores que o usuário já preencheu
      name: data.name || prev.name,
      version: prev.version || data.version || '',
      // Garantir que anos estejam corretos
      year: data.year || prev.year,
      yearModel: data.yearModel || prev.yearModel,
      // Garantir que portas e lugares estejam corretos (especialmente para Porsche)
      doors: data.doors || prev.doors,
      seats: data.seats || prev.seats
    }));
    
    // Mostrar mensagem de sucesso
    alert(`✅ Dados carregados da FIPE para ${data.brand} ${data.model}`);
  }

  const saveCar = () => {
    // VALIDAÇÃO CORRIGIDA - verifica campos individuais
    if (!form.brand) {
      alert("Selecione uma marca")
      return
    }
    
    if (!form.model) {
      alert("Preencha o modelo")
      return
    }
    
    if (!form.version) {
      alert("Preencha a versão")
      return
    }
    
    if (!form.price || form.price <= 0) {
      alert("Preencha o preço corretamente")
      return
    }

    if (!form.year) {
      alert("Selecione o ano de fabricação")
      return
    }

    if (!form.yearModel) {
      alert("Selecione o ano modelo")
      return
    }

    const priceFormatted = formatPrice(form.price)
    const kmFormatted = form.km.toLocaleString('pt-BR')

    // Gera o nome completo do veículo
    const fullName = `${form.brand} ${form.model} ${form.version}`.trim()

    const carData = {
      ...form,
      name: fullName,
      priceFormatted,
      kmFormatted
    }

    if (editingId) {
      setCars(cars.map(car =>
        car.id === editingId ? { ...car, ...carData, id: editingId } : car
      ))
      setEditingId(null)
    } else {
      const newCar: Car = {
        id: Date.now(),
        createdAt: new Date().toLocaleDateString("pt-BR"),
        views: 0,
        ...carData
      }
      setCars([newCar, ...cars])
    }

    setForm(emptyForm)
    setActiveTab("basic")
  }

  const editCar = (car: Car) => {
    setForm({
      ...car,
      year: car.year || new Date().getFullYear(),
      yearModel: car.yearModel || new Date().getFullYear()
    })
    setEditingId(car.id)
    setActiveTab("basic")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const removeCar = (id: number) => {
    if (confirm("Tem certeza que deseja remover este veículo?")) {
      setCars(cars.filter(car => car.id !== id))
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Painel Administrativo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Digite a senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={handleLogin} className="w-full">
                Entrar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {editingId ? "Editar Veículo" : "Adicionar Novo Veículo"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* NOVO: Componente de busca FIPE */}
            <FipeSearch onVehicleFound={handleFipeData} className="mb-6" />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-5 mb-6">
                <TabsTrigger value="basic" type="button">Básico</TabsTrigger>
                <TabsTrigger value="specs" type="button">Especificações</TabsTrigger>
                <TabsTrigger value="features" type="button">Itens</TabsTrigger>
                <TabsTrigger value="images" type="button">Imagens</TabsTrigger>
                <TabsTrigger value="location" type="button">Localização</TabsTrigger>
              </TabsList>

              {/* BÁSICO */}
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <CustomSelect
                    label="Marca"
                    value={form.brand}
                    onChange={(v) => setForm({ ...form, brand: v })}
                    options={brandOptions}
                    required
                  />
                  <Input
                    placeholder="Modelo"
                    value={form.model}
                    onChange={(e) => setForm({ ...form, model: e.target.value })}
                  />
                  <Input
                    placeholder="Versão"
                    value={form.version}
                    onChange={(e) => setForm({ ...form, version: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <CustomSelect
                    label="Ano Fabricação"
                    value={form.year?.toString() || new Date().getFullYear().toString()}
                    onChange={(v) => setForm({ ...form, year: Number(v) })}
                    options={getYearOptions().map(String)}
                  />
                  <CustomSelect
                    label="Ano Modelo"
                    value={form.yearModel?.toString() || new Date().getFullYear().toString()}
                    onChange={(v) => setForm({ ...form, yearModel: Number(v) })}
                    options={getYearOptions().map(String)}
                  />
                  <Input
                    type="number"
                    placeholder="Preço (R$)"
                    value={form.price || ""}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CustomSelect
                    label="Combustível"
                    value={form.fuel}
                    onChange={(v) => setForm({ ...form, fuel: v as any })}
                    options={fuelOptions}
                  />
                  <CustomSelect
                    label="Câmbio"
                    value={form.transmission}
                    onChange={(v) => setForm({ ...form, transmission: v as any })}
                    options={transmissionOptions}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    type="number"
                    placeholder="Quilometragem"
                    value={form.km || ""}
                    onChange={(e) => setForm({ ...form, km: Number(e.target.value) })}
                  />
                  <Input
                    type="number"
                    placeholder="Nº de marchas"
                    value={form.gears || ""}
                    onChange={(e) => setForm({ ...form, gears: Number(e.target.value) })}
                  />
                  <CustomSelect
                    label="Tração"
                    value={form.traction}
                    onChange={(v) => setForm({ ...form, traction: v as any })}
                    options={tractionOptions}
                  />
                </div>
              </TabsContent>

              {/* ESPECIFICAÇÕES */}
              <TabsContent value="specs" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Cor"
                    value={form.color}
                    onChange={(e) => setForm({ ...form, color: e.target.value })}
                  />
                  <CustomSelect
                    label="Tipo de pintura"
                    value={form.colorType}
                    onChange={(v) => setForm({ ...form, colorType: v as any })}
                    options={colorTypeOptions}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Cor do interior"
                    value={form.interiorColor}
                    onChange={(e) => setForm({ ...form, interiorColor: e.target.value })}
                  />
                  <CustomSelect
                    label="Material do interior"
                    value={form.interiorMaterial}
                    onChange={(v) => setForm({ ...form, interiorMaterial: v as any })}
                    options={interiorMaterialOptions}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CustomSelect
                    label="Estado de conservação"
                    value={form.conservation}
                    onChange={(v) => setForm({ ...form, conservation: v as any })}
                    options={conservationOptions}
                  />
                  <Input
                    type="number"
                    placeholder="Nº de donos"
                    value={form.owners || ""}
                    onChange={(e) => setForm({ ...form, owners: Number(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={form.hasAccidents}
                      onChange={(e) => setForm({ ...form, hasAccidents: e.target.checked })}
                      className="rounded border-border"
                    />
                    <span>Veículo já sofreu acidentes?</span>
                  </label>
                  {form.hasAccidents && (
                    <Input
                      placeholder="Descreva os acidentes"
                      value={form.accidentDescription || ""}
                      onChange={(e) => setForm({ ...form, accidentDescription: e.target.value })}
                    />
                  )}
                </div>
              </TabsContent>

              {/* ITENS */}
              <TabsContent value="features" className="space-y-8">
                <FeatureChecklist
                  title="Itens de segurança"
                  items={safetyItems}
                  selectedItems={form.safetyFeatures}
                  onChange={(items) => setForm({ ...form, safetyFeatures: items })}
                />

                <FeatureChecklist
                  title="Itens de conforto"
                  items={comfortItems}
                  selectedItems={form.comfortFeatures}
                  onChange={(items) => setForm({ ...form, comfortFeatures: items })}
                />

                <FeatureChecklist
                  title="Tecnologia"
                  items={technologyItems}
                  selectedItems={form.technologyFeatures}
                  onChange={(items) => setForm({ ...form, technologyFeatures: items })}
                />

                <div className="space-y-2">
                  <label className="font-semibold">Descrição curta</label>
                  <Textarea
                    placeholder="Breve descrição do veículo..."
                    value={form.shortDescription}
                    onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-semibold">Descrição completa</label>
                  <Textarea
                    placeholder="Descrição detalhada..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="h-40"
                  />
                </div>
              </TabsContent>

              {/* IMAGENS */}
              <TabsContent value="images" className="space-y-6">
                <div className="space-y-3">
                  <label className="font-semibold text-lg">Imagem Principal</label>
                  <Input
                    placeholder="https://exemplo.com/imagem-principal.jpg"
                    value={form.mainImage}
                    onChange={(e) => setForm({ ...form, mainImage: e.target.value })}
                  />
                  {form.mainImage && (
                    <div className="mt-3 p-3 bg-secondary/20 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                      <img 
                        src={form.mainImage} 
                        alt="Preview principal" 
                        className="max-w-full h-48 object-contain rounded-lg border border-border bg-secondary/30"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder-car.jpg"
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="font-semibold text-lg">Imagens Adicionais</label>
                  <p className="text-sm text-muted-foreground">
                    ✏️ Digite uma URL por linha. Use ENTER para nova linha.
                  </p>
                  
                  <Textarea
                    placeholder="https://exemplo.com/imagem1.jpg&#10;https://exemplo.com/imagem2.jpg&#10;https://exemplo.com/imagem3.jpg"
                    value={form.images?.join('\n') || ""}
                    onChange={(e) => {
                      const urls = e.target.value.split('\n').filter(url => url.trim() !== '')
                      setForm({ ...form, images: urls })
                    }}
                    className="font-mono text-sm min-h-[150px]"
                  />
                  
                  {form.images && form.images.length > 0 && (
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-3">
                        <p className="text-sm font-medium">
                          {form.images.length} {form.images.length === 1 ? 'imagem' : 'imagens'} adicionadas:
                        </p>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setForm({ ...form, images: [] })}
                          className="text-destructive hover:text-destructive"
                        >
                          Limpar todas
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                        {form.images.map((url, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={url}
                              alt={`Imagem ${index + 1}`}
                              className="w-full aspect-square object-cover rounded-lg border border-border"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/placeholder-car.jpg"
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newImages = form.images.filter((_, i) => i !== index)
                                setForm({ ...form, images: newImages })
                              }}
                              className="absolute -top-2 -right-2 bg-destructive text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition shadow-lg"
                              title="Remover imagem"
                            >
                              ×
                            </button>
                            <span className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded">
                              {index + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <p className="text-sm text-primary">
                    💡 Dica: Use imagens de alta qualidade. URLs podem ser de qualquer serviço de hospedagem de imagens (Imgur, Google Drive, etc.)
                  </p>
                </div>
              </TabsContent>

              {/* LOCALIZAÇÃO */}
              <TabsContent value="location" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Cidade"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                  <Input
                    placeholder="Estado (UF)"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    maxLength={2}
                  />
                </div>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="rounded border-border"
                  />
                  <span>Destacar este veículo na página inicial</span>
                </label>
              </TabsContent>
            </Tabs>

            <Button onClick={saveCar} className="w-full mt-6" size="lg">
              <Plus className="mr-2 h-4 w-4" />
              {editingId ? "Salvar Alterações" : "Adicionar Veículo"}
            </Button>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-4">
          Veículos Cadastrados ({cars.length})
        </h2>

        <div className="space-y-4">
          {cars.map((car) => (
            <Card key={car.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={car.mainImage || car.images?.[0] || "/placeholder-car.jpg"}
                    alt={car.name}
                    className="w-full md:w-48 h-32 object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder-car.jpg"
                    }}
                  />

                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{car.name}</h3>
                    <p className="text-primary font-bold text-2xl mb-2">{car.priceFormatted}</p>
                    
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-2">
                      <span>{car.year}/{car.yearModel}</span>
                      <span>{car.kmFormatted} km</span>
                      <span>{car.transmission}</span>
                      <span>{car.fuel}</span>
                      <span>{car.doors} portas</span>
                      <span>{car.seats} lugares</span>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {car.shortDescription || car.description}
                    </p>
                  </div>

                  <div className="flex md:flex-col gap-2">
                    <Button variant="outline" size="sm" onClick={() => editCar(car)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => removeCar(car.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}