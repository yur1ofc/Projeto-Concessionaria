export const fuelOptions = [
  'Flex', 'Gasolina', 'Etanol', 'Diesel', 'Híbrido', 'Elétrico'
] as const

export const transmissionOptions = [
  'Manual', 'Automático', 'Semi-Automático', 'CVT'
] as const

export const tractionOptions = [
  'Dianteira', 'Traseira', 'Integral 4x4', 'Integral 4x2'
] as const

export const colorTypeOptions = [
  'Sólida', 'Metálica', 'Perolizada', 'Fosca'
] as const

export const interiorMaterialOptions = [
  'Couro', 'Tecido', 'Couro ecológico', 'Alcântara'
] as const

export const conservationOptions = [
  'Novo', 'Seminovo', 'Usado', 'Recondicionado'
] as const

export const doorOptions = [2, 3, 4, 5] as const
export const seatOptions = [2, 4, 5, 6, 7, 8] as const

export const brandOptions = [
  'Acura', 'Alfa Romeo', 'Aston Martin', 'Audi', 'BMW', 'BYD', 'Chery',
  'Chevrolet', 'Chrysler', 'Citroën', 'Dodge', 'Ferrari', 'Fiat', 'Ford',
  'GMC', 'Honda', 'Hyundai', 'Jaguar', 'Jeep', 'Kia', 'Lamborghini',
  'Land Rover', 'Lexus', 'Maserati', 'Mazda', 'McLaren', 'Mercedes-Benz',
  'Mini', 'Mitsubishi', 'Nissan', 'Peugeot', 'Porsche', 'Ram', 'Renault',
  'Rolls-Royce', 'Subaru', 'Suzuki', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo'
] as const

// Itens pré-definidos para checklist
export const safetyItems = [
  'Airbag motorista', 'Airbag passageiro', 'Airbag lateral', 'Airbag de cortina',
  'Freios ABS', 'Controle de estabilidade', 'Controle de tração', 'Assistente de partida em rampa',
  'Câmera de ré', 'Sensor de estacionamento traseiro', 'Sensor de estacionamento dianteiro',
  'Alerta de ponto cego', 'Alerta de colisão', 'Frenagem automática de emergência',
  'Faróis de neblina', 'Faróis automáticos', 'Faróis em LED', 'Faróis adaptativos',
  'Isofix', 'Bloqueio do diferencial', 'Protetor de cárter'
]

export const comfortItems = [
  'Ar-condicionado', 'Ar-condicionado automático', 'Ar-condicionado digital',
  'Ar-condicionado de duas zonas', 'Ar-condicionado de quatro zonas',
  'Banco do motorista elétrico', 'Banco do passageiro elétrico', 'Banco com memória',
  'Bancos dianteiros aquecidos', 'Bancos traseiros aquecidos', 'Bancos em couro',
  'Vidros elétricos dianteiros', 'Vidros elétricos traseiros', 'Travas elétricas',
  'Controle automático de velocidade', 'Controle adaptativo de velocidade',
  'Direção elétrica', 'Direção hidráulica', 'Volante multifuncional',
  'Volante com regulagem de altura', 'Volante com regulagem de profundidade',
  'Volante aquecido', 'Partida por botão', 'Acesso sem chave', 'Sensores de chuva',
  'Sensor crepuscular', 'Retrovisores elétricos', 'Retrovisores com tilt-down',
  'Retrovisores aquecidos', 'Teto solar', 'Teto panorâmico', 'Porta-malas elétrico',
  'Porta-malas com abertura por sensor', 'Carregador por indução'
]

export const technologyItems = [
  'Central multimídia', 'Tela sensível ao toque', 'Android Auto', 'Apple CarPlay',
  'Navegador GPS', 'Wi-Fi a bordo', 'Bluetooth', 'Entrada USB', 'Entrada USB-C',
  'Entrada auxiliar', 'Rádio AM/FM', 'Rádio digital', 'Carregador de celular sem fio',
  'Head-up display', 'Painel de instrumentos digital', 'Painel de instrumentos configurável',
  'Câmera 360°', 'Sistema de som premium', 'Som surround', 'Subwoofer',
  'Comando de voz', 'Comandos no volante', 'Aplicativo para smartphone',
  'Atualizações over-the-air', 'Reconhecimento de placas', 'Assistente de faixa'
]

// Função para gerar array de anos (últimos 20 anos)
export const getYearOptions = () => {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let i = 0; i < 20; i++) {
    years.push(currentYear - i)
  }
  return years
}