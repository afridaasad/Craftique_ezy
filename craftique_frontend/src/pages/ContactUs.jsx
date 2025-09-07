import React from 'react';

const ContactUs = () => {
  return (
    <div className="contact-page">
      <style>{`
        .contact-page {
          font-family: 'Segoe UI', sans-serif;
          background-color: #fffaf4;
          padding: 40px;
          color: #4b2d2d;
        }

        .contact-container {
          max-width: 600px;
          margin: 0 auto;
        }

        .contact-title {
          font-size: 32px;
          text-align: center;
          margin-bottom: 20px;
          color: #5b392f;
        }

        form {
          display: flex;
          flex-direction: column;
        }

        input, textarea {
          padding: 12px;
          margin-bottom: 16px;
          border-radius: 8px;
          border: 1px solid #c7b9aa;
          font-size: 16px;
        }

        button {
          background-color: #7b4f37;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
        }

        button:hover {
          background-color: #623b28;
        }

        @media (max-width: 600px) {
          input, textarea {
            font-size: 14px;
          }

          .contact-title {
            font-size: 24px;
          }
        }
      `}</style>

      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea rows="5" placeholder="Your Message" required />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
