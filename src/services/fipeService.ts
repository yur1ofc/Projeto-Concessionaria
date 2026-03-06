// API FIPE - https://deividfortuna.github.io/fipe/ [citation:1][citation:5]
const BASE_URL = 'https://fipe.parallelum.com.br/api/v2';

export interface FipeBrand {
  code: number;
  name: string;
}

export interface FipeModel {
  code: number;
  name: string;
}

export interface FipeYear {
  code: string;
  name: string;
}

export interface FipeVehicle {
  brand: string;
  model: string;
  modelYear: number;
  fuel: string;
  price: string;
  codeFipe: string;
  referenceMonth: string;
}

// Buscar marcas de carros
export async function getBrands(): Promise<FipeBrand[]> {
  try {
    const response = await fetch(`${BASE_URL}/cars/brands`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar marcas:', error);
    return [];
  }
}

// Buscar modelos de uma marca
export async function getModels(brandId: number): Promise<FipeModel[]> {
  try {
    const response = await fetch(`${BASE_URL}/cars/brands/${brandId}/models`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar modelos:', error);
    return [];
  }
}

// Buscar anos de um modelo
export async function getYears(brandId: number, modelId: number): Promise<FipeYear[]> {
  try {
    const response = await fetch(`${BASE_URL}/cars/brands/${brandId}/models/${modelId}/years`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar anos:', error);
    return [];
  }
}

// Buscar dados completos do veículo
export async function getVehicleData(brandId: number, modelId: number, yearCode: string): Promise<FipeVehicle | null> {
  try {
    const response = await fetch(`${BASE_URL}/cars/brands/${brandId}/models/${modelId}/years/${yearCode}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados do veículo:', error);
    return null;
  }
}

// Mapeamento de combustível FIPE para nosso sistema
export function mapFuelType(fipeFuel: string): string {
  const fuelMap: Record<string, string> = {
    'Gasolina': 'Gasolina',
    'Etanol': 'Flex',
    'Álcool': 'Flex',
    'Diesel': 'Diesel',
    'Flex': 'Flex',
    'Híbrido': 'Híbrido',
    'Elétrico': 'Elétrico'
  };
  return fuelMap[fipeFuel] || 'Gasolina';
}

// Mapa de modelos conhecidos para especificações (quando a API não retorna tudo)
export const modelSpecs: Record<string, Partial<any>> = {
  'Porsche 911': {
    doors: 2,
    seats: 4,
    engine: '3.0 Bi-Turbo',
    horsepower: 385,
    transmission: 'Automático',
    gears: 8,
    traction: 'Traseira'
  },
  'Porsche 911 Carrera': {
    doors: 2,
    seats: 4,
    engine: '3.0 Bi-Turbo',
    horsepower: 385,
    transmission: 'Automático',
    gears: 8,
    traction: 'Traseira'
  },
  'Porsche 911 Turbo': {
    doors: 2,
    seats: 4,
    engine: '3.8 Bi-Turbo',
    horsepower: 580,
    transmission: 'Automático',
    gears: 8,
    traction: 'Integral 4x4'
  },
  'Ferrari F8': {
    doors: 2,
    seats: 2,
    engine: '3.9 V8',
    horsepower: 720,
    transmission: 'Automático',
    gears: 7,
    traction: 'Traseira'
  },
  'Lamborghini Huracan': {
    doors: 2,
    seats: 2,
    engine: '5.2 V10',
    horsepower: 610,
    transmission: 'Automático',
    gears: 7,
    traction: 'Integral 4x4'
  }
};