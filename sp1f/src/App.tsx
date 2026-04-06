import './App.css'
import { Column } from './Column'

function App() {
  return (
    <>
    <header className="columns">
      <Column name="New"/>
      <Column name="Screening"/>
      <Column name="Interview"/>
      <Column name='Offer'/>
      <Column name='Hired'/>
    </header>
    </>
  )
}

export default App
