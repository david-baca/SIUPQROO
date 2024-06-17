import * as XLSX from 'xlsx'
import { Link } from 'react-router-dom';
import '../styles/input.css'
const ExportExcel = () => {
  const exportToExcel = () => {
    const data = [
      { name: 'John', age: 28 },
      { name: 'Jane', age: 22 },
    ]

    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

    XLSX.writeFile(wb, 'data.xlsx')
  }

  return (
    <>
    <div className="container flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link to="/">Home</Link>
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          <Link to="/about">About</Link>
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Excel
        </button>
    </div>
    <div>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" 
        onClick={exportToExcel}>
        Decargar un Excel
        </button>
    </div>
    </>
  )
}

export default ExportExcel
