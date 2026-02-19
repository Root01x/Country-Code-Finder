import { useState, useRef } from 'react'

const API_URL = (page) => `https://jsonmock.hackerrank.com/api/countries?page=${page}`
const TOTAL_PAGES = 25

function NewtonsCradle({ visible }) {
  return (
    <div className="containerLoader">
      <div className={`newtons-cradle${visible ? '' : ' disabled'}`}>
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
      </div>
    </div>
  )
}

export default function App() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const abortRef = useRef(null)

  const handleSearch = async () => {
    if (!query.trim()) return

    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setResult(null)
    setLoading(true)

    const search = query.trim().toUpperCase()

    try {
      for (let page = 1; page <= TOTAL_PAGES; page++) {
        const response = await fetch(API_URL(page), { signal: controller.signal })
        const { data } = await response.json()
        const found = data.find(
          ({ alpha2Code, name }) =>
            alpha2Code === search || name.toUpperCase() === search
        )

        if (found) {
          setResult({ country: found.name, code: found.alpha2Code })
          setLoading(false)
          return
        }
      }
      setResult({ notFound: true })
    } catch (err) {
      if (err.name !== 'AbortError') setResult({ notFound: true })
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="card">
      <img src="/img/robot.webp" alt="Robot" />
      <div className="card-body">
        <h5 className="card-title">Country Code Finder</h5>
        <p className="card-text">Type a country code or name in the box below</p>
        <input
          className="codeCountry"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn" onClick={handleSearch} disabled={loading}>
          Go!
        </button>

        <div className="result">
          {result && !result.notFound && (
            <div>
              <span>Country:</span> {result.country} <br />
              <span>Code:</span> {result.code}
            </div>
          )}
          {result?.notFound && 'Country not found'}
        </div>

        <NewtonsCradle visible={loading} />
      </div>
    </div>
  )
}
