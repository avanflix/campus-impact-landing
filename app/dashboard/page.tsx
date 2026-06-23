'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const [workshopRegistrations, setWorkshopRegistrations] = useState<any[]>([]);
  const [reelRegistrations, setReelRegistrations] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch workshop registrations
        const workshopRes = await fetch('/api/workshop/register');
        if (workshopRes.ok) {
          const workshopData = await workshopRes.json();
          setWorkshopRegistrations(workshopData.registrations || []);
        }

        // Fetch reel competition registrations
        const reelRes = await fetch('/api/reel-competition/register');
        if (reelRes.ok) {
          const reelData = await reelRes.json();
          setReelRegistrations(reelData.registrations || []);
        }

        // Get user info from localStorage or session
        // This is simplified - in production you'd want to fetch from an API
        const userInfo = localStorage.getItem('user');
        if (userInfo) {
          setUser(JSON.parse(userInfo));
        }
      } catch (err: any) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      localStorage.removeItem('user');
      router.push('/sign-in');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <nav style={{ backgroundColor: '#333', color: 'white', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>Campus Impact Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#c00',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Logout
        </button>
      </nav>

      <div style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* User Info Card */}
          {user && (
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <h2 style={{ margin: '0 0 15px 0', fontSize: '20px' }}>
                Welcome, {user.firstName} {user.lastName}!
              </h2>
              <p style={{ margin: '5px 0', color: '#666' }}>Email: {user.email}</p>
              <p style={{ margin: '5px 0', color: '#666' }}>Phone: {user.phone}</p>
              <p style={{ margin: '5px 0', color: '#666' }}>College: {user.college}</p>
            </div>
          )}

          {error && (
            <div style={{ backgroundColor: '#fee', color: '#c00', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
              {error}
            </div>
          )}

          {/* Quick Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            <Link href="/workshop-registration" style={{ textDecoration: 'none' }}>
              <div style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
              >
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Register Workshop</h3>
                <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>Select workshops to attend</p>
              </div>
            </Link>

            <Link href="/reel-competition" style={{ textDecoration: 'none' }}>
              <div style={{
                backgroundColor: '#28a745',
                color: 'white',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
              >
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Reel Competition</h3>
                <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>Register your group</p>
              </div>
            </Link>
          </div>

          {/* Workshop Registrations */}
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '22px', fontWeight: 'bold' }}>Workshop Registrations</h2>

            {workshopRegistrations.length === 0 ? (
              <p style={{ color: '#666' }}>You haven't registered for any workshops yet.</p>
            ) : (
              <div style={{ display: 'grid', gap: '15px' }}>
                {workshopRegistrations.map((reg: any) => (
                  <div key={reg._id} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
                          {reg.workshops.map((w: any) => w.name).join(', ')}
                        </h3>
                        <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '14px' }}>
                          {reg.totalWorkshops} workshop(s)
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>
                          ₹{reg.totalAmount}
                        </p>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          backgroundColor: reg.paymentStatus === 'completed' ? '#d4edda' : '#fff3cd',
                          color: reg.paymentStatus === 'completed' ? '#155724' : '#856404',
                        }}>
                          {reg.paymentStatus.charAt(0).toUpperCase() + reg.paymentStatus.slice(1)}
                        </span>
                      </div>
                    </div>
                    <p style={{ margin: '0', fontSize: '12px', color: '#999' }}>
                      Registered on: {new Date(reg.registeredAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reel Competition Registrations */}
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '22px', fontWeight: 'bold' }}>Reel Competition Registrations</h2>

            {reelRegistrations.length === 0 ? (
              <p style={{ color: '#666' }}>You haven't registered for any reel competitions yet.</p>
            ) : (
              <div style={{ display: 'grid', gap: '15px' }}>
                {reelRegistrations.map((reg: any) => (
                  <div key={reg._id} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
                          {reg.reelTitle}
                        </h3>
                        <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '14px' }}>
                          Group: {reg.groupName} • {reg.students.length} members
                        </p>
                        <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '13px' }}>
                          Category: {reg.reelCategory}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>
                          ₹{reg.totalAmount}
                        </p>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          backgroundColor: reg.paymentStatus === 'completed' ? '#d4edda' : '#fff3cd',
                          color: reg.paymentStatus === 'completed' ? '#155724' : '#856404',
                        }}>
                          {reg.paymentStatus.charAt(0).toUpperCase() + reg.paymentStatus.slice(1)}
                        </span>
                      </div>
                    </div>
                    <p style={{ margin: '0', fontSize: '12px', color: '#999' }}>
                      Registered on: {new Date(reg.registeredAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
