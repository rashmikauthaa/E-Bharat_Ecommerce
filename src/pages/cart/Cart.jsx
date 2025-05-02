import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Added missing import
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import Modal from "../../components/modal/Modal";
import { toast } from "react-toastify";
import {
  deleteFromCart,
  deleteAllFromCart,
  clearCart,
  addToCart,
} from "../../redux/cartSlice"; // Added clearCart

const shipping = 100;

function Cart() {
  const context = useContext(myContext);
  const { mode } = context;
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Added missing navigate

  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart);

  // Group items by ID and calculate quantity
  const [groupedItems, setGroupedItems] = useState({});

  useEffect(() => {
    // Group cart items by id and calculate quantities
    const groupedData = cartItems.reduce((acc, item) => {
      if (!acc[item.id]) {
        acc[item.id] = {
          ...item,
          quantity: 1,
        };
      } else {
        acc[item.id].quantity += 1;
      }
      return acc;
    }, {});

    setGroupedItems(groupedData);
  }, [cartItems]);

  // Delete all instances of an item from cart
  const deleteCart = (id) => {
    dispatch(deleteAllFromCart({ id }));
    toast.success("Deleted from cart");
  };

  // Decrease quantity by removing a single instance
  const decreaseQuantity = (id) => {
    const quantity = groupedItems[id]?.quantity || 0;

    if (quantity <= 1) {
      toast.success("Item removed from cart");
    } else {
      toast.info("Quantity decreased");
    }

    dispatch(deleteFromCart({ id }));
  };

  // Calculate total amount
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    let total = 0;
    Object.values(groupedItems).forEach((item) => {
      total += parseInt(item.price) * item.quantity;
    });
    setTotalAmount(total);
  }, [groupedItems]);

  const grandTotal = shipping + totalAmount;

  // Form state
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Checkout function
  const buyNow = async () => {
    // 1) Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.uid) {
      toast.error("You need to log in or sign up first", {
        position: "top-center",
        autoClose: 1500,
      });
      navigate("/login");
      return;
    }

    if (name === "" || address === "" || pincode === "" || phoneNumber === "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    // const phoneRegex = /^[0-9]{10}$/;
    // if (!phoneRegex.test(phone)) {
    //   toast.error("Please enter a valid 10-digit phone number.");
    //   return;
    // }

    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    // Payment integration
    var options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      key_secret: import.meta.env.VITE_RAZORPAY_KEY_SECRET,
      amount: parseInt(grandTotal * 100),
      currency: "INR",
      order_receipt: "order_rcptid_" + name,
      name: "E-Bharat",
      description: "for testing purpose",
      handler: async function (response) {
        console.log(response);
        toast.success("Payment Successful");

        const paymentId = response.razorpay_payment_id;
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.uid;

        if (!userId) {
          console.error("User ID not found");
          toast.error("Could not complete order: User not logged in");
          return;
        }

        const orderInfo = {
          cartItems: Object.values(groupedItems),
          addressInfo,
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          email: user?.email || "",
          userid: userId,
          paymentId,
          totalAmount: grandTotal,
          status: "Processing",
          createdAt: new Date(),
        };

        try {
          // Import Firebase functions properly
          const { collection, addDoc } = await import("firebase/firestore");
          const { fireDB } = await import("../../fireabase/FirebaseConfig");

          // Save order to Firestore
          const orderRef = collection(fireDB, "order");
          const docRef = await addDoc(orderRef, orderInfo);
          console.log("Order saved with ID:", docRef.id);

          // Clear cart after successful order
          dispatch(clearCart());

          // Navigate to orders page
          setTimeout(() => {
            navigate("/order");
          }, 1500);
        } catch (error) {
          console.error("Error saving order:", error);
          toast.error("Order placed but there was an error saving it");
        }
      },

      theme: {
        color: "#3399cc",
      },
    };

    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay);
  };

  const darkModeStyle = {
    backgroundColor: mode === "dark" ? "#282c34" : "",
    color: mode === "dark" ? "white" : "",
  };

  const darkModeCardStyle = {
    backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
    color: mode === "dark" ? "white" : "",
  };

  return (
    <Layout>
      <div
        className="min-h-screen bg-gray-100 pt-5 pb-20"
        style={darkModeStyle}
      >
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>

        {Object.keys(groupedItems).length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold">Your cart is empty</h2>
            <p
              className="mt-2 text-gray-500"
              style={{ color: mode === "dark" ? "#A0AEC0" : "" }}
            >
              Add some products to your cart and come back!
            </p>
          </div>
        ) : (
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {Object.values(groupedItems).map((item) => {
                const { id, title, price, description, imageUrl, quantity } =
                  item;
                return (
                  <div
                    key={id}
                    className="justify-between mb-6 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start"
                    style={darkModeCardStyle}
                  >
                    <img
                      src={imageUrl}
                      alt="product-image"
                      className="w-full rounded-lg sm:w-40 object-cover"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2
                          className="text-lg font-bold text-gray-900"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          {title}
                        </h2>
                        <h2
                          className="text-sm text-gray-700"
                          style={{ color: mode === "dark" ? "#A0AEC0" : "" }}
                        >
                          {description}
                        </h2>
                        <p
                          className="mt-1 text-md font-semibold text-gray-700"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          ₹{price}
                        </p>
                      </div>
                      <div className="mt-4 flex flex-col justify-between items-end sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <button
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-pink-500 hover:text-white"
                            onClick={() => decreaseQuantity(id)}
                          >
                            -
                          </button>
                          <span
                            className="h-8 w-8 border flex items-center justify-center bg-white text-center text-xs outline-none"
                            style={{ color: mode === "dark" ? "black" : "" }}
                          >
                            {quantity}
                          </span>
                          <button
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-pink-500 hover:text-white"
                            onClick={() => dispatch(addToCart(item))}
                          >
                            +
                          </button>
                        </div>
                        <div
                          onClick={() => deleteCart(id)}
                          className="cursor-pointer mt-4"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-red-500 hover:text-red-700"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total & Checkout Section */}
            <div
              className="mt-6 h-fit rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3"
              style={darkModeCardStyle}
            >
              <div className="mb-2 flex justify-between">
                <p
                  className="text-gray-700"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Subtotal
                </p>
                <p
                  className="text-gray-700"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  ₹{totalAmount}
                </p>
              </div>
              <div className="flex justify-between">
                <p
                  className="text-gray-700"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Shipping
                </p>
                <p
                  className="text-gray-700"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  ₹{shipping}
                </p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between mb-3">
                <p
                  className="text-lg font-bold"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Total
                </p>
                <div>
                  <p
                    className="mb-1 text-lg font-bold"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    ₹{grandTotal}
                  </p>
                </div>
              </div>
              <Modal
                name={name}
                address={address}
                pincode={pincode}
                phoneNumber={phoneNumber}
                setName={setName}
                setAddress={setAddress}
                setPincode={setPincode}
                setPhoneNumber={setPhoneNumber}
                buyNow={buyNow}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Cart;
