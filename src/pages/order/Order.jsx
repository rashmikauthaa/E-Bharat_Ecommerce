import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import UserOrders from '../../components/UserOrders'
import myContext from '../../context/data/myContext'

/**
 * Order page component that displays the user's order history
 * using the UserOrders component
 */
function Order() {
  const { mode } = useContext(myContext);

  return (
    <Layout>
      <div 
        className="min-h-screen pt-10 px-4 md:px-8 pb-20"
        style={{ backgroundColor: mode === 'dark' ? '#282c34' : '#f9fafb' }}
      >
        <UserOrders />
      </div>
    </Layout>
  )
}

export default Order