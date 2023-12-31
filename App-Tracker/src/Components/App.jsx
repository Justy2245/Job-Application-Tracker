import { useEffect, useState } from 'react';
import './App.css';
import Input from "./Input";
import Delete from './Delete';
import Edit from './Edit';

function App() {

  //setApps to store state of database
  const [apps, setApps] = useState([]);
  //setSearch to store state for searching
  const [search, setSearch] = useState([]);

  //get all applications sorted by title
  const getApps = async () => {
    try {
        const data = await fetch('http://localhost:5000/apps');
        const json = await data.json();
        setApps(json);
        //used in searchApps function
        setSearch(json);
    } catch (error) {
        console.log(error.message);
    }
  };

  //get all applications sorted by date
  const getAppsDate = async () => {
    try {
        const data = await fetch('http://localhost:5000/apps/date');
        const json = await data.json();
        setApps(json);
        setSearch(json);
    } catch (error) {
        console.log(error.message);
    }
  };

  //fix the formatting of date, since the date has a timestamp after the date
  //date when retrieved from databse is in the format: yyyy-mm-ddT07:00:00.000Z
  const fixDate = (date) => {
    date = date.slice(0, 10);
    return date;
  }

  //update text in text field
  const updateText = (event, index, jobapp_id) => {
    //since in map it expects an array to be returned when setting state
    const array = apps.map((data, index1) => {
      if(index === index1) {
        return {...data, [event.target.name]: event.target.value};
      }
      else {
        return data;
      }
    });
    setApps(array);
    //pass array since apps doesn't update in time
    updateTextPut(index, array);
  }

  //update database with new text in text field
  const updateTextPut = async (index, array) => {
    try {
        const response = await fetch(`http://localhost:5000/apps`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(array[index])
        });
    } catch (error) {
          console.error(error.message);
    }
  }

  //update state from other components
  const handleState = (app) => {
    const array = apps.map((data) => {
      //find application to update by id
      if(data.jobapp_id === app.jobapp_id) {
        return {...data, ['title']: app.title, ['company']: app.company, 
                         ['location']: app.location, ['status']: app.status};
      }
      else {
        return data;
      }
    });
    setApps(array);
  }

  //Search for application by title
  const searchApp = async (event) => {
    //resets list if search bar is empty
    if(event.target.value === "")
    {
      getAppsDate();
    }
    else
    {
      var searchValue;
      //filters list by company if "company:" is present
      if(event.target.value.slice(0, 8).toLowerCase() === 'company:')
      {
        searchValue = search.filter((search) => search.company.toLowerCase().includes(event.target.value.slice(8, event.target.value.size).toLowerCase()));
      }
      //filters list by location if "location:" is present
      else if(event.target.value.slice(0, 9).toLowerCase() === 'location:')
      {
        searchValue = search.filter((search) => search.location.toLowerCase().includes(event.target.value.slice(9, event.target.value.size).toLowerCase()));
      }
      //filters list by title by default
      else
      {
        searchValue = search.filter((search) => search.title.toLowerCase().includes(event.target.value.toLowerCase()));
      }
      setApps(searchValue);
    }
  }

  //triggers on refresh
  useEffect(() => {
        getAppsDate();
    }, []);

  return (
    <>
      <div className='header'>
        <h1>Job Application Tracker</h1>
        <div className='buttons'>
          <Input apps/>
          <button className = 'btn btn-primary' onClick ={() => getAppsDate()}>Sort by date</button>
          <button className = 'btn btn-primary' onClick ={() => getApps()}>Sort by title</button>
        </div>
        <h4>Number of applications: {`${apps.length}`}</h4>
        <input type='text' placeholder='Search' onChange = {event => searchApp(event)}/>
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
              <textarea className ='mb-1' cols='50' rows='6' value = {`${apps.extrainfo}`} name = 'extrainfo' placeholder='Enter text here' onChange ={event => updateText(event, index, apps.jobapp_id)}></textarea>
              <Edit app = {apps} setApp = {handleState}/>
              <Delete app = {apps}/>
            </div>
          </section>
        ))}
      </div>
    </>
  )
}

export default App
