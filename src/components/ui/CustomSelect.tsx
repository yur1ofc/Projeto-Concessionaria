import * as React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { Label } from "./label"
import { cn } from "@/lib/utils"

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: readonly string[] | string[] | Option[]
  placeholder?: string
  className?: string
  required?: boolean
  disabled?: boolean
}

export const CustomSelect = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Selecione...",
  className,
  required = false,
  disabled = false
}: CustomSelectProps) => {
  // Verificar se options é array de strings ou de objetos
  const isStringArray = options.length > 0 && typeof options[0] === 'string';
  
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </Label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="bg-background">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {isStringArray ? (
            // Array de strings
            (options as string[]).map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))
          ) : (
            // Array de objetos {value, label}
            (options as Option[]).map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  )
}