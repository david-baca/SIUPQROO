//import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';
import "../styles/index.css"

const Home = () => {
    //variables de pagina -ejemplo
  //const [count, setCount] = useState(0)

  return (
    <>
      <div className="container flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Home
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          <Link to="/about">About</Link>
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          <Link to="/excel">Excel</Link>
        </button>
      </div>
      <div>
        <h1>bienvenido a home</h1>
      </div>
    </>
  )
}

export default Home
