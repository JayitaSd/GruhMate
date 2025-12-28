import { useState } from 'react';
import { getPriceHistoryUrl } from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductCard.css';

const normalizeAmazonUrl = (url) => {
  try {
    const decoded = decodeURIComponent(url);
    const match = decoded.match(/\/dp\/([A-Z0-9]{10})/);
    if (!match) return url;
    return `https://www.amazon.in/dp/${match[1]}`;
  } catch {
    return url;
  }
};

export function ProductCard({ product, showPriceHistory = true }) {
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const handlePriceHistoryClick = async () => {
    if (!product.url) return;

    setIsLoadingHistory(true);
    const cleanUrl = normalizeAmazonUrl(product.url);

    try {
      const result = await getPriceHistoryUrl(cleanUrl);

      if (result.success && result.priceHistoryUrl) {
        window.open(result.priceHistoryUrl, '_blank');
      } else {
        await navigator.clipboard.writeText(cleanUrl);
        toast.success('Product URL copied! Redirecting…', {
          autoClose: 1800,
          onClose: () => window.open('https://pricehistory.app', '_blank')
        });
      }
    } catch {
      await navigator.clipboard.writeText(cleanUrl);
      toast.success('Product URL copied! Redirecting…', {
        autoClose: 1800,
        onClose: () => window.open('https://pricehistory.app', '_blank')
        });
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
              href={normalizeAmazonUrl(product.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              View Product
            </a>
          )}

          {showPriceHistory && product.url && (
            <button
              onClick={handlePriceHistoryClick}
              className="btn btn-secondary"
              disabled={isLoadingHistory}
            >
              {isLoadingHistory ? '⏳ Loading...' : '📊 Price History'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
