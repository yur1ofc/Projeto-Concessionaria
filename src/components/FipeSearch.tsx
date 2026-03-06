import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { CustomSelect } from './ui/CustomSelect';
import { Search, Loader2 } from 'lucide-react';
import { getBrands, getModels, getYears, getVehicleData, FipeBrand, FipeModel, FipeYear, mapFuelType } from '@/services/fipeService';
import { Car } from '@/types/car';

interface FipeSearchProps {
  onVehicleFound: (data: Partial<Car>) => void;
  className?: string;
}

export const FipeSearch = ({ onVehicleFound, className }: FipeSearchProps) => {
  const [brands, setBrands] = useState<FipeBrand[]>([]);
  const [models, setModels] = useState<FipeModel[]>([]);
  const [years, setYears] = useState<FipeYear[]>([]);
  
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  
  const [loading, setLoading] = useState({
    brands: false,
    models: false,
    years: false,
    search: false
  });

  // Carregar marcas ao montar
  useEffect(() => {
    loadBrands();
  }, []);

  // Carregar modelos quando marca mudar
  useEffect(() => {
    if (selectedBrand) {
      loadModels(parseInt(selectedBrand));
      setSelectedModel('');
      setSelectedYear('');
      setYears([]);
    }
  }, [selectedBrand]);

  // Carregar anos quando modelo mudar
  useEffect(() => {
    if (selectedBrand && selectedModel) {
      loadYears(parseInt(selectedBrand), parseInt(selectedModel));
      setSelectedYear('');
    }
  }, [selectedModel]);

  const loadBrands = async () => {
    setLoading(prev => ({ ...prev, brands: true }));
    const data = await getBrands();
    setBrands(data);
    setLoading(prev => ({ ...prev, brands: false }));
  };

  const loadModels = async (brandId: number) => {
    setLoading(prev => ({ ...prev, models: true }));
    const data = await getModels(brandId);
    setModels(data);
    setLoading(prev => ({ ...prev, models: false }));
  };

  const loadYears = async (brandId: number, modelId: number) => {
    setLoading(prev => ({ ...prev, years: true }));
    const data = await getYears(brandId, modelId);
    setYears(data);
    setLoading(prev => ({ ...prev, years: false }));
  };

  const handleSearch = async () => {
    if (!selectedBrand || !selectedModel || !selectedYear) {
      alert('Selecione marca, modelo e ano');
      return;
    }

    setLoading(prev => ({ ...prev, search: true }));

    try {
      const vehicleData = await getVehicleData(
        parseInt(selectedBrand),
        parseInt(selectedModel),
        selectedYear
      );

      if (vehicleData) {
        // Encontrar a marca e modelo selecionados
        const brand = brands.find(b => b.code.toString() === selectedBrand)?.name || '';
        const model = models.find(m => m.code.toString() === selectedModel)?.name || '';
        
        // Extrair especificações conhecidas do modelo
        const modelKey = `${brand} ${model}`;
        const specs = (window as any).modelSpecs?.[modelKey] || {};

        // Montar dados do veículo
        const carData: Partial<Car> = {
          brand,
          model,
          version: '',
          year: new Date().getFullYear(),
          yearModel: vehicleData.modelYear || new Date().getFullYear(),
          price: parseFloat(vehicleData.price.replace(/[^\d,]/g, '').replace(',', '.')) || 0,
          fuel: mapFuelType(vehicleData.fuel),
          transmission: specs.transmission || 'Automático',
          gears: specs.gears || 6,
          traction: specs.traction || 'Dianteira',
          doors: specs.doors || 4,
          seats: specs.seats || 5,
          engine: specs.engine || '',
          horsepower: specs.horsepower || 0,
          ...specs
        };

        onVehicleFound(carData);
      }
    } catch (error) {
      console.error('Erro na busca:', error);
      alert('Erro ao buscar dados do veículo');
    }

    setLoading(prev => ({ ...prev, search: false }));
  };

  return (
    <div className={className}>
      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 mb-6">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <Search size={18} className="text-primary" />
          Buscar veículo na Tabela FIPE
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <CustomSelect
            label="Marca"
            value={selectedBrand}
            onChange={setSelectedBrand}
            options={brands.map(b => ({ value: b.code.toString(), label: b.name }))}
            placeholder={loading.brands ? "Carregando..." : "Selecione a marca"}
          />

          <CustomSelect
            label="Modelo"
            value={selectedModel}
            onChange={setSelectedModel}
            options={models.map(m => ({ value: m.code.toString(), label: m.name }))}
            placeholder={loading.models ? "Carregando..." : "Selecione o modelo"}
            disabled={!selectedBrand}
          />

          <CustomSelect
            label="Ano"
            value={selectedYear}
            onChange={setSelectedYear}
            options={years.map(y => ({ value: y.code, label: y.name }))}
            placeholder={loading.years ? "Carregando..." : "Selecione o ano"}
            disabled={!selectedModel}
          />

          <div className="flex items-end">
            <Button
              onClick={handleSearch}
              disabled={!selectedBrand || !selectedModel || !selectedYear || loading.search}
              className="w-full"
            >
              {loading.search ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Buscar
                </>
              )}
            </Button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-2">
          🔍 Dados da Tabela FIPE - Atualizado mensalmente [citation:5]
        </p>
      </div>
    </div>
  );
};