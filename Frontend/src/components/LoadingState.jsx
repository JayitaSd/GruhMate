import { useState, useEffect } from 'react';

import './LoadingState.css';


export function LoadingState({ category = 'grocery' }) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const storeConfig = {
    grocery: {
      message: 'Searching Zepto and JioMart for the best deals',
      stores: [
        { name: 'Zepto', icon: '⚡', class: 'zepto' },
        { name: 'JioMart', icon: '🛒', class: 'JioMart' }
      ]
    },
    tech: {
      message: 'Searching Amazon and Flipkart for the best deals',
      stores: [
        { name: 'Amazon', icon: '📦', class: 'amazon' },
        { name: 'Flipkart', icon: '🏪', class: 'flipkart' }
      ]
    }
  };

  const config = storeConfig[category];

  return (
    <div className="loading-state">
      <div className="loading-content">
        <div className="loading-animation">
          <div className="cart-icon">🔍</div>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <h3>Comparing prices across stores...</h3>
        <p>{config.message}</p>
        <div className="elapsed-time">
          {elapsedTime > 0 && <span>Elapsed: {elapsedTime}s</span>}
          {elapsedTime < 5 && <span className="estimate">Usually takes 15-30 seconds</span>}
        </div>
        <div className="loading-stores">
          {config.stores.map((store) => (
            <div key={store.name} className={`store-loading ${store.class}`}>
              <span className="store-icon">{store.icon}</span>
              <span>{store.name}</span>
              <div className="mini-spinner"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
