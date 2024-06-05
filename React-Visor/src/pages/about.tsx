//import { useState } from 'react'
import { Link } from 'react-router-dom';

const About = () => {
    //variables de pagina -ejemplo
  //const [count, setCount] = useState(0)

  return (
    <>
      <div className="container flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link to="/">Home</Link>
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          About
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          <Link to="/excel">Excel</Link>
        </button>
      </div>
      <div>
        <h1>bienvenido a about</h1>
      </div>
    </>
  )
}

export default About
