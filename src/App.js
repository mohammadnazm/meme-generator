import { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [templates, setTemplates] = useState([])
  const [template, setTemplate] = useState()

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then(x =>
      x.json().then(response => setTemplates(response.data.memes))
    )
  }, [])

  return (
    <div style={{ textAlign: "center" }}>
      {!template &&
        templates.map(template => {
          return (
            <img
              style={{ width: 200 }}
              src={template.url}
              alt={template.name}
              key={template.id}
              onClick={() => {
                setTemplate(template)
              }}
            />
          )
        })}
    </div>
  )
}

export default App
