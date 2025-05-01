// src/pages/registration/Login.jsx
import { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import myContext from '../../context/data/myContext'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../fireabase/FirebaseConfig'
import { toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'

function Login() {
  const { loading, setLoading } = useContext(myContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(false)
  }, [setLoading])

  const login = async () => {
    if (!email || !password) {
      toast.error("Please fill all fields", { position: "top-right", autoClose: 2000, hideProgressBar: true, theme: "colored" })
      return
    }

    setLoading(true)
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      // persist exactly the Firebase User object
      localStorage.setItem('user', JSON.stringify(result.user))
      toast.success("Login successful", { position: "top-right", autoClose: 2000, hideProgressBar: true, theme: "colored" })
      navigate('/')
    } catch (error) {
      console.error(error)
      toast.error("Invalid email or password", { position: "top-right", autoClose: 2000, hideProgressBar: true, theme: "colored" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className="bg-gray-800 px-10 py-10 rounded-xl">
        <h1 className="text-center text-white text-xl mb-4 font-bold">Login</h1>

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white outline-none"
        />

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="bg-gray-600 mb-6 px-2 py-2 w-full rounded-lg text-white outline-none"
        />

        <button
          onClick={login}
          className="bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg"
        >
          Login
        </button>

        <p className="mt-4 text-center text-white">
          Don't have an account?{' '}
          <Link className="text-yellow-500 font-bold" to="/signup">
            Signup
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
