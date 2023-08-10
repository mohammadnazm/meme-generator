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
    <div style={{ textAlign: "center" }}>
      {templates.map(template => {
        return <img src={template.url} alt={template.name} key={template.id} />
      })}
    </div>
  )
}

export default App
