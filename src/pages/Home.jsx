import { useNavigate } from 'react-router-dom';
import './Compare.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-header">
        <h1 className="home-title">PriceWise</h1>
        <p className="home-subtitle">Compare prices instantly and save money</p>
      </div>

      <div className="category-selection">
        <h2>What are you looking for?</h2>
        
        <div className="category-cards">
          <button
            className="category-card grocery"
            onClick={() => navigate('/grocery')}
          >
            <div className="category-icon">🛒</div>
            <h3>Groceries</h3>
            <p>Compare prices from Zepto & Blinkit</p>
            <div className="store-badges">
              <span className="badge zepto">⚡ Zepto</span>
              <span className="badge blinkit">🛒 Blinkit</span>
            </div>
            <div className="card-footer">
              <span>Start Shopping →</span>
            </div>
          </button>

          <button
            className="category-card tech"
            onClick={() => navigate('/tech')}
          >
            <div className="category-icon">📱</div>
            <h3>Tech & Home</h3>
            <p>Compare prices from Amazon & Flipkart</p>
            <div className="store-badges">
              <span className="badge amazon">📦 Amazon</span>
              <span className="badge flipkart">🏪 Flipkart</span>
            </div>
            <div className="card-footer">
              <span>Start Shopping →</span>
            </div>
          </button>
        </div>
      </div>

      
    </div>
  );
}
