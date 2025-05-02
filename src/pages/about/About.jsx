import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';

export default function AboutUs() {
  const { mode } = useContext(myContext);

  const sectionStyle = {
    backgroundColor: mode === 'dark' ? '#282c34' : '#ffffff',
    color: mode === 'dark' ? '#ffffff' : '#333333',
  };

  const teamMembers = [
    { name: 'Autha Rashmika', role: 'Founder & CEO', img: '/team/autha.jpeg' },
    { name: 'Aman Raj', role: 'Head of Operations', img: '/team/aman.jpeg' },
    { name: 'Deepti Behwal', role: 'Lead Developer', img: '/team/deepti.jpeg' },
    { name: 'Asit Vats', role: 'Marketing Manager', img: '/team/asit.jpeg' },
    { name: 'Pragati Naruka', role: 'Customer Relations Lead', img: '/team/pragati.jpeg' },
  ];

  const [featured, ...others] = teamMembers;

  return (
    <Layout>
      <div className="min-h-screen py-12 px-6 lg:px-24" style={sectionStyle}>
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-extrabold mb-4">About Us</h1>
          <p className="max-w-2xl mx-auto text-lg">
            E-Bharat is your one-stop online marketplace, dedicated to bringing quality products 
            and seamless shopping experiences right to your doorstep.
          </p>
        </section>

        {/* Featured Founder */}
        <section className="flex justify-center mb-12">
          <div className="text-center p-8 rounded-3xl shadow-2xl w-full max-w-xl"
               style={{ backgroundColor: mode === 'dark' ? '#383c44' : '#f9f9f9' }}>
            <img src={featured.img} alt={featured.name}
                 className="mx-auto mb-6 h-48 w-48 rounded-full object-cover border-4"
                 style={{ borderColor: mode === 'dark' ? '#66b2ff' : '#3399cc' }} />
            <h2 className="text-3xl font-bold mb-2">{featured.name}</h2>
            <p className="text-xl opacity-80">{featured.role}</p>
          </div>
        </section>

        {/* Rest of Team */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-8">Meet the Team</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((member) => (
              <div key={member.name}
                   className="text-center p-4 rounded-2xl shadow-lg"
                   style={{ backgroundColor: mode === 'dark' ? '#383c44' : '#f9f9f9' }}>
                <img src={member.img} alt={member.name}
                     className="mx-auto mb-4 h-32 w-32 rounded-full object-cover" />
                <h3 className="text-lg font-semibold text-primary mb-1">{member.name}</h3>
                <p className="text-sm opacity-70">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
