'use client'
import { useEffect, useState } from 'react'

export const dynamic = 'force-dynamic'

export default function ApiTest() {
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || process.env.API_ENDPOINT

  if (!API_ENDPOINT) {
    throw new Error('API_ENDPOINT environment variable is not set. Required: NEXT_PUBLIC_API_ENDPOINT or API_ENDPOINT')
  }

  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<string>('')

  const endpoint = `${API_ENDPOINT}/api/time`
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint, { cache: 'no-store' })
        const json = await response.json()
        setData(json)
        setError(null)
        setLastUpdate(new Date().toLocaleTimeString())
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch')
      }
    }

    // Fetch immediately
    fetchData()

    // Then fetch every second
    const interval = setInterval(fetchData, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      padding: '2rem',
      fontFamily: 'monospace',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1>API Test</h1>
      <p>Polling endpoint: {endpoint}</p>
      <p>Last update: {lastUpdate}</p>

      {error && (
        <div style={{
          padding: '1rem',
          background: '#fee',
          border: '1px solid #f00',
          borderRadius: '4px',
          marginTop: '1rem'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {data && (
        <pre style={{
          padding: '1rem',
          background: '#f5f5f5',
          color: '#000',
          borderRadius: '4px',
          overflow: 'auto',
          marginTop: '1rem'
        }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  )
}
