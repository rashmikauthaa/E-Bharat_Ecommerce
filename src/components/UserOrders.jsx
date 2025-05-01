import React, { useContext, useEffect, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { fireDB } from '../fireabase/FirebaseConfig'
import myContext from '../context/data/myContext'
import Loader from './loader/Loader'
import { useNavigate } from 'react-router-dom'

export default function UserOrders() {
  const { mode } = useContext(myContext)
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5 // adjust as needed

  // Parse user only once
  const [user] = useState(() => {
    try {
      const raw = localStorage.getItem('user')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (!user || !user.uid) {
      navigate('/login')
      return
    }

    async function fetchOrders() {
      setLoading(true)
      setError(null)
      try {
        const orderCollection = collection(fireDB, 'order')
        const snapshot = await getDocs(orderCollection)
        const allOrders = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        const userOrders = allOrders.filter(order =>
          order.userid === user.uid || order.email === user.email
        )
        userOrders.sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            const aTime = a.createdAt.seconds ? a.createdAt.seconds : a.createdAt
            const bTime = b.createdAt.seconds ? b.createdAt.seconds : b.createdAt
            return bTime - aTime
          }
          return new Date(b.date || 0) - new Date(a.date || 0)
        })
        setOrders(userOrders)
        setCurrentPage(1) // reset page when orders load
      } catch (err) {
        setError(err.message || 'Failed to load orders')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [navigate, user])

  // Function to format price with commas (e.g., 1,000)
  const formatPrice = (price) => {
    if (!price) return "0"
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  if (loading) return <Loader />

  if (error) {
    return (
      <div className="text-center py-20" style={{ color: mode === 'dark' ? 'white' : '#333' }}>
        <h2 className="text-xl font-medium mb-4">Error loading orders</h2>
        <p className="mb-4 text-red-500">{error}</p>
        <div className="mt-4">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
          >
            Return to Home
          </button>
        </div>
      </div>
    )
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-20" style={{ color: mode === 'dark' ? 'white' : '#333' }}>
        <h2 className="text-xl font-medium mb-4">No orders found</h2>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
        >
          Start Shopping
        </button>
      </div>
    )
  }

  // Calculate pagination
  const totalPages = Math.ceil(orders.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const endIdx = startIdx + itemsPerPage
  const paginatedOrders = orders.slice(startIdx, endIdx)

  const handlePageClick = (page) => setCurrentPage(page)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: mode === 'dark' ? 'white' : '#333' }}>
        Your Orders
      </h1>

      {paginatedOrders.map((order) => (
        <div
          key={order.id}
          className="p-4 rounded-lg border shadow-sm"
          style={{ backgroundColor: mode === 'dark' ? '#1f2937' : '#fff' }}
        >
          {/* ...order details unchanged... */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 pb-3 border-b">
            <div>
              <p className="mb-1">Order Date: <span className="font-semibold">{order.date || "N/A"}</span></p>
              {/* <p className="mb-1">Order ID: <span className="font-semibold">{order.paymentId || '—'}</span></p> */}
              <p className="mb-1">Total Amount: <span className="font-semibold">₹{formatPrice(order.totalAmount || 0)}</span></p>
            </div>
            <div className="mt-2 md:mt-0">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}
                style={{
                  backgroundColor: mode === 'dark' ?
                    (order.status === 'Delivered' ? '#064e3b' :
                     order.status === 'Shipped' ? '#1e3a8a' :
                     '#78350f') : '',
                  color: mode === 'dark' ? '#fff' : ''
                }}
              >
                {order.status || 'Processing'}
              </span>
            </div>
          </div>

          {/* Shipping Details & Items unchanged */}
          {order.addressInfo && (
            <div className="mb-4">
              <h3 className="font-medium mb-2" style={{ color: mode === 'dark' ? '#e5e7eb' : '#333' }}>Shipping Details:</h3>
              <div className="pl-2 text-sm" style={{ color: mode === 'dark' ? '#d1d5db' : '#4b5563' }}>
                {/* <p>Address: {order.addressInfo.name}</p> */}
                <p>Address: {order.addressInfo.address}</p>
                <p>PIN: {order.addressInfo.pincode}, Phone: {order.addressInfo.phoneNumber}</p>
              </div>
            </div>
          )}

          {order.cartItems && order.cartItems.length > 0 && (
            <>
              <h3 className="font-medium mb-3" style={{ color: mode === 'dark' ? '#e5e7eb' : '#333' }}>Order Items:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.cartItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-3 rounded-lg"
                    style={{ backgroundColor: mode === 'dark' ? '#282c34' : '#f9fafb' }}
                  >
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.title || "Product"}
                        className="w-20 h-20 object-contain rounded-md"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold" style={{ color: mode === 'dark' ? 'white' : '#111827' }}>
                        {item.title || "Product"}
                      </h3>
                      <p className="text-sm" style={{ color: mode === 'dark' ? '#d1d5db' : '#6b7280' }}>
                        Qty: {item.quantity || 1}
                      </p>
                      <p className="text-sm font-medium" style={{ color: mode === 'dark' ? '#e5e7eb' : '#111827' }}>
                        ₹{formatPrice(item.price)} × {item.quantity || 1} = ₹{formatPrice(item.price * (item.quantity || 1))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ))}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageClick(currentPage - 1)}
            className="px-3 py-1 mx-1 rounded"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`px-3 py-1 mx-1 rounded ${page === currentPage ? 'font-bold underline' : ''}`}
            >
              {page}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageClick(currentPage + 1)}
            className="px-3 py-1 mx-1 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
