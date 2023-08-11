import { useEffect, useState } from "react"
import "./App.css"
import Meme from "./components/Meme"

const objectToQueryParam = obj => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`)
  return "?" + params.join("&")
}

function App() {
  const [templates, setTemplates] = useState([])
  const [template, setTemplate] = useState()
  const [topText, setTopText] = useState()
  const [bottomText, setBottomText] = useState()

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then(x =>
      x.json().then(response => setTemplates(response.data.memes))
    )
  }, [])

  return (
    <div style={{ textAlign: "center" }}>
      {template && (
        <form
          onSubmit={async e => {
            e.preventDefault()
            // add logic to create meme from api
            const params = {
              template_id: "",
              text0: topText,
              text1: bottomText,
              username: "mhamadnazm",
              password: "mhamadnazm3@gmail.com",
            }
            const response = await fetch(
              "https://api.imgflip.com/caption_image",
              { body: JSON.stringify(params) }
            )
          }}
        >
          <Meme template={template} />
          <input
            placeholder="top text"
            value={topText}
            onChange={e => setTopText(e)}
          />
          <input
            placeholder="bottom text"
            value={bottomText}
            onChange={e => setBottomText(e)}
          />
          <button type="button">create meme</button>
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
