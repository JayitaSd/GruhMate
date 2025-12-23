
import './CategorySelector.css';



export function CategorySelector({ selectedCategory, onCategoryChange }) {
  return (
    <div className="category-selector">
      <h2 className="category-title">What are you looking for?</h2>
      <div className="category-cards">
        <button
          className={`category-card ${selectedCategory === 'grocery' ? 'active' : ''}`}
          onClick={() => onCategoryChange('grocery')}
        >
          <div className="category-icon">🛒</div>
          <h3>Groceries</h3>
          <p>Compare prices from Zepto & Blinkit</p>
          <div className="store-logos">
            <span className="store-tag zepto">⚡ Zepto</span>
            <span className="store-tag blinkit">🛒 Blinkit</span>
          </div>
        </button>

        <button
          className={`category-card ${selectedCategory === 'tech' ? 'active' : ''}`}
          onClick={() => onCategoryChange('tech')}
        >
          <div className="category-icon">📱</div>
          <h3>Tech & Home</h3>
          <p>Compare prices from Amazon & Flipkart</p>
          <div className="store-logos">
            <span className="store-tag amazon">📦 Amazon</span>
            <span className="store-tag flipkart">🏪 Flipkart</span>
          </div>
        </button>
      </div>
    </div>
  );
}
