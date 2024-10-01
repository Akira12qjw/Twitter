import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './router'
import { useEffect } from 'react'
import axios from 'axios'

function App() {
  useEffect(() => {
    const controller = new AbortController()
    for (let i = 0; i < 20; i++) {
      axios
        .get('/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          },
          baseURL: import.meta.env.VITE_API_URL,
          signal: controller.signal
        })
        .then((res) => {
          localStorage.setItem('profile', JSON.stringify(res.data.result))
        })
    }
    return () => {
      controller.abort()
    }
  }, [])
  return <RouterProvider router={router} />
}

export default App
