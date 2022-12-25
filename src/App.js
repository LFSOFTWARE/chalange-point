import { useState } from 'react';
import './App.css';

function App() {
  const [points, setPoints] = useState([])
  const [pointsCopy, setPointsCopy] = useState([])

  const generatePoints = (event) => {
    const { clientX, clientY } = event
    setPoints((prev) => [...prev, { clientX, clientY }])
    setPointsCopy((prev) => [...prev, { clientX, clientY }])
  }

  const blockPointOnTheButton = () => {
    if (points.length === 0) return
    setPoints((prev) => {
      let arr = [...prev]
      arr.slice(0, points.length - 1)
      return arr
    })
  }

  const undo = (event) => {
    event.stopPropagation()
    blockPointOnTheButton()

    setPoints((prev) => {
      let arr = [...prev]
      arr.pop();
      return arr
    })
  }

  const redo = (event) => {
    event.stopPropagation()
    blockPointOnTheButton()
    try {
      
      const lastPositon = points.at(-1)
      const indexCopy = pointsCopy.findIndex((p) => p.clientX === lastPositon.clientX && p.clientY === lastPositon.clientY)
  
      setPoints((prev) => {
        let arr = [...prev]
        if (pointsCopy[indexCopy + 1] !== undefined) {
          arr.push(pointsCopy[indexCopy + 1]);
        }
        return arr
      })
    } catch (error) {
      setPoints((prev) => {
        let arr = [...prev]
          arr.push(pointsCopy[0]);
        return arr
      })
    }

  }



  return (
    <div className="container" onClick={generatePoints}>
      <div className='btns'>
        <button onClick={undo}>Voltar</button>
        <button onClick={redo}>Refazer</button>
      </div>
      {points.map((point) => (
        <div key={JSON.stringify(point)} className='circle' style={{ top: point.clientY, left: point.clientX, position: "absolute" }}></div>
      ))}
    </div>
  );
}

export default App;
