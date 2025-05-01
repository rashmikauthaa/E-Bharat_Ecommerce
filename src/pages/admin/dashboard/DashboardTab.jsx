import React, { useContext, useEffect, useState, useMemo } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import myContext from "../../../context/data/myContext";
import Layout from "../../../components/layout/Layout";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUser, FaCartPlus } from "react-icons/fa";
import { AiFillShopping, AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function DashboardTab() {
  const { mode, product, edithandle, deleteProduct, order, user } =
    useContext(myContext);

  // Pagination state for products
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(product.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return product.slice(start, start + itemsPerPage);
  }, [product, currentPage]);

  const add = () => (window.location.href = "/addproduct");

  const darkText = { color: mode === "dark" ? "white" : "" };
  const darkBg = { backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "" };

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultIndex={0}>
        <TabList className="flex justify-center space-x-4 mb-8">
          <Tab>
            <button className="flex items-center space-x-2 px-5 py-3 border-b-2 border-transparent text-purple-600 text-lg hover:text-purple-700 hover:border-purple-600 transition-all duration-300 hover:scale-105">
              <MdOutlineProductionQuantityLimits className="text-2xl" />
              <span>Products</span>
            </button>
          </Tab>
          <Tab>
            <button className="flex items-center space-x-2 px-5 py-3 border-b-2 border-transparent text-pink-600 text-lg hover:text-pink-700 hover:border-pink-600 transition-all duration-300 hover:scale-105">
              <AiFillShopping className="text-2xl" />
              <span>Orders</span>
            </button>
          </Tab>
          <Tab>
            <button className="flex items-center space-x-2 px-5 py-3 border-b-2 border-transparent text-green-600 text-lg hover:text-green-700 hover:border-green-600 transition-all duration-300 hover:scale-105">
              <FaUser className="text-2xl" />
              <span>Users</span>
            </button>
          </Tab>
        </TabList>

        {/* Products Tab */}
        <TabPanel>
          <div className="px-4 md:px-0 mb-16">
            <h1
              className="text-center mb-5 text-3xl font-semibold underline"
              style={darkText}
            >
              Product Details
            </h1>

            <div className="flex justify-end mb-4">
              <button
                onClick={add}
                className="text-white bg-pink-600 hover:bg-pink-700 px-5 py-2 rounded-lg"
                style={
                  mode === "dark"
                    ? { backgroundColor: "rgb(46 49 55)", color: "white" }
                    : {}
                }
              >
                <div className="flex gap-2 items-center">
                  Add Product <FaCartPlus size={20} />
                </div>
              </button>
            </div>

            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead
                  className="text-xs uppercase bg-gray-200"
                  style={{ ...darkBg, ...darkText }}
                >
                  <tr>
                    <th className="px-6 py-3">S.No</th>
                    <th className="px-6 py-3">Image</th>
                    <th className="px-6 py-3">Title</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.map((item, idx) => {
                    const serial = (currentPage - 1) * itemsPerPage + idx + 1;
                    return (
                      <tr
                        key={item.id}
                        className="bg-gray-50 border-b dark:border-gray-700"
                        style={darkBg}
                      >
                        <td className="px-6 py-4" style={darkText}>
                          {serial}.
                        </td>
                        <td className="px-6 py-4">
                          <img
                            src={item.imageUrl}
                            alt=""
                            className="w-16 rounded"
                          />
                        </td>
                        <td className="px-6 py-4" style={darkText}>
                          {item.title}
                        </td>
                        <td className="px-6 py-4" style={darkText}>
                          ₹{item.price}
                        </td>
                        <td className="px-6 py-4" style={darkText}>
                          {item.category}
                        </td>
                        <td className="px-6 py-4" style={darkText}>
                          {item.date}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => deleteProduct(item)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <AiFillDelete />
                            </button>
                            <Link
                              to="/updateproduct"
                              onClick={() => edithandle(item)}
                            >
                              <AiFillPlusCircle className="text-blue-600 hover:text-blue-800" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-pink-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </TabPanel>

        {/* Orders Tab */}
        <TabPanel>
          <div className="relative overflow-x-auto mb-16">
            <h1
              className="text-center mb-5 text-3xl font-semibold underline"
              style={darkText}
            >
              Order Details
            </h1>
            {order.map((allorder, index) => (
              <table
                key={allorder.paymentId}
                className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-6"
              >
                <thead
                  className="text-xs uppercase bg-gray-200"
                  style={{ ...darkBg, ...darkText }}
                >
                  <tr>
                    <th className="px-6 py-3">Payment Id</th>
                    <th className="px-6 py-3">Image</th>
                    <th className="px-6 py-3">Title</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Address</th>
                    <th className="px-6 py-3">Pincode</th>
                    <th className="px-6 py-3">Phone Number</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {allorder.cartItems.map((item, idx) => (
                    <tr
                      key={idx}
                      className="bg-gray-50 border-b dark:border-gray-700"
                      style={darkBg}
                    >
                      <td className="px-6 py-4" style={darkText}>
                        {allorder.paymentId}
                      </td>
                      <td className="px-6 py-4">
                        <img
                          src={item.imageUrl}
                          alt=""
                          className="w-16 rounded"
                        />
                      </td>
                      <td className="px-6 py-4" style={darkText}>
                        {item.title}
                      </td>
                      <td className="px-6 py-4" style={darkText}>
                        ₹{item.price}
                      </td>
                      <td className="px-6 py-4" style={darkText}>
                        {item.category}
                      </td>
                      <td className="px-6 py-4" style={darkText}>
                        {allorder.addressInfo.name}
                      </td>
                      <td className="px-6 py-4" style={darkText}>
                        {allorder.addressInfo.address}
                      </td>
                      <td className="px-6 py-4" style={darkText}>
                        {allorder.addressInfo.pincode}
                      </td>
                      <td className="px-6 py-4" style={darkText}>
                        {allorder.addressInfo.phoneNumber}
                      </td>
                      <td className="px-6 py-4" style={darkText}>
                        {allorder.email}
                      </td>
                      <td className="px-6 py-4" style={darkText}>
                        {allorder.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ))}
          </div>
        </TabPanel>

        {/* Users Tab */}
        <TabPanel>
          <div className="relative overflow-x-auto mb-10">
            <h1
              className="text-center mb-5 text-3xl font-semibold underline"
              style={darkText}
            >
              User Details
            </h1>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead
                className="text-xs uppercase bg-gray-200"
                style={{ ...darkBg, ...darkText }}
              >
                <tr>
                  <th className="px-6 py-3">S.No</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Uid</th>
                </tr>
              </thead>
              <tbody>
                {user.map((u, idx) => (
                  <tr
                    key={u.uid}
                    className="bg-gray-50 border-b dark:border-gray-700"
                    style={darkBg}
                  >
                    <td className="px-6 py-4" style={darkText}>
                      {idx + 1}.
                    </td>
                    <td className="px-6 py-4" style={darkText}>
                      {u.name}
                    </td>
                    <td className="px-6 py-4" style={darkText}>
                      {u.email}
                    </td>
                    <td className="px-6 py-4" style={darkText}>
                      {u.uid}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
