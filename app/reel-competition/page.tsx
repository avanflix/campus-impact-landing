'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loadStripe } from '@stripe/js';

const REEL_COMPETITION_PRICE = 399;
const GROUP_SIZE = 4;

interface Student {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  college: string;
  rollNumber: string;
}

const initialStudent: Student = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  college: '',
  rollNumber: '',
};

export default function ReelCompetitionRegistration() {
  const router = useRouter();
  const [groupName, setGroupName] = useState('');
  const [reelTitle, setReelTitle] = useState('');
  const [reelDescription, setReelDescription] = useState('');
  const [reelCategory, setReelCategory] = useState('Comedy');
  const [reelDuration, setReelDuration] = useState('30');
  const [students, setStudents] = useState<Student[]>(Array(GROUP_SIZE).fill(null).map(() => ({ ...initialStudent })));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGroupChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'groupName':
        setGroupName(value);
        break;
      case 'reelTitle':
        setReelTitle(value);
        break;
      case 'reelDescription':
        setReelDescription(value);
        break;
      case 'reelCategory':
        setReelCategory(value);
        break;
      case 'reelDuration':
        setReelDuration(value);
        break;
    }
  };

  const handleStudentChange = (
    index: number,
    field: keyof Student,
    value: string
  ) => {
    const newStudents = [...students];
    newStudents[index] = { ...newStudents[index], [field]: value };
    setStudents(newStudents);
  };

  const validateForm = () => {
    if (!groupName.trim()) {
      setError('Please provide group name');
      return false;
    }
    if (!reelTitle.trim()) {
      setError('Please provide reel title');
      return false;
    }
    if (!reelCategory) {
      setError('Please select reel category');
      return false;
    }
    if (!reelDuration || parseInt(reelDuration) < 15 || parseInt(reelDuration) > 60) {
      setError('Reel duration must be between 15-60 seconds');
      return false;
    }

    for (let i = 0; i < GROUP_SIZE; i++) {
      const student = students[i];
      if (
        !student.firstName.trim() ||
        !student.lastName.trim() ||
        !student.email.trim() ||
        !student.phone.trim() ||
        !student.college.trim() ||
        !student.rollNumber.trim()
      ) {
        setError(`Please fill all fields for Student ${i + 1}`);
        return false;
      }
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(student.email)) {
        setError(`Invalid email for Student ${i + 1}`);
        return false;
      }
    }

    return true;
  };

  const handleRegister = async () => {
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/reel-competition/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupName,
          reelTitle,
          reelDescription,
          reelCategory,
          reelDuration: parseInt(reelDuration),
          students,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Registration failed');
        return;
      }

      // Store registration ID and proceed to payment
      localStorage.setItem('reelRegistrationId', data.registration.id);
      localStorage.setItem('reelClientSecret', data.registration.clientSecret);

      // Redirect to payment page
      router.push('/reel-competition-payment');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Comedy', 'Drama', 'Action', 'Educational', 'Creative', 'Other'];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <Link href="/dashboard" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold', marginBottom: '20px', display: 'inline-block' }}>
          ← Back to Dashboard
        </Link>

        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h1 style={{ marginBottom: '30px', fontSize: '28px', fontWeight: 'bold' }}>
            Reel Competition Registration
          </h1>

          <p style={{ color: '#666', marginBottom: '30px', fontSize: '16px' }}>
            Register your group of 4 students for the Reel Competition. Registration fee: ₹{REEL_COMPETITION_PRICE}
          </p>

          {error && (
            <div style={{ backgroundColor: '#fee', color: '#c00', padding: '12px', borderRadius: '4px', marginBottom: '20px' }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
              Group & Reel Details
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Group Name *
                </label>
                <input
                  type="text"
                  name="groupName"
                  value={groupName}
                  onChange={handleGroupChange}
                  placeholder="Enter your group name"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Reel Title *
                </label>
                <input
                  type="text"
                  name="reelTitle"
                  value={reelTitle}
                  onChange={handleGroupChange}
                  placeholder="Enter reel title"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                Reel Description
              </label>
              <textarea
                name="reelDescription"
                value={reelDescription}
                onChange={handleGroupChange}
                placeholder="Describe your reel concept (optional)"
                maxLength={500}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  minHeight: '100px',
                  fontFamily: 'Arial, sans-serif',
                }}
              />
              <p style={{ fontSize: '12px', color: '#666', margin: '5px 0 0 0' }}>
                {reelDescription.length}/500 characters
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Reel Category *
                </label>
                <select
                  name="reelCategory"
                  value={reelCategory}
                  onChange={handleGroupChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Reel Duration (seconds) *
                </label>
                <input
                  type="number"
                  name="reelDuration"
                  value={reelDuration}
                  onChange={handleGroupChange}
                  min="15"
                  max="60"
                  placeholder="15-60"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
              Group Members (4 Students)
            </h2>

            {students.map((student, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#f9f9f9',
                  padding: '20px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  border: '1px solid #eee',
                }}
              >
                <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', fontWeight: 'bold' }}>
                  Student {index + 1}
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={student.firstName}
                      onChange={(e) => handleStudentChange(index, 'firstName', e.target.value)}
                      placeholder="First name"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={student.lastName}
                      onChange={(e) => handleStudentChange(index, 'lastName', e.target.value)}
                      placeholder="Last name"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      value={student.email}
                      onChange={(e) => handleStudentChange(index, 'email', e.target.value)}
                      placeholder="Email"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={student.phone}
                      onChange={(e) => handleStudentChange(index, 'phone', e.target.value)}
                      placeholder="Phone"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>
                      College *
                    </label>
                    <input
                      type="text"
                      value={student.college}
                      onChange={(e) => handleStudentChange(index, 'college', e.target.value)}
                      placeholder="College"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>
                      Roll Number *
                    </label>
                    <input
                      type="text"
                      value={student.rollNumber}
                      onChange={(e) => handleStudentChange(index, 'rollNumber', e.target.value)}
                      placeholder="Roll number"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: '#f0f7ff', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', fontWeight: 'bold' }}>
              Registration Summary
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Group Size:</span>
              <span>{GROUP_SIZE} students</span>
            </div>
            <div style={{ borderTop: '1px solid #ddd', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}>
              <span>Total Amount:</span>
              <span>₹{REEL_COMPETITION_PRICE}</span>
            </div>
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: loading ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </div>
      </div>
    </div>
  );
}
