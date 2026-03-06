export interface Car {
  id: number
  // Informações básicas
  name: string
  brand: string
  model: string
  version: string
  year: number
  yearModel: number
  
  // Preço e financiamento
  price: number
  priceFormatted: string
  financingMinEntry?: number
  financingMaxInstallments?: number
  
  // Motor e desempenho
  engine: string
  horsepower: number
  fuel: 'Flex' | 'Gasolina' | 'Etanol' | 'Diesel' | 'Híbrido' | 'Elétrico'
  transmission: 'Manual' | 'Automático' | 'Semi-Automático' | 'CVT'
  gears: number
  traction: 'Dianteira' | 'Traseira' | 'Integral 4x4' | 'Integral 4x2'
  
  // Consumo
  consumptionCity: string // km/l
  consumptionHighway: string // km/l
  
  // Dimensões e capacidade
  doors: 2 | 3 | 4 | 5
  seats: number
  trunk: number // litros
  weight: number // kg
  fuelTank: number // litros
  
  // Quilometragem e histórico
  km: number
  kmFormatted: string
  owners: number
  hasAccidents: boolean
  accidentDescription?: string
  
  // Itens de série e opcionais
  features: string[] // Lista de itens
  safetyFeatures: string[]
  comfortFeatures: string[]
  technologyFeatures: string[]
  
  // Cor e conservação
  color: string
  colorType: 'Sólida' | 'Metálica' | 'Perolizada' | 'Fosca'
  interiorColor: string
  interiorMaterial: 'Couro' | 'Tecido' | 'Couro ecológico' | 'Alcântara'
  conservation: 'Novo' | 'Seminovo' | 'Usado' | 'Recondicionado'
  
  // IPVA, licenciamento
  ipvaPaid: boolean
  licensingPaid: boolean
  
  // Documentação
  plate?: string
  renavam?: string
  chassi?: string
  
  // Imagens
  images: string[] // múltiplas imagens
  mainImage: string
  
  // Localização
  city: string
  state: string
  
  // Descrição
  description: string
  shortDescription: string
  
  // Metadados
  createdAt: string
  views: number
  featured: boolean
}