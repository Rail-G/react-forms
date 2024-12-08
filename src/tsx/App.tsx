import '../css/App.css'
import { HexToRgb } from './task1/HexToRgb'
import { Table } from './task2/Table'
import { Images } from './task3/Images'
// import { HexToRgb } from './task1/HexToRgb'

function App() {
  return (
    <>
      <div className="task1">
        <HexToRgb />
      </div>
      <div className="task2">
        <Table />
      </div>
      <div className="task3">
        <Images />
      </div>
    </>
  )
}

export default App
