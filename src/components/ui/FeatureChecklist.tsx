import * as React from "react"
import { Checkbox } from "./checkbox"
import { Label } from "./label"
import { Input } from "./input"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeatureChecklistProps {
  title: string
  items: string[]
  selectedItems: string[]
  onChange: (items: string[]) => void
  className?: string
}

export const FeatureChecklist = ({
  title,
  items,
  selectedItems,
  onChange,
  className
}: FeatureChecklistProps) => {
  const [search, setSearch] = React.useState("")
  const [showAll, setShowAll] = React.useState(false)

  const filteredItems = items.filter(item => 
    item.toLowerCase().includes(search.toLowerCase())
  )

  const displayedItems = showAll ? filteredItems : filteredItems.slice(0, 10)

  const toggleItem = (item: string) => {
    if (selectedItems.includes(item)) {
      onChange(selectedItems.filter(i => i !== item))
    } else {
      onChange([...selectedItems, item])
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="font-semibold text-lg">{title}</h3>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          placeholder="Buscar item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
        {displayedItems.map((item) => (
          <div key={item} className="flex items-center space-x-2">
            <Checkbox
              id={item}
              checked={selectedItems.includes(item)}
              onCheckedChange={() => toggleItem(item)}
            />
            <Label htmlFor={item} className="text-sm cursor-pointer">
              {item}
            </Label>
          </div>
        ))}
      </div>

      {filteredItems.length > 10 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-primary text-sm hover:underline"
        >
          {showAll ? "Mostrar menos" : `Mostrar mais (${filteredItems.length - 10} itens)`}
        </button>
      )}

      <div className="text-sm text-muted-foreground">
        {selectedItems.length} itens selecionados
      </div>
    </div>
  )
}