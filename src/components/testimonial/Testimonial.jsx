import React, { useContext } from 'react'
import myContext from '../../context/data/myContext'

function Testimonial() {
    const context = useContext(myContext);
    const { mode } = context;
    return (
        <div>
            <section className=''>
                <div className=" container mx-auto px-5 py-10">
                    <h1 className=' text-center text-3xl font-bold text-black' style={{ color: mode === 'dark' ? 'white' : '' }}>Testimonial</h1>
                    <h2 className=' text-center text-2xl font-semibold mb-10' style={{ color: mode === 'dark' ? 'white' : '' }}>What our <span className=' text-pink-500'>customers</span> are saying</h2>
                    <div className="flex flex-wrap -m-4">
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://cdn.pixabay.com/photo/2022/03/11/06/14/indian-man-7061278_1280.jpg" />
                                <p style={{ color: mode === 'dark' ? 'white' : '' }} className="leading-relaxed">I had a great shopping experience! The website is easy to navigate, and the product descriptions were spot on. The delivery was fast and the item was exactly as described. Highly recommend this platform!</p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 style={{ color: mode === 'dark' ? '#ff4162' : '' }} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">John Doe</h2>
                                <p style={{ color: mode === 'dark' ? 'white' : '' }} className="text-gray-500">Verified Buyer</p>
                            </div>
                        </div>

                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://plus.unsplash.com/premium_photo-1682089810582-f7b200217b67?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWFuJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D" />
                                <p  style={{color: mode === 'dark' ? 'white' : ''}} className="leading-relaxed">The product quality is top-notch! I bought a pair of headphones, and they exceeded my expectations. The sound quality is excellent, and the customer service was very helpful when I had questions about my order.</p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 style={{color: mode === 'dark' ? '#ff4162' : ''}} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Sarah Johnson</h2>
                                <p style={{color: mode === 'dark' ? 'white' : ''}} className="text-gray-500">Music Enthusiast</p>
                            </div>
                        </div>
                        <div className="lg:w-1/3 lg:mb-0 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://img.freepik.com/free-photo/portrait-smiley-travelling-woman_23-2148218441.jpg?semt=ais_hybrid&w=740" />
                                <p style={{color: mode === 'dark' ? 'white' : ''}} className="leading-relaxed">I bought a dress for an event, and it was the best purchase I’ve made in a long time. The fit was perfect, and the fabric felt amazing. The shipping was prompt and hassle-free. I’ll definitely shop here again!</p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 style={{color: mode === 'dark' ? '#ff4162' : ''}} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Emily Green</h2>
                                <p  style={{color: mode === 'dark' ? 'white' : ''}} className="text-gray-500">Fashion Blogger</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Testimonial
