import { useState } from 'react';
import { getPriceHistoryUrl } from '../api';

import './ProductCard.css';



export function ProductCard({ product, showPriceHistory = true }) {
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handlePriceHistoryClick = async () => {
    if (!product.url) {
      alert('Product URL not available');
      return;
    }

    setIsLoadingHistory(true);

    try {
      const result = await getPriceHistoryUrl(product.url);
      
      if (result.success && result.priceHistoryUrl) {
        // Successfully got the price history URL
        window.open(result.priceHistoryUrl, '_blank');
      } else {
        // Fallback: copy URL and open main page
        await navigator.clipboard.writeText(product.url);
        window.open('https://pricehistory.app', '_blank');
        showNotification('Product URL copied! Paste it in Price History search');
      }
    } catch (err) {
      console.error('Error:', err);
      // Fallback: copy URL and open main page
      try {
        await navigator.clipboard.writeText(product.url);
        window.open('https://pricehistory.app', '_blank');
        showNotification('Product URL copied! Paste it in Price History search');
      } catch (copyErr) {
        alert('Could not open price history. Please try again.');
      }
    } finally {
      setIsLoadingHistory(false);
    }
  };

  return (
    <div className="product-card">
      {product.image && (
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
      )}
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{product.price}</p>
        {product.weight && <p className="product-weight">{product.weight}</p>}
        
        <div className="product-actions">
          {product.url && (
            <a 
              href={product.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              View Product
            </a>
          )}
          
          {/* {showPriceHistory && product.url && (
            <button
              onClick={handlePriceHistoryClick}
              className="btn btn-secondary"
              disabled={isLoadingHistory}
              title="Check price history on PriceHistory.app"
            >
              {isLoadingHistory ? '⏳ Loading...' : '📊 Price History'}
            </button>
          )} */}
        </div>
      </div>

      {/* Toast notification */}
      {showToast && (
        <div className="toast-notification">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
