import { useEffect, useState } from "react"
import "./App.css"
import Meme from "./components/Meme"

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
      {template && (
        <form>
          <Meme template={template} />
          <input placeholder="top text" />
          <input placeholder="bottom text" />
          <button type="button" />
        </form>
      )}
      {!template && (
        <>
          <h2>Pick A template</h2>
          {templates.map(template => {
            return (
              <Meme
                template={template}
                onClick={() => {
                  setTemplate(template)
                }}
              />
            )
          })}
        </>
      )}
    </div>
  )
}

export default App
