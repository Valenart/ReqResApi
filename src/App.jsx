import { useState, useEffect } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [data, setData] = useState([])


  const getUsers = async () => {
    try {
      const apiKey = import.meta.env.VITE_X_API_KEY;
      const response = await axios.get("https://reqres.in/api/users?page=1", {
        headers: {
          'x-api-key': apiKey,
          "Content-Type": "application/json",
        },
      });

      // o endpoint retorna { data: [ ... ] }, então pegamos response.data.data
      setData(response.data.data || []);
      console.log("TESTE: ", response.data);
    }
    catch (error) {
      console.log("Erro ao buscar dados dos usuários: ", error);
    }
  }

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Aplicação simples para mostrar o consumo da API do ReqRes</h1>


      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {data.map((user) => (
          <div key={user.id} style={{ width: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '1px solid #ccc', borderRadius: '10px', padding: '10px', backgroundColor: '#3e495eff' }}>
            <img
              style={{ borderRadius: '50%', width: '100px', height: '100px', objectFit: 'cover', margin: '10px' }}
              src={user.avatar}
              alt={"Foto do usuário " + user.first_name}
            />
            <div>
              <h2>Informações do Usuário</h2>
              <h3>{user.first_name} {user.last_name}</h3>
              <p>{user.email}</p>
            </div>
          </div>
        ))}
      </div>

    </>
  )
}

export default App
