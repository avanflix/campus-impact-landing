import React from 'react'

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <style>{`
        .contact-section {
          padding: 80px 20px;
          background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
          margin-bottom: 0;
        }

        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .contact-header h1 {
          font-family: 'DM Serif Display', serif;
          font-size: 48px;
          margin: 0 0 20px 0;
          color: #1a1a1a;
        }

        .contact-header p {
          font-family: 'DM Sans', sans-serif;
          font-size: 18px;
          color: #666;
          margin: 0;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }

        .contact-info {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
        }

        .contact-info h2 {
          font-family: 'DM Serif Display', serif;
          font-size: 22px;
          margin: 0 0 10px 0;
          color: #1a1a1a;
        }

        .contact-detail {
          margin-bottom: 30px;
          padding-bottom: 30px;
          border-bottom: 1px solid #eee;
        }

        .contact-detail:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .contact-detail h3 {
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 16px;
          margin: 0 0 10px 0;
          color: #1a1a1a;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .contact-detail p {
          font-family: 'DM Sans', sans-serif;
          margin: 0;
          color: #666;
          font-size: 16px;
          line-height: 1.6;
        }

        .contact-detail a {
          color: #1a1430;;
          text-decoration: none;
          font-weight: 500;
        }

        .contact-detail a:hover {
          text-decoration: underline;
        }

        .contact-form {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
        }

        .contact-form h2 {
          font-family: 'DM Serif Display', serif;
          font-size: 32px;
          margin: 0 0 30px 0;
          color: #1a1a1a;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          margin-bottom: 8px;
          color: #1a1a1a;
          font-size: 14px;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          transition: border-color 0.3s ease;
          box-sizing: border-box;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #1a1430;;
          box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .form-group button {
          background: #1a1430;;
          color: white;
          border: none;
          padding: 14px 40px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 14px;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          width: 100%;
        }

        .form-group button:hover {
          background: #a8d600;
        }

        .location-grid {
          display: grid;
          gap: 20px;
          margin-top: 20px;
        }

        .location-item {
          padding: 20px;
          background: #f9f9f9;
          border-radius: 8px;
          border-left: 4px solid #0066cc;
        }

        .location-item h4 {
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          margin: 0 0 8px 0;
          font-size: 14px;
          color: #1a1a1a;
        }

        .location-item p {
          font-family: 'DM Sans', sans-serif;
          margin: 0;
          color: #666;
          font-size: 14px;
          line-height: 1.5;
        }

        .social-links {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }

        .social-links a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #f0f0f0;
          color: #0066cc;
          text-decoration: none;
          transition: all 0.3s ease;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          font-size: 18px;
        }

        .social-links a:hover {
          background: #c8ff00;
          color: white;
        }

        @media (max-width: 768px) {
          .contact-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .contact-header h1 {
            font-size: 36px;
          }

          .contact-info h2,
          .contact-form h2 {
            font-size: 24px;
          }

          .contact-section {
            padding: 60px 20px;
          }
        }
      `}</style>

      <div className="contact-container">
        <div className="contact-header">
          <h1>Get in Touch</h1>
          <p>Have questions about Campus Impact? We'd love to hear from you. Reach out to us anytime.</p>
        </div>

        <div className="contact-content">
          {/* Contact Information */}
          <div className="contact-info">
            <h2>Contact Details</h2>

            <div className="contact-detail">
              <h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a1430"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginRight: "8px", verticalAlign: "middle" }}
                >
                  <path d="M4 4h16v16H4z" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
                Email
              </h3>
              <p>
                <a href="mailto:hello@campusimpact.in">hello@campusimpact.in</a><br />
                {/* <a href="mailto:support@campusimpact.in">support@campusimpact.in</a> */}
              </p>
            </div>

            <div className="contact-detail">
              <h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a1430"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginRight: "8px", verticalAlign: "middle" }}
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.35 1.77.68 2.59a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.49-1.2a2 2 0 0 1 2.11-.45c.82.33 1.69.56 2.59.68A2 2 0 0 1 22 16.92z" />
                </svg>
                Phone
              </h3>
              <p>
                <a href="tel:+919876543210">+91 9182744257</a><br />
                {/* <a href="tel:+919876543211">+91 9876543211</a> */}
              </p>
            </div>

            <div className="contact-detail">
              <h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a1430"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginRight: "8px", verticalAlign: "middle" }}
                >
                  <path d="M3 21h18" />
                  <path d="M5 21V7l7-4 7 4v14" />
                  <path d="M9 9h.01" />
                  <path d="M15 9h.01" />
                  <path d="M9 13h.01" />
                  <path d="M15 13h.01" />
                </svg>
                Office
              </h3>
              <p>
                178, Row House<br />
                Chitrapuri Colony<br />
                Hyderabad, India<br />
                500104
              </p>
            </div>

            <div className="contact-detail">
              <h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a1430"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginRight: "8px", verticalAlign: "middle" }}
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Business Hours
              </h3>
              <p>
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: Closed
              </p>
            </div>

            <div className="contact-detail">
              <h3>
                <svg
                  xmlns="https://www.instagram.com/campusimpact__official?utm_source=qr&igsh=cjUxMHRpMWwzNXgy"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a1430"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginRight: "8px", verticalAlign: "middle" }}
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
                  <line x1="15.4" y1="6.5" x2="8.6" y2="10.5" />
                </svg>
                Follow Us
              </h3>
              <div className="social-links">
                {/* Instagram */}
                <a
                  href="https://instagram.com/campusimpact"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1a1430"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>

                {/* X (Twitter) */}
                <a
                  href="https://www.facebook.com/Campusimpactofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="X"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1a1430"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com/@campusimpact?si=lSILHYq6rmGfpyxX"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="YouTube"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1a1430"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 1.96C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"></path>
                    <polygon points="10 15 15 12 10 9 10 15"></polygon>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="contact-form"
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   alert('Thank you for reaching out! We will get back to you soon.');
          //   e.currentTarget.reset();
          // }}
          >
            <h2>Send Message</h2>

            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="your.email@college.edu"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+91 9876543210"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                placeholder="How can we help?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="Tell us more about your inquiry..."
              ></textarea>
            </div>

            <div className="form-group">
              <button type="submit">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
