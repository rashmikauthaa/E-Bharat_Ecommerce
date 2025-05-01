import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Filter from '../../components/filter/Filter';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/data/myContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';

function Allproducts() {
  const context = useContext(myContext);
  const { mode, product, searchkey, filterType, filterPrice } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // adjust as needed

  // Filtered products memoized
  const filteredProducts = useMemo(() => {
    return product
      .filter((obj) => obj.title.toLowerCase().includes(searchkey.toLowerCase()))
      .filter((obj) => obj.category.toLowerCase().includes(filterType.toLowerCase()))
      .filter((obj) => {
        if (!filterPrice) return true;
        try {
          const [minStr, maxStr] = filterPrice.split('-');
          const minRange = Number(minStr);
          const maxRange = Number(maxStr);
          const productPrice = Number(obj.price);
          if (isNaN(productPrice) || isNaN(minRange) || isNaN(maxRange)) return false;
          return productPrice >= minRange && productPrice <= maxRange;
        } catch {
          return false;
        }
      });
  }, [product, searchkey, filterType, filterPrice]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchkey, filterType, filterPrice]);

  // Get current page products
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIdx, endIdx);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageClick = (page) => setCurrentPage(page);

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success('Added to cart');
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleImageClick = (id) => {
    navigate(`/productinfo/${id}`);
  };

  return (
    <Layout>
      <Filter />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-8 md:py-16 mx-auto">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
            <h1
              className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
              style={{ color: mode === 'dark' ? 'white' : '' }}
            >
              Our Latest Collection
            </h1>
            <div className="h-1 w-20 bg-pink-600 rounded"></div>
          </div>

          <div className="flex flex-wrap -m-4">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((item, index) => {
                const { title, price, imageUrl, id } = item;
                return (
                  <div key={index} className="p-4 md:w-1/4 drop-shadow-lg">
                    <div
                      className={`h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden ${
                        mode === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white'
                      }`}
                      style={{ borderColor: mode === 'dark' ? 'rgb(55, 65, 81)' : '' }}
                    >
                      <div
                        className="flex justify-center cursor-pointer"
                        onClick={() => handleImageClick(id)}
                      >
                        <img
                          className="rounded-2xl w-full h-80 p-2 object-cover hover:scale-110 transition-transform duration-300 ease-in-out"
                          src={imageUrl}
                          alt={title}
                        />
                      </div>
                      <div
                        className="p-5 border-t-2"
                        style={{ borderTopColor: mode === 'dark' ? 'rgb(55, 65, 81)' : '' }}
                      >
                        <h2
                          className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                          style={{ color: mode === 'dark' ? 'rgb(156, 163, 175)' : '' }}
                        >
                          E-Bharat
                        </h2>
                        <h1
                          className={`title-font text-lg font-medium mb-3 ${
                            mode === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {title}
                        </h1>
                        <p
                          className={`leading-relaxed mb-3 ${
                            mode === 'dark' ? 'text-gray-300' : ''
                          }`}
                        >
                          ₹{price}
                        </p>
                        <div className="flex justify-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              addCart(item);
                            }}
                            className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm w-full py-2 dark:focus:ring-pink-800"
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="w-full text-center py-10">
                <p
                  className={`text-lg font-medium ${
                    mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  No products found matching your criteria.
                </p>
              </div>
            )}
          </div>

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
                  className={`px-3 py-1 mx-1 rounded ${
                    page === currentPage ? 'font-bold underline' : ''
                  }`}
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
      </section>
    </Layout>
  );
}

export default Allproducts;
