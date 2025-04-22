import React from 'react';


const Footer = () => {
  return (
    <>
    <section id = "footer">
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-column">
          <h2 className="logo">Newsium</h2>
          <p>Your daily dose of headlines and local news curated just for you.</p>
        </div>

        <div className="footer-column">
          <h3 class = "Quick">Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Your Area</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Categories</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 class = "Follow">Follow Us</h3>
          <div className="social-icons">
            <a href="#">🐦</a>
            <a href="#">📘</a>
            <a href="#">📸</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Newsium. All rights reserved.</p>
      </div>
    </footer>
    </section>
    </>
  );
};

export default Footer;
