import React, { useContext, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';

function ProductCard() {
  const context = useContext(myContext);
  const { mode, product, searchkey, filterType, filterPrice } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate();

  // Memoize the filtered products for performance
  const filteredProducts = useMemo(() => {
    return product.filter((obj) => {
      const price = parseFloat(obj.price); // Ensure price is a number

      const priceCondition = (() => {
        if (filterPrice === '0-100') {
          return price >= 0 && price <= 100;
        } else if (filterPrice === '101-1000') {
          return price >= 101 && price <= 1000;
        } else if (filterPrice === '1001-5000') {
          return price >= 1001 && price <= 5000;
        } else if (filterPrice === '5001-Infinity') {
          return price >= 5001;
        }
        return true; // No price filter selected
      })();

      return (
        obj.title.toLowerCase().includes(searchkey.toLowerCase()) &&
        obj.category.toLowerCase().includes(filterType.toLowerCase()) &&
        priceCondition
      );
    }).slice(0, 8);
  }, [product, searchkey, filterType, filterPrice]);

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success('Added to cart');
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleImageClick = (id) => {
    navigate(`/productinfo/${id}`);
  };

  const textColor = mode === 'dark' ? 'white' : '';

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1 className={`sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900 ${textColor}`}>
            Our Latest Collection
          </h1>
          <div className="h-1 w-20 bg-pink-600 rounded"></div>
        </div>

        <div className="flex flex-wrap -m-4">
          {filteredProducts.map((item, index) => {
            const { title, price, imageUrl, id } = item;
            return (
              <div key={index} className="p-4 md:w-1/4 drop-shadow-lg">
                <div
                  className={`h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden ${
                    mode === 'dark' ? 'bg-gray-800' : ''
                  }`}
                >
                  {/* Product Image */}
                  <div onClick={() => handleImageClick(id)} className="flex justify-center cursor-pointer">
                    <img
                      className="rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110 duration-300 ease-in-out"
                      src={imageUrl}
                      alt="product"
                    />
                  </div>
                  <div className="p-5 border-t-2">
                    <h2 className={`tracking-widest text-xs title-font font-medium text-gray-400 mb-1 ${textColor}`}>E-Bharat</h2>
                    <h1 className={`title-font text-lg font-medium text-gray-900 mb-3 ${textColor}`}>{title}</h1>
                    <p className={`leading-relaxed mb-3 ${textColor}`}>₹{price}</p>
                    <div className="flex justify-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent the image click event
                          addCart(item);
                        }}
                        className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProductCard;