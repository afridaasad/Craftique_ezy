import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleCTA = () => {
    if (user) {
      if (user.role === "buyer") navigate("/buyer/dashboard");
      else if (user.role === "artisan") navigate("/artisan/dashboard");
      else if (user.role === "admin") navigate("/admin/dashboard");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const hero = document.querySelector('.hero');
    const cta = document.querySelector('.cta-button');
    hero.style.opacity = 0;
    cta.style.opacity = 0;
    setTimeout(() => {
      hero.style.transition = 'opacity 1s ease-in';
      hero.style.opacity = 1;
      cta.style.transition = 'opacity 1s ease-in 0.5s';
      cta.style.opacity = 1;
    }, 100);
  }, []);

  return (
    <div className="home-page">
      <Navbar />

      <style>{`
        .home-page {
          font-family: 'Segoe UI', sans-serif;
          background-color: #fdf8f2;
          color: #4b2e2e;
        }

        .hero {
          background-color: #c2a285;
          padding: 60px 20px;
          text-align: center;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          margin: 20px;
          opacity: 0;
        }

        .hero h1 {
          font-size: 42px;
          margin-bottom: 20px;
        }

        .hero p {
          font-size: 18px;
          max-width: 600px;
          margin: 0 auto 20px auto;
        }

        .cta-button {
          background-color: #4b2e2e;
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          transition: background 0.3s ease;
          opacity: 0;
        }

        .cta-button:hover {
          background-color: #3a221f;
        }

        .section {
          padding: 40px 20px;
          text-align: center;
        }

        .grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          margin-top: 20px;
        }

        .card {
          background-color: #fff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          width: 250px;
        }

        .footer {
          background-color: #4b2e2e;
          color: white;
          text-align: center;
          padding: 20px;
          font-size: 14px;
        }

        .category-button {
          background-color: #e0b589;
          border: none;
          margin: 10px;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
        }

        @media (max-width: 600px) {
          .hero h1 {
            font-size: 28px;
          }

          .cta-button {
            width: 100%;
            font-size: 14px;
          }

          .grid {
            flex-direction: column;
            align-items: center;
          }
        }
          .join-us {
  background-color: #f4e8db;
  border-radius: 12px;
  padding: 40px 20px;
  margin: 40px 20px;
}

.join-us h2 {
  font-size: 26px;
  color: #4b2e2e;
  margin-bottom: 15px;
}

.join-us p {
  font-size: 16px;
  color: #5c3d2e;
  max-width: 600px;
  margin: 0 auto 20px auto;
}

.join-button {
  background-color: #4b2e2e;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.join-button:hover {
  background-color: #3a221f;
}

      `}</style>

      {/* Hero */}
      <div className="hero">
        <h1>Welcome to Craftique</h1>
        <p>Discover unique handmade creations crafted by skilled artisans across India. Support local talent and shop sustainably.</p>
        <button className="cta-button" onClick={handleCTA}>Shop Now</button>
      </div>

      {/* Trending Products */}
      <div className="section">
        <h2>Trending Products</h2>
        <div className="grid">
          <div className="card">🌿 Handmade Vase</div>
          <div className="card">💍 Beaded Necklace</div>
          <div className="card">🕯️ Soy Candle Set</div>
        </div>
      </div>

      {/* Explore by Category */}
      <div className="section">
        <h2>Explore by Category</h2>
        <div>
          <button className="category-button">Jewelry</button>
          <button className="category-button">Home Decor</button>
          <button className="category-button">Clothing</button>
          <button className="category-button">Paintings</button>
        </div>
      </div>

      {/* Testimonials */}
      <div className="section">
        <h2>What Customers Say</h2>
        <div className="grid">
          <div className="card">"Beautifully crafted items. Fast delivery!" – Anjali</div>
          <div className="card">"Great support and amazing quality." – Raj</div>
          <div className="card">"Perfect for gifting. Will buy again." – Neha</div>
        </div>
      </div>
      {/* Join Us Section */}
<div className="section join-us">
  <h2>Who Can Join Craftique?</h2>
  <p>
    Are you an artisan ready to showcase your handmade creations? Or a buyer looking for something truly unique?  
    <br />Join our growing community today!
  </p>
  <button className="join-button" onClick={() => navigate('/register')}>
    Join Us
  </button>
</div>


      {/* Footer */}
      <div className="footer">
        © {new Date().getFullYear()} Craftique. All rights reserved. | Developed by Afreeda Asad | Contact: craftique.help@gmail.com 
      </div>
    </div>
  );
};

export default Home;
