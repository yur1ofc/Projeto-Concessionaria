import { useState, useEffect } from "react"

interface Car {
  id: number
  name: string
  price: string
  description: string
  image: string
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [cars, setCars] = useState<Car[]>([])
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  })

  useEffect(() => {
    const savedCars = localStorage.getItem("cars")
    if (savedCars) {
      setCars(JSON.parse(savedCars))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cars", JSON.stringify(cars))
  }, [cars])

  const handleLogin = () => {
    if (password === "1234") {
      setAuthenticated(true)
    } else {
      alert("Senha incorreta")
    }
  }

  const addCar = () => {
    if (!form.name || !form.price) return

    const newCar: Car = {
      id: Date.now(),
      ...form,
    }

    setCars([...cars, newCar])
    setForm({ name: "", price: "", description: "", image: "" })
  }

  const removeCar = (id: number) => {
    setCars(cars.filter(car => car.id !== id))
  }

  if (!authenticated) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Painel Administrativo</h2>
        <input
          type="password"
          placeholder="Digite a senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Entrar</button>
      </div>
    )
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Painel Admin</h2>

      <h3>Adicionar Carro</h3>
      <input
        placeholder="Nome"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Preço"
        value={form.price}
        onChange={e => setForm({ ...form, price: e.target.value })}
      />
      <input
        placeholder="Descrição"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />
      <input
        placeholder="URL da Imagem"
        value={form.image}
        onChange={e => setForm({ ...form, image: e.target.value })}
      />
      <button onClick={addCar}>Adicionar</button>

      <h3>Carros Cadastrados</h3>
      {cars.map(car => (
        <div key={car.id} style={{ marginBottom: 20 }}>
          <h4>{car.name}</h4>
          <p>{car.price}</p>
          <button onClick={() => removeCar(car.id)}>Remover</button>
        </div>
      ))}
    </div>
  )
}
