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
  const [topText, setTopText] = useState("")
  const [bottomText, setBottomText] = useState("")
  const [meme, setMeme] = useState(null)

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then(x =>
      x.json().then(response => setTemplates(response.data.memes))
    )
  }, [])

  if (meme) {
    return (
      <div style={{ textAlign: "center" }}>
        <img src={meme} alt="custom meme" />
      </div>
    )
  }

  return (
    <div style={{ textAlign: "center" }}>
      {template && (
        <form
          onSubmit={async e => {
            e.preventDefault()
            // add logic to create meme from api
            const params = {
              template_id: template.id,
              text0: topText,
              text1: bottomText,
              username: "mhamadnazm",
              password: "Kakon+soft&2",
            }
            const response = await fetch(
              `https://api.imgflip.com/caption_image${objectToQueryParam(
                params
              )}`
            )
            const json = await response.json()
            setMeme(json.data?.url)
          }}
        >
          <Meme template={template} />
          <input
            placeholder="top text"
            value={topText}
            onChange={e => setTopText(e.target.value)}
          />
          <input
            placeholder="bottom text"
            value={bottomText}
            onChange={e => setBottomText(e.target.value)}
          />
          <button type="submit">create meme</button>
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
