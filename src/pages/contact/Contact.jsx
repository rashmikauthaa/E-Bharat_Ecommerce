import React, { useContext, useState } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import { toast } from 'react-toastify';

export default function ContactUs() {
  const { mode } = useContext(myContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sectionStyle = {
    backgroundColor: mode === 'dark' ? '#282c34' : '#ffffff',
    color: mode === 'dark' ? '#ffffff' : '#333333',
  };

  const inputBg = mode === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900';
  const btnBg = mode === 'dark' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    // TODO: Integrate with email service or API
    toast.success('Thank you for contacting us! We will get back to you soon.');
    setName(''); setEmail(''); setMessage('');
  };

  return (
    <Layout>
      <div style={sectionStyle} className="min-h-screen py-12 px-6 lg:px-24">
        <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="flex justify-center">
            <img
              src="group.jpeg"
              alt="Contact Us Illustration"
              className="w-full max-w-md sm:max-w-lg object-cover rounded-lg shadow-lg"
            />
          </div>
          {/* Form Side */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${inputBg}`}
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-medium">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${inputBg}`}
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-medium">Message</label>
              <textarea
                id="message"
                placeholder="How can we help you?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${inputBg}`}
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className={`px-8 py-3 rounded-lg font-semibold text-white transition ${btnBg}`}
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
