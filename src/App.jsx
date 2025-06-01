import { useState } from 'react'
import GridRain from './components/GridRain'


function App() {
 

  return (
    <>
     <main className="app-container">
      <GridRain  rows={15} columns={20}/>
     </main>
    </>
  )
}

export default App
