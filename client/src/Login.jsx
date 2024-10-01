/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Login() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  useEffect(() => {
    const access_token = params.get('access_token')
    const refresh_token = params.get('refresh_token')
    const new_user = params.get('new_user')
    const verify = params.get('verify')
    console.log(new_user, verify)
    // ở đây mình chỉ test UI cho trường hợp login
    // Trường hợp register thì bạn nào biết Front-end React có thể tự làm thêm UI cho nó nhé
    // Dựa vào new_user, verify để biết là user mới hay user cũ và đã verify email hay chưa
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
    navigate('/')
  }, [params, navigate])
  return <div>Login</div>
}
