// src/pages/registration/Signup.jsx
import { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import myContext from '../../context/data/myContext'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, fireDB } from '../../fireabase/FirebaseConfig'
import { toast } from 'react-toastify'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import Loader from '../../components/loader/Loader'

function Signup() {
  const { loading, setLoading } = useContext(myContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(false)
  }, [setLoading])

  const signup = async () => {
    if (!name || !email || !password) {
      toast.error("All fields are required", { position: "top-right", autoClose: 2000, hideProgressBar: true, theme: "colored" })
      return
    }

    setLoading(true)
    try {
      const users = await createUserWithEmailAndPassword(auth, email, password)

      // Save extra profile info in Firestore
      const userDoc = {
        name,
        uid: users.user.uid,
        email: users.user.email,
        time: Timestamp.now()
      }
      await addDoc(collection(fireDB, "users"), userDoc)

      // Persist the Firebase User object for routing/nav
      localStorage.setItem('user', JSON.stringify(users.user))

      toast.success("Signup successful", { position: "top-right", autoClose: 2000, hideProgressBar: true, theme: "colored" })
      navigate('/')
    } catch (error) {
      console.error(error)
      toast.error(error.message || "Signup failed", { position: "top-right", autoClose: 2000, hideProgressBar: true, theme: "colored" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className="bg-gray-800 px-10 py-10 rounded-xl">
        <h1 className="text-center text-white text-xl mb-4 font-bold">Signup</h1>

        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          className="bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white outline-none"
        />

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
          onClick={signup}
          className="bg-red-500 w-full text-white font-bold px-2 py-2 rounded-lg"
        >
          Signup
        </button>

        <p className="mt-4 text-center text-white">
          Already have an account?{' '}
          <Link className="text-yellow-500 font-bold" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
