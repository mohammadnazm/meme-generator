import { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [templates, setTemplates] = useState([])

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then(x =>
      x.json().then(response => setTemplates(response.data.memes))
    )
  }, [])

  return (
    <div className="App">
      <h1>Hi</h1>
    </div>
  )
}

export default App
