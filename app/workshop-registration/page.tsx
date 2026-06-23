'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';

const WORKSHOPS = ['Direction', 'Acting', 'Photography', 'Videography', 'Modeling'];
const PRICE_PER_WORKSHOP = 199;

export default function WorkshopRegistration() {
  const router = useRouter();
  const [selectedWorkshops, setSelectedWorkshops] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

  const handleWorkshopToggle = (workshop: string) => {
    setSelectedWorkshops((prev) => {
      if (prev.includes(workshop)) {
        return prev.filter((w) => w !== workshop);
      } else {
        return [...prev, workshop];
      }
    });
  };

  const totalAmount = selectedWorkshops.length * PRICE_PER_WORKSHOP;

  const handleRegister = async () => {
    if (selectedWorkshops.length === 0) {
      setError('Please select at least one workshop');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create registration and get payment intent
      const response = await fetch('/api/workshop/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ workshops: selectedWorkshops }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Registration failed');
        return;
      }

      // Initialize Stripe and redirect to payment
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

      if (!stripe) {
        setError('Failed to initialize payment system');
        return;
      }

      setProcessingPayment(true);

      // Redirect to checkout
      const result = await stripe.redirectToCheckout({
        sessionId: data.registration.id, // This needs to be a Stripe session ID
        // Or use payment intent for a custom payment flow
      });

      if (result.error) {
        setError(result.error.message || 'Payment redirect failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <Link href="/dashboard" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold', marginBottom: '20px', display: 'inline-block' }}>
          ← Back to Dashboard
        </Link>

        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h1 style={{ marginBottom: '30px', fontSize: '28px', fontWeight: 'bold' }}>
            Register for Workshops
          </h1>

          <p style={{ color: '#666', marginBottom: '30px', fontSize: '16px' }}>
            Select one or more workshops to register. Each workshop costs ₹{PRICE_PER_WORKSHOP}.
          </p>

          {error && (
            <div style={{ backgroundColor: '#fee', color: '#c00', padding: '12px', borderRadius: '4px', marginBottom: '20px' }}>
              {error}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            {WORKSHOPS.map((workshop) => (
              <div
                key={workshop}
                onClick={() => handleWorkshopToggle(workshop)}
                style={{
                  padding: '20px',
                  border: selectedWorkshops.includes(workshop) ? '2px solid #007bff' : '1px solid #ddd',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: selectedWorkshops.includes(workshop) ? '#f0f7ff' : 'white',
                  transition: 'all 0.3s ease',
                  userSelect: 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    checked={selectedWorkshops.includes(workshop)}
                    onChange={() => {}}
                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                  />
                  <div>
                    <h3 style={{ margin: '0', fontSize: '16px', fontWeight: 'bold' }}>{workshop}</h3>
                    <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '14px' }}>₹{PRICE_PER_WORKSHOP}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', fontWeight: 'bold' }}>
              Order Summary
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Selected Workshops: {selectedWorkshops.length}</span>
              <span>₹{selectedWorkshops.length * PRICE_PER_WORKSHOP}</span>
            </div>
            <div style={{ borderTop: '1px solid #ddd', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}>
              <span>Total Amount:</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          <button
            onClick={handleRegister}
            disabled={loading || processingPayment || selectedWorkshops.length === 0}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor:
                loading || processingPayment || selectedWorkshops.length === 0 ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading || processingPayment || selectedWorkshops.length === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Processing...' : processingPayment ? 'Redirecting to Payment...' : 'Proceed to Payment'}
          </button>
        </div>
      </div>
    </div>
  );
}
