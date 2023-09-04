import { useEffect, useState } from 'react';
import './App.css';
import Input from "./Input";
import Delete from './Delete';

function App() {

  const [apps, setApps] = useState([]);

  //get all applications
  const getApps = async () => {
        try {
            const data = await fetch('http://localhost:5000/apps');
            const json = await data.json();
            setApps(json);
        } catch (error) {
            console.log(error.message);
        }
    };


  //fix the formatting of date, since the date has a timestamp after the date
  const fixDate = (date) => {
    date = date.slice(0, 10);
    return date;
  }

  //triggers on refresh
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
        <input type='text' Test/>
        <button>Search</button>
      </div>
      <div className = 'body'>
        {apps.map(apps => (
          <section key = {apps.jobapp_id}>
            <h4 type='button' data-bs-toggle='collapse' data-bs-target={`#${apps.jobapp_id}`}>{apps.title}</h4>
            <div h4 className = 'collapse' id = {`${apps.jobapp_id}`}>
              <h4>{apps.company}</h4>
              <h4>{apps.location}</h4>
              <h4>{apps.status} on {fixDate(apps.date_applied)}</h4>
              <h4>{apps.extrainfo}</h4>
              <Delete app = {apps}/>
            </div>
          </section>
        ))}
      </div>
    </>
  )
}

export default App
