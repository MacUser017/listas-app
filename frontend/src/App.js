import { useState, useEffect } from 'react';

function App() {
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
const [zenQuote, setZenQuote] = useState(null);
const [stockData, setStockData] = useState(null);
const [email, setEmail] = useState('');
const [emailSubmitted, setEmailSubmitted] = useState(false);



 


  useEffect(() => {
    loadTasks();
    fetchWeather();
    fetchZenQuote();
    fetchStock();
 }, []);



  const loadTasks = () => {
    fetch('http://localhost:3000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  };

  const addTask = () => {
    if (!taskInput.trim()) return;
    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: taskInput })
    }).then(() => {
      setTaskInput('');
      loadTasks();
    });
  };
  

     const fetchWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=New York&appid=7513cb62779431df16c7638a871fc8d5&units=metric
`)
      .then(res => res.json())
      .then(data => setWeatherData(data));
     };

     const fetchZenQuote = () => {
  fetch('https://api.allorigins.win/get?disableCache=true&url=' + encodeURIComponent('https://zenquotes.io/api/today'))
    .then(res => {
      if (!res.ok) {
        throw new Error(`Proxy fetch failed: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      const parsed = JSON.parse(data.contents); // Unwrap from proxy
      if (parsed && parsed[0]) {
        const quote = `${parsed[0].q} — ${parsed[0].a}`;
        console.log("✅ Zen quote via proxy:", quote);
        setZenQuote(quote);
      }
    })
    .catch(err => {
      console.error('❌ Proxy fetch error:', err);
      setZenQuote("Could not load quote — try again later.");
    });
};

const fetchStock = () => {
  fetch('https://financialmodelingprep.com/api/v3/quote/AAPL?apikey=fimlU8SPy8fXvDIqejqaJn5Kigeip9jv')
    .then(res => res.json())
    .then(data => {
      if (data && data[0]) {
        setStockData(data[0]);
      }
    })
    .catch(err => {
      console.error('❌ Stock fetch error:', err);
      setStockData(null);
    });
};





     
  return (
    
    <div>
      {/* Email Modal Overlay */}
      {!emailSubmitted && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)',
          zIndex: 2000,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white'
        }}>
          <h2>Enter your email to continue</h2>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email address"
            style={{ padding: '10px', fontSize: '16px', width: '300px', borderRadius: '5px', marginBottom: '10px' }}
          />
          <button
            onClick={() => {
              if (email.trim()) setEmailSubmitted(true);
            }}
            style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', borderRadius: '5px' }}
          >
            Continue
          </button>
        </div>
      )}



    

          {/* Main App Content */}

    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Listas</h1>
      <input
        value={taskInput}
        onChange={e => setTaskInput(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button onClick={addTask}>Agregar</button>
      <ul style={{ listStyle: 'none' }}>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>

      

      
    {/* 🧘 Zen Quote Display */}
{zenQuote && (
  <div
    style={{
      position: 'absolute',
      top: '10px',
      left: '10px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: '10px 15px',
      borderRadius: '8px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
      zIndex: 1000,
      maxWidth: '300px'
    }}// first top ends
  >
    <h4 style={{ margin: 0 }}>🧘 Quote of the Day</h4>
    <p
      style={{
        margin: 0,
        filter: 'blur(5px)',
        transition: 'filter 0.3s ease-in-out',
        cursor: 'pointer'
      }}
      onMouseEnter={e => (e.currentTarget.style.filter = 'none')}
      onMouseLeave={e => (e.currentTarget.style.filter = 'blur(5px)')}
    >
      {zenQuote}
    </p>
  </div>
)}


{stockData && (
  <div
    style={{
      position: 'absolute',
      bottom: '10px',
      left: '100px',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: '10px 15px',
      borderRadius: '8px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
      zIndex: 1000,
      maxWidth: '320px',
    
    }}//first top ends
  >
    <h4 style={{ margin: 0 }}>📈 Stock of the Day</h4>
    <p 
    style={{
       margin: 0,
       filter: 'blur(5px)',
        transition: 'filter 0.3s ease-in-out',
        cursor: 'pointer'
       }}
       
       onMouseEnter={e => (e.currentTarget.style.filter = 'none')}
  onMouseLeave={e => (e.currentTarget.style.filter = 'blur(5px)')}
       
       >
      <strong>{stockData.name}</strong> ({stockData.symbol})<br />
      Price: ${stockData.price} <br />
      
    </p>
  </div>
)}



      {weatherData && (
  <div
    style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: '10px 15px',
      borderRadius: '8px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
      zIndex: 1000
    }}
  >
    <h4 style={{ margin: 0 }}>🌤️ Today's Weather</h4>

    <p
      style={{
        margin: 0,
        filter: 'blur(5px)',
        transition: 'filter 0.3s ease-in-out',
        cursor: 'pointer'
      }}
  onMouseEnter={e => (e.currentTarget.style.filter = 'none')}
  onMouseLeave={e => (e.currentTarget.style.filter = 'blur(5px)')}
>
 

  {weatherData.name}: {weatherData.main.temp}°C, {weatherData.weather[0].description}
</p>
</div>

      
      )}

     



      


    </div>
     </div>
  );
}

export default App;
