import { useEffect, useState } from 'react';
import './App.css';
import Input from "./Input";

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

  const deleteApp = async event => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/apps', {
        method: 'DELETE',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(apps)
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
        getApps();
    }, []);

  return (
    <>
      <div className='header'>
        <h1>Job Application Tracker</h1>
        <div className='buttons'>
          <Input apps/>
        </div>
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
            <button type="button" onClick = {event => deleteApp(event)}>Delete</button>
          </section>
        ))}
      </div>
    </>
  )
}

export default App
