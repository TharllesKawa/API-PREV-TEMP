import { useState } from "react";
import './App.css'
import {TbTemperatureCelsius} from 'react-icons/tb'
import {RiTempColdLine} from 'react-icons/ri'

function App() {
  const [city, setCity] = useState("");
  const [weatherForcast, setWeatherForcast] = useState(null);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=f0f0158248f948a3b3902616222008&q=${city}&lang=pt`
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        setWeatherForcast(data);
      });
  };

  return (
    <div className='div'>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a href="#top" className="navbar-brand text-white">
          Previsão do Tempo
        </a>
      </nav>

      <main className="container">
        <div className="py-5">
          <h1>Tempo agora em: {city}</h1>

          <p className="lead">
            Digite o nome da sua cidade no campo abaixo e em seguida clique em
            pesquisar
          </p>

          <div className="row mb-4">
            <div className="col-md-6">
              <input
                onChange={handleChange}
                className="form-control"
                value={city}
              />
            </div>
          </div>

          <button onClick={handleSearch} className="btn btn-primary btn-lg">
            Pesquisar
          </button>

          {weatherForcast ? (
            <div>
              <div className="mt-4 d-flex align-items-center">
                <div>
                  <img src={weatherForcast.current.condition.icon} alt="" />
                </div>

                <div className="sla">
                  <h1>{city}</h1>
                  <h3>{weatherForcast.current.condition.text}</h3>
                  <p className='lead'>
                    <TbTemperatureCelsius/>Temperatura: {weatherForcast.current.temp_c}
                  </p>
                  <p className="lead2">
                    <RiTempColdLine/>Umidade: {weatherForcast.current.humidity}
                  </p>
                </div>

              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default App;
