import { useState } from 'react'
import './App.css'

function App() {
  const getApps = async () => {
        try {
            const data = await fetch('http://localhost:5000/apps');
            const json = await data.json();
            setVGames(json);
        } catch (error) {
            console.log(error.message);
        }
    };

  /*useEffect(() => {
        getApps();
    }, []);*/

  return (
    <>
      <div className='header'>
        <h1>Job Application Tracker</h1>
        <input type="text" Test/>
        <button>Search</button>
      </div>
    </>
  )
}

export default App
