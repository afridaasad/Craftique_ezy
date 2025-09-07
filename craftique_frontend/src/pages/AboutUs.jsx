import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <Navbar />

      <style>{`
        .about-page {
          font-family: 'Segoe UI', sans-serif;
          background-color: #fdf8f2;
          color: #4b2e2e;
          padding-bottom: 60px;
        }

        .hero-banner {
          background-color: #c2a285;
          text-align: center;
          padding: 60px 20px;
          border-radius: 20px;
          margin: 20px;
        }

        .hero-banner h1 {
          font-size: 42px;
          margin-bottom: 15px;
        }

        .hero-banner p {
          font-size: 18px;
          max-width: 700px;
          margin: 0 auto;
        }

        .section {
          padding: 40px 20px;
          text-align: center;
        }

        .section h2 {
          font-size: 28px;
          margin-bottom: 20px;
        }

        .section p {
          font-size: 16px;
          max-width: 800px;
          margin: 0 auto 30px auto;
        }

        .grid {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }

        .card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          width: 280px;
          text-align: left;
        }

        .card h3 {
          font-size: 20px;
          margin-bottom: 10px;
          color: #4b2e2e;
        }

        .card p {
          font-size: 14px;
          color: #5b3f3f;
        }

        .footer {
          background-color: #4b2e2e;
          color: white;
          text-align: center;
          padding: 20px;
          font-size: 14px;
          margin-top: 40px;
        }

        @media (max-width: 600px) {
          .hero-banner h1 {
            font-size: 30px;
          }

          .section h2 {
            font-size: 22px;
          }

          .card {
            width: 100%;
          }
        }
      `}</style>

      {/* Hero */}
      <div className="hero-banner">
        <h1>About Craftique</h1>
        <p>
          Craftique is India’s premier online platform for handmade goods — connecting talented artisans with buyers who appreciate authenticity, tradition, and sustainable craftsmanship.
        </p>
      </div>

      {/* Our Story */}
      <div className="section">
        <h2>Our Story</h2>
        <p>
          Born out of love for Indian crafts and concern for struggling artisans, Craftique was founded to create a space where handmade products are celebrated, not commodified. We believe in empowering small creators and offering buyers something truly personal and sustainable.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="section">
        <h2>Our Mission & Vision</h2>
        <div className="grid">
          <div className="card">
            <h3>🌱 Empower Local Artisans</h3>
            <p>
              Provide artisans across India with a digital storefront to reach customers and grow their businesses independently.
            </p>
          </div>
          <div className="card">
            <h3>🌍 Promote Sustainable Choices</h3>
            <p>
              Encourage mindful shopping by offering eco-friendly, handmade alternatives to mass-produced goods.
            </p>
          </div>
          <div className="card">
            <h3>🤝 Build Community</h3>
            <p>
              Foster trust and transparency between creators and customers by giving each product a story and every user a voice.
            </p>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="section">
        <h2>How Craftique Works</h2>
        <div className="grid">
          <div className="card">
            <h3>🎨 Artisans List Products</h3>
            <p>
              Registered artisans can showcase their handmade goods with detailed photos, descriptions, and prices.
            </p>
          </div>
          <div className="card">
            <h3>🛍️ Buyers Discover & Shop</h3>
            <p>
              Buyers browse by category, search personalized recommendations, and add items to cart or buy instantly.
            </p>
          </div>
          <div className="card">
            <h3>📦 Orders & Tracking</h3>
            <p>
              Orders are tracked in real time with estimated delivery dates and artisan-managed fulfillment.
            </p>
          </div>
          <div className="card">
            <h3>📬 Support & Reviews</h3>
            <p>
              Our built-in support and review systems ensure honest feedback and continuous improvement.
            </p>
          </div>
        </div>
      </div>

      {/* Who Can Join */}
      <div className="section">
        <h2>Who Can Join?</h2>
        <p>
          Whether you're a passionate artisan with handmade goods or a conscious buyer looking for something special — Craftique is for you.
        </p>
        <div className="grid">
          <div className="card">
            <h3>🧑‍🎨 Artisans</h3>
            <p>
              Join to create your online store, reach wider audiences, and grow your handmade brand with zero tech hassle.
            </p>
          </div>
          <div className="card">
            <h3>🛒 Buyers</h3>
            <p>
              Shop meaningful products, support independent creators, and enjoy an ethical alternative to mass-market shopping.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="section">
        <h2>What People Say</h2>
        <div className="grid">
          <div className="card">
            <p>"Craftique gave me the platform I needed. Orders started coming in within a week!"</p>
            <p><strong>– Meera (Artisan)</strong></p>
          </div>
          <div className="card">
            <p>"Love the eco-friendly packaging and personal touch. Will definitely return!"</p>
            <p><strong>– Kavita (Buyer)</strong></p>
          </div>
          <div className="card">
            <p>"Finally a site that feels real, honest, and handmade. Beautiful work everywhere."</p>
            <p><strong>– Arjun (Buyer)</strong></p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        © {new Date().getFullYear()} Craftique. All rights reserved. | Developed by Afreeda Asad | Contact: craftique.help@gmail.com
      </div>
    </div>
  );
};

export default AboutUs;
