import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [apps, setApps] = useState([]);

  const getApps = async () => {
        try {
            const data = await fetch('http://localhost:5000/apps');
            const json = await data.json();
            setApps(json);
        } catch (error) {
            console.log(error.message);
        }
    };

  useEffect(() => {
        getApps();
    }, []);

  return (
    <>
      <div className='header'>
        <h1>Job Application Tracker</h1>
        <input type="text" Test/>
        <button>Search</button>
      </div>
      <div className = 'body'>
        {apps.map(apps => (
          <section key = {apps.jobapp_id}>
            <h4>{apps.title}</h4>
            <h4>{apps.company}</h4>
            <h4>{apps.location}</h4>
            <h4>{apps.status}</h4>
            <h4>{apps.extrainfo}</h4>
            <h4>{apps.date_applied}</h4>
          </section>
        ))}
      </div>
    </>
  )
}

export default App
