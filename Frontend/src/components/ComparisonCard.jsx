import { useState } from 'react';
import './ComparisonCard.css';

export function ComparisonCard({ productName, products, mainImage }) {
  const [imageError, setImageError] = useState(false);

  const displayImage =
    mainImage || products.find((p) => p.image)?.image || '';

  const handleImageError = () => {
    setImageError(true);
  };

  const getStoreBadge = (store) => {
    const badges = {
      Zepto: { icon: '⚡', color: '#8a2be2', name: 'zepto' },
      JioMart: { icon: '', color: '#ffc700', name: 'JioMart' },
      DMart: { icon: '', color: '#00a650', name: 'dmart' },
    };
    return badges[store] || { icon: '🏪', color: '#666', name: 'store' };
  };

  return (
    <div className="comparison-card">
      <div className="comparison-header">
        <div className="product-image-wrapper">
          {displayImage && !imageError ? (
            <img
              src={displayImage}
              alt={productName}
              className="comparison-product-image"
              onError={handleImageError}
            />
          ) : (
            <div className="comparison-no-image">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </div>
          )}
        </div>

        <div className="product-header-info">
          <p className="product-brand">{productName.split(' ')[0]}</p>
          <h3 className="product-title">{productName}</h3>
        </div>
      </div>

      <div className="store-comparison-list">
        {products.map((product, index) => {
          const badge = getStoreBadge(product.store);
          return (
            <div
              key={index}
              className={`store-comparison-item ${badge.name}`}
            >
              <div className="store-info">
                <div
                  className="store-badge-large"
                  style={{ backgroundColor: badge.color }}
                >
                  {badge.icon ? (
                    <span className="badge-icon">{badge.icon}</span>
                  ) : (
                    <span className="badge-text">
                      {product.store.toLowerCase()}
                    </span>
                  )}
                </div>
                <div className="store-details">
                  <span className="store-quantity">
                    {product.weight || '1 unit'}
                  </span>
                  <span className="store-delivery">
                    ⏱️ {product.store === 'Zepto' ? '18 mins' : '8 mins'}
                  </span>
                </div>
              </div>
              <div className="store-price-info">
                <span className="store-price">{product.price}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
