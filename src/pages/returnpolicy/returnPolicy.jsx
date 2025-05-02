import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';

export default function ReturnPolicy() {
  const { mode } = useContext(myContext);

  const bg = mode === 'dark' ? '#282c34' : '#ffffff';
  const text = mode === 'dark' ? '#ffffff' : '#333333';
  const accent = mode === 'dark' ? '#66b2ff' : '#3399cc';

  return (
    <Layout>
      <div
        className="min-h-screen py-12 px-6 lg:px-24"
        style={{ backgroundColor: bg, color: text }}
      >
        {/* Page Title */}
        <section className="text-center mb-12">
          <h1
            className="text-4xl font-extrabold mb-4"
            style={{ color: accent }}
          >
            Return &amp; Refund Policy
          </h1>
          <p className="max-w-2xl mx-auto text-lg">
            If you’re not completely satisfied with your purchase, you can return it within 14 days.
          </p>
        </section>

        {/* Eligibility */}
        <section className="mb-8">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ borderBottom: `2px solid ${accent}`, paddingBottom: '0.5rem' }}
          >
            1. Eligibility
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Items must be unused and in original packaging.</li>
            <li>No returns on perishables or “Final Sale” items.</li>
          </ul>
        </section>

        {/* Process */}
        <section className="mb-8">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ borderBottom: `2px solid ${accent}`, paddingBottom: '0.5rem' }}
          >
            2. How to Return
          </h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Go to <strong>Your Orders</strong> in your account.</li>
            <li>Select <strong>Request Return</strong> next to the item.</li>
            <li>Ship the item back using the provided instructions.</li>
          </ol>
        </section>

        {/* Refund */}
        <section className="mb-8">
          <h2
            className="text-2xl font-bold mb-2"
            style={{ borderBottom: `2px solid ${accent}`, paddingBottom: '0.5rem' }}
          >
            3. Refunds
          </h2>
          <p>
            Once we receive and inspect your return, refunds are processed to your original
            payment method within 5–7 business days.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2
            className="text-2xl font-bold mb-2"
            style={{ borderBottom: `2px solid ${accent}`, paddingBottom: '0.5rem' }}
          >
            4. Contact Us
          </h2>
          <p>
            Questions? Email{' '}
            <a
              href="mailto:support@e-bharat.com"
              style={{ color: accent }}
            >
              support@e-bharat.com
            </a>
            .
          </p>
        </section>
      </div>
    </Layout>
  );
}
