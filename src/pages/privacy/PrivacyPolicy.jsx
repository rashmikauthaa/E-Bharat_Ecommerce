import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';

export default function PrivacyPolicy() {
  const { mode } = useContext(myContext);
  const bg = mode === 'dark' ? '#282c34' : '#fff';
  const text = mode === 'dark' ? '#eee' : '#333';
  const accent = mode === 'dark' ? '#66b2ff' : '#3399cc';

  return (
    <Layout>
      <div className="min-h-screen py-12 px-6 lg:px-24" style={{ backgroundColor: bg, color: text }}>
        <h1 className="text-4xl font-bold text-center mb-6" style={{ color: accent }}>
          Privacy Policy
        </h1>
        <p className="mb-4">
          We collect only basic info (name, email) and usage data to process orders and improve
          your experience. Cookies are used for site functionality and analytics; you can disable them
          in your browser.
        </p>
        <p>
          For any privacy concerns or to review/update your data, email us at{' '}
          <a href="mailto:privacy@e-bharat.com" style={{ color: accent }}>privacy@e-bharat.com</a>.
        </p>
      </div>
    </Layout>
  );
}
