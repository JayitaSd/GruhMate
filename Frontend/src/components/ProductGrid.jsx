
import { ProductCard } from './ProductCard';
import './ProductGrid.css';



export function ProductGrid({ title, products, icon, accentColor, showPriceHistory = true }) {
  if (products.length === 0) {
    return (
      <div className="product-grid-section">
        <div className="section-header" style={{ borderColor: accentColor }}>
          <h2>
            <span className="section-icon">{icon}</span>
            {title}
          </h2>
          <span className="product-count">0 products</span>
        </div>
        <div className="no-products">
          <p>No products found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-grid-section">
      <div className="section-header" style={{ borderColor: accentColor }}>
        <h2>
          <span className="section-icon">{icon}</span>
          {title}
        </h2>
        <span className="product-count">{products.length} products</span>
      </div>
      <div className="product-grid">
        {products.map((product, index) => (
          <ProductCard key={`${product.store}-${index}`} product={product} showPriceHistory={showPriceHistory} />
        ))}
      </div>
    </div>
  );
}
