import { useState, useEffect } from 'react'

function Loading() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="loading" id="loading" style={{ opacity: isLoading ? 1 : 0 }}>
      <div className="spinner"></div>
    </div>
  )
}

export default Loading
