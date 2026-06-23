import React from 'react'
// import './globals.css'

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
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
