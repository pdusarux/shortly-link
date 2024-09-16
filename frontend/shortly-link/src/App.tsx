import React, { useState } from "react";
import axios from 'axios'
import './App.css';


const App: React.FC = () => {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('/shorten', { url });
      const { short_url } = response.data;
      setShortUrl(short_url)
    } catch (error) {
      console.error(error)
    }
  }

  const handleOpenUrl = () => {
    if (shortUrl) {
      window.open(`http://127.0.0.1:8000/${shortUrl}`, '_blank');
    }
  }

  const handleCopyUrl = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(`http://127.0.0.1:8000/${shortUrl}`)
    }
  }

  return (
    <div className="container">
      <h1>Shorten URL</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="Enter URL to shorten"
        />
        <button type="submit">Shorten</button>
      </form>
      {shortUrl && (
        <div className="short-url-container">
          <p>
            Shortened URL: <a href={`http://127.0.0.1:8000/${shortUrl}`} target="_blank" rel="noopener noreferrer">http://127.0.0.1:8000/{shortUrl}</a>
          </p>
          <button onClick={handleOpenUrl}>Open URL</button>
          <button onClick={handleCopyUrl}>Copy URL</button>
        </div>
      )}
    </div>
  )

}

export default App
