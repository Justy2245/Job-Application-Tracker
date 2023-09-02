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
      <div>
        {apps.map(apps => (
          <section key = {apps.jobapp_id}>
            <h4>{apps.title}</h4>
          </section>
        ))}
      </div>
    </>
  )
}

export default App
