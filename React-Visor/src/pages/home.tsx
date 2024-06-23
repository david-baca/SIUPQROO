import '../assets/styles/Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="container flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <Link to="/Home">Home</Link>
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          <Link to="/About">About</Link>
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          <Link to="/Excel">Excel</Link>
        </button>
      </div>
      <div>
        <h1>bienvenido a home</h1>
      </div>
    </>
  )
}

export default Home