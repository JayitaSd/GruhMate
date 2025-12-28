import express from 'express';
import { scrapeAmazon, scrapeFlipkart } from '../controller/techScrapers.js';
import { getCacheKey, getFromCache, setCache } from '../utils/helpers.js';
import { getSharedBrowser } from '../utils/browserUtils.js';

const router = express.Router();

router.post('/search-tech', async (req, res) => {
  let { product } = req.body;
  if (!product) {
    return res.status(400).json({ error: 'Product is required' });
  }

  const cacheKey = `tech_${getCacheKey(product, '')}`;
  const cachedResult = getFromCache(cacheKey);
  if (cachedResult) {
    return res.json({
      ...cachedResult,
      cached: true,
      message: `${cachedResult.message} (from cache)`,
    });
  }

  console.log(`Searching tech products for "${product}"...`);
  const startTime = Date.now();

  try {
    await getSharedBrowser();

    const results = await Promise.allSettled([
      scrapeAmazon(product),
      scrapeFlipkart(product),
    ]);

    const amazonResults =
      results[0].status === 'fulfilled' ? results[0].value : [];
    const flipkartResults =
      results[1].status === 'fulfilled' ? results[1].value : [];

    if (results[0].status === 'rejected') {
      console.error(
        'Amazon scraper failed after retries:',
        results[0].reason.message
      );
    }
    if (results[1].status === 'rejected') {
      console.error(
        'Flipkart scraper failed after retries:',
        results[1].reason.message
      );
    }

    const responseData = {
      amazon: amazonResults,
      flipkart: flipkartResults,
      message: `Found ${amazonResults.length} Amazon products and ${flipkartResults.length} Flipkart products`,
    };

    if (amazonResults.length > 0 || flipkartResults.length > 0) {
      setCache(cacheKey, responseData);
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`Tech search completed in ${duration}s`);

    res.json(responseData);
  } catch (error) {
    console.error('Error in tech scraping:', error);
    res
      .status(500)
      .json({ error: 'Failed to scrape data', details: error.toString() });
  }
});

export default router;
