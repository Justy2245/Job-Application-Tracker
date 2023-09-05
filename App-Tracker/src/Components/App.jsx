import { useEffect, useState } from 'react';
import './App.css';
import Input from "./Input";
import Delete from './Delete';
import Edit from './Edit';

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

  const updateText = (event, index) => {
    const array = apps.map((data, index1) => {
      if(index === index1) {
        return {...data, [event.target.name]: event.target.value};
      }
      else {
        return data;
      }
    });
    setApps(array);
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
        {apps.map((apps, index) => (
          <section key = {apps.jobapp_id}>
            <div className ='label'type='button' data-bs-toggle='collapse' data-bs-target={`#${apps.jobapp_id}`}>
              <h4>{apps.title}</h4>
              <h4 className='symbol'></h4>
            </div>
            <div h4 className = 'collapse content' id = {`${apps.jobapp_id}`}>
              <h4>{apps.company}</h4>
              <h4>{apps.location}</h4>
              <h4>{apps.status} on {fixDate(apps.date_applied)}</h4>
              <textarea cols="50" rows="6" value = {`${apps.extrainfo}`} name = 'extrainfo' onChange ={event => updateText(event, index)}></textarea>
              <Delete app = {apps}/>
              <Edit app = {apps}/>
            </div>
          </section>
        ))}
      </div>
    </>
  )
}

export default App
