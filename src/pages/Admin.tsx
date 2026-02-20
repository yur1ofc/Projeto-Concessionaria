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
  const [form, setForm] = useState({
    name: "",
    price: "",
    year: "",
    km: "",
    transmission: "",
    fuel: "",
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
      createdAt: new Date().toLocaleDateString(),
      ...form,
    }

    setCars([newCar, ...cars])
    setForm({
      name: "",
      price: "",
      year: "",
      km: "",
      transmission: "",
      fuel: "",
      description: "",
      image: "",
    })
  }

  const removeCar = (id: number) => {
    setCars(cars.filter(car => car.id !== id))
  }

  if (!authenticated) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginCard}>
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
      <h1 style={{ marginBottom: 10 }}>Dashboard</h1>

      {/* RESUMO */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <h3>Total de Veículos</h3>
          <p style={styles.statNumber}>{cars.length}</p>
        </div>
      </div>

      {/* FORMULÁRIO */}
      <div style={styles.card}>
        <h2>Adicionar Veículo</h2>

        <div style={styles.grid}>
          <input
            placeholder="Nome do Veículo"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            style={styles.input}
          />

          <input
            placeholder="Preço"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
            style={styles.input}
          />

          <input
            placeholder="Ano"
            value={form.year}
            onChange={e => setForm({ ...form, year: e.target.value })}
            style={styles.input}
          />

          <input
            placeholder="KM"
            value={form.km}
            onChange={e => setForm({ ...form, km: e.target.value })}
            style={styles.input}
          />

          <input
            placeholder="Câmbio"
            value={form.transmission}
            onChange={e => setForm({ ...form, transmission: e.target.value })}
            style={styles.input}
          />

          <input
            placeholder="Combustível"
            value={form.fuel}
            onChange={e => setForm({ ...form, fuel: e.target.value })}
            style={styles.input}
          />

          <input
            placeholder="URL da Imagem"
            value={form.image}
            onChange={e => setForm({ ...form, image: e.target.value })}
            style={styles.input}
          />
        </div>

        <textarea
          placeholder="Descrição"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          style={{ ...styles.input, height: 100, marginTop: 10 }}
        />

        <button onClick={addCar} style={styles.primaryButton}>
          + Adicionar Veículo
        </button>
      </div>

      {/* LISTA */}
      <div style={{ marginTop: 40 }}>
        <h2>Veículos Cadastrados</h2>

        {cars.length === 0 && <p>Nenhum veículo cadastrado.</p>}

        {cars.map(car => (
          <div key={car.id} style={styles.carCard}>
            <img
              src={car.image}
              alt={car.name}
              style={styles.carImage}
            />

            <div style={{ flex: 1 }}>
              <h3>{car.name}</h3>
              <p><strong>{car.price}</strong></p>
              <p>{car.year} • {car.km} km • {car.transmission} • {car.fuel}</p>
              <p style={{ fontSize: 14, opacity: 0.7 }}>
                Cadastrado em: {car.createdAt}
              </p>
            </div>

            <button
              onClick={() => removeCar(car.id)}
              style={styles.deleteButton}
            >
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
  card: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 10,
    marginTop: 20
  },
  statsContainer: {
    display: "flex",
    gap: 20
  },
  statCard: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 10,
    width: 200
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "bold"
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
  outline: "none"
},
  primaryButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold"
  },
  deleteButton: {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: 10,
    borderRadius: 6,
    cursor: "pointer",
    height: 40
  },
  carCard: {
    display: "flex",
    gap: 20,
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
  loginContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a"
  },
  loginCard: {
    backgroundColor: "#1e293b",
    padding: 30,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: 300
  }
}
