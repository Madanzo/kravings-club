/**
 * React Hooks for Blaze POS Integration
 * Provides easy access to Blaze API data throughout components
 */

import { useState, useEffect, useCallback } from 'react';
import { blazeAPI } from '@/lib/blaze';

/**
 * Hook for managing products from Blaze
 */
export function useBlazeProducts(category = null) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      let blazeProducts;
      if (category) {
        blazeProducts = await blazeAPI.getProductsByCategory(category);
      } else {
        blazeProducts = await blazeAPI.getProducts();
      }
      
      // Map Blaze products to our format
      const mappedProducts = blazeProducts.data?.map(product => 
        blazeAPI.mapBlazeProduct(product)
      ) || [];
      
      setProducts(mappedProducts);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err.message);
      console.error('🚨 Failed to fetch Blaze products:', err);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchProducts();
    
    // Set up auto-refresh every 15 minutes
    const interval = setInterval(fetchProducts, 15 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    lastUpdate,
    refresh: fetchProducts
  };
}

/**
 * Hook for managing categories from Blaze
 */
export function useBlazeCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        setError(null);
        
        const blazeCategories = await blazeAPI.getCategories();
        setCategories(blazeCategories.data || []);
      } catch (err) {
        setError(err.message);
        console.error('🚨 Failed to fetch Blaze categories:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

/**
 * Hook for managing individual product details
 */
export function useBlazeProduct(productId) {
  const [product, setProduct] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkInventory = useCallback(async () => {
    if (!productId) return;
    
    try {
      const inventoryData = await blazeAPI.getInventory(productId);
      setInventory(inventoryData);
    } catch (err) {
      console.error('⚠️ Failed to check inventory:', err);
    }
  }, [productId]);

  useEffect(() => {
    async function fetchProduct() {
      if (!productId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // For now, get product from products list
        // In a real implementation, there might be a specific endpoint
        const products = await blazeAPI.getProducts();
        const foundProduct = products.data?.find(p => p.id === productId);
        
        if (foundProduct) {
          setProduct(blazeAPI.mapBlazeProduct(foundProduct));
          await checkInventory();
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError(err.message);
        console.error('🚨 Failed to fetch Blaze product:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId, checkInventory]);

  return {
    product,
    inventory,
    loading,
    error,
    checkInventory
  };
}

/**
 * Hook for managing store information
 */
export function useBlazeStore() {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStore() {
      try {
        setLoading(true);
        setError(null);
        
        const storeData = await blazeAPI.getStoreInfo();
        setStore(storeData.data);
      } catch (err) {
        setError(err.message);
        console.error('🚨 Failed to fetch Blaze store info:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStore();
  }, []);

  return { store, loading, error };
}

/**
 * Hook for creating orders in Blaze
 */
export function useBlazeOrders() {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);

  const createOrder = useCallback(async (orderData) => {
    try {
      setCreating(true);
      setError(null);
      
      const order = await blazeAPI.createOrder(orderData);
      return order;
    } catch (err) {
      setError(err.message);
      console.error('🚨 Failed to create Blaze order:', err);
      throw err;
    } finally {
      setCreating(false);
    }
  }, []);

  return {
    createOrder,
    creating,
    error
  };
}

/**
 * Hook for searching products
 */
export function useBlazeSearch() {
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    try {
      setSearching(true);
      setError(null);
      
      const searchResults = await blazeAPI.searchProducts(query);
      const mappedResults = searchResults.data?.map(product => 
        blazeAPI.mapBlazeProduct(product)
      ) || [];
      
      setResults(mappedResults);
    } catch (err) {
      setError(err.message);
      console.error('🚨 Failed to search Blaze products:', err);
    } finally {
      setSearching(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return {
    results,
    searching,
    error,
    search,
    clearSearch
  };
}

/**
 * Hook for monitoring Blaze connection health
 */
export function useBlazeHealth() {
  const [status, setStatus] = useState('checking');
  const [message, setMessage] = useState('');
  const [lastCheck, setLastCheck] = useState(null);

  const checkHealth = useCallback(async () => {
    try {
      const health = await blazeAPI.healthCheck();
      setStatus(health.status);
      setMessage(health.message);
      setLastCheck(new Date());
    } catch (err) {
      setStatus('error');
      setMessage(err.message);
      setLastCheck(new Date());
    }
  }, []);

  useEffect(() => {
    checkHealth();
    
    // Check health every 5 minutes
    const interval = setInterval(checkHealth, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [checkHealth]);

  return {
    status, // 'connected', 'error', 'checking'
    message,
    lastCheck,
    checkHealth
  };
}

/**
 * Hook for inventory management
 */
export function useBlazeInventory() {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  const checkInventory = useCallback(async (productId) => {
    try {
      const inventory = await blazeAPI.getInventory(productId);
      return inventory;
    } catch (err) {
      console.error('⚠️ Failed to check inventory:', err);
      throw err;
    }
  }, []);

  const updateInventory = useCallback(async (productId, quantity) => {
    try {
      setUpdating(true);
      setError(null);
      
      const result = await blazeAPI.updateInventory(productId, quantity);
      return result;
    } catch (err) {
      setError(err.message);
      console.error('🚨 Failed to update inventory:', err);
      throw err;
    } finally {
      setUpdating(false);
    }
  }, []);

  return {
    checkInventory,
    updateInventory,
    updating,
    error
  };
}

/**
 * Combined hook for complete Blaze integration
 */
export function useBlaze() {
  const health = useBlazeHealth();
  const store = useBlazeStore();
  const categories = useBlazeCategories();
  
  return {
    health,
    store,
    categories,
    isConnected: health.status === 'connected',
    isLoading: health.status === 'checking' || store.loading || categories.loading
  };
}