import { useState, useEffect } from "react"

interface Car {
  id: number
  name: string
  price: string
  year: string
  km: string
  transmission: string
  fuel: string
  description: string
  image: string
  createdAt: string
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [cars, setCars] = useState<Car[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)

  const emptyForm = {
    name: "",
    price: "",
    year: "",
    km: "",
    transmission: "",
    fuel: "",
    description: "",
    image: "",
  }

  const [form, setForm] = useState(emptyForm)

  // Persistência login
  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (auth === "true") setAuthenticated(true)

    const savedCars = localStorage.getItem("cars")
    if (savedCars) setCars(JSON.parse(savedCars))
  }, [])

  useEffect(() => {
    localStorage.setItem("cars", JSON.stringify(cars))
  }, [cars])

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
  }

  const saveCar = () => {
    if (!form.name || !form.price) {
      alert("Preencha nome e preço")
      return
    }

    if (editingId) {
      setCars(cars.map(car =>
        car.id === editingId ? { ...car, ...form } : car
      ))
      setEditingId(null)
    } else {
      const newCar: Car = {
        id: Date.now(),
        createdAt: new Date().toLocaleDateString(),
        ...form,
      }
      setCars([newCar, ...cars])
    }

    setForm(emptyForm)
  }

  const editCar = (car: Car) => {
    setForm(car)
    setEditingId(car.id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const removeCar = (id: number) => {
    if (confirm("Tem certeza que deseja remover este veículo?")) {
      setCars(cars.filter(car => car.id !== id))
    }
  }

  if (!authenticated) {
    return (
      <div style={styles.center}>
        <div style={styles.card}>
          <h2>Painel Administrativo</h2>
          <input
            type="password"
            placeholder="Digite a senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleLogin} style={styles.primaryButton}>
            Entrar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <h1>Dashboard</h1>
        <button onClick={handleLogout} style={styles.deleteButton}>
          Sair
        </button>
      </div>

      <div style={styles.card}>
        <h2>{editingId ? "Editar Veículo" : "Adicionar Veículo"}</h2>

        <div style={styles.grid}>
          {Object.keys(emptyForm).map((key) => (
            key !== "description" && (
              <input
                key={key}
                placeholder={key.toUpperCase()}
                value={(form as any)[key]}
                onChange={e =>
                  setForm({ ...form, [key]: e.target.value })
                }
                style={styles.input}
              />
            )
          ))}
        </div>

        <textarea
          placeholder="Descrição"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          style={{ ...styles.input, height: 100 }}
        />

        <button onClick={saveCar} style={styles.primaryButton}>
          {editingId ? "Salvar Alterações" : "Adicionar Veículo"}
        </button>
      </div>

      <div style={{ marginTop: 40 }}>
        <h2>Veículos Cadastrados ({cars.length})</h2>

        {cars.map(car => (
          <div key={car.id} style={styles.carCard}>
            <img
              src={car.image || "https://via.placeholder.com/150"}
              alt={car.name}
              style={styles.carImage}
              onError={(e: any) =>
                e.target.src = "https://via.placeholder.com/150"
              }
            />

            <div style={{ flex: 1 }}>
              <h3>{car.name}</h3>
              <p><strong>{car.price}</strong></p>
              <p>{car.year} • {car.km} km • {car.transmission} • {car.fuel}</p>
              <p style={{ fontSize: 12, opacity: 0.6 }}>
                Cadastrado em: {car.createdAt}
              </p>
            </div>

            <button onClick={() => editCar(car)} style={styles.primaryButton}>
              Editar
            </button>

            <button onClick={() => removeCar(car.id)} style={styles.deleteButton}>
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles: any = {
  container: {
    padding: 40,
    backgroundColor: "#0f172a",
    minHeight: "100vh",
    color: "white",
    fontFamily: "Arial"
  },
  center: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a"
  },
  card: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 10,
    marginTop: 20
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10
  },
  input: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #334155",
    marginTop: 10,
    backgroundColor: "#0f172a",
    color: "#ffffff",
  },
  primaryButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold"
  },
  deleteButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  },
  carCard: {
    display: "flex",
    gap: 15,
    backgroundColor: "#1e293b",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center"
  },
  carImage: {
    width: 120,
    height: 80,
    objectFit: "cover",
    borderRadius: 6
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
}
