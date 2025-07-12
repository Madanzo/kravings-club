/**
 * BLAZE POS Integration Service
 * Connects Kravings Club to Blaze dispensary management system
 */

class BlazeAPIService {
  constructor() {
    this.baseUrl = process.env.BLAZE_API_URL || 'https://api.blaze.me';
    this.apiKey = process.env.BLAZE_API_KEY || 'wygWFaRWdJsanUHXTkcNutxXu0AZk7S3tY3AL6YpEpWDiZPY';
    this.storeId = process.env.BLAZE_STORE_ID || 'kraving-cannabis-delivery';
    this.storeName = 'Kraving Cannabis Delivery';
    this.cache = new Map();
    this.cacheTimeout = 15 * 60 * 1000; // 15 minutes
    
    // Check if we should use demo mode
    this.demoMode = process.env.NEXT_PUBLIC_BLAZE_DEMO_MODE === 'true' || !this.apiKey.startsWith('wyg');
    
    if (this.demoMode) {
      console.warn('⚠️ Blaze API running in DEMO MODE. Set NEXT_PUBLIC_BLAZE_DEMO_MODE=false for live data.');
    } else {
      console.log('🚀 Blaze API connected with live credentials for:', this.storeName);
    }
  }

  /**
   * Make authenticated request to Blaze API
   */
  async makeRequest(endpoint, options = {}) {
    if (this.demoMode) {
      return this.getDemoData(endpoint);
    }

    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'X-Store-ID': this.storeId,
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`Blaze API Error: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('🚨 Blaze API Request Failed:', error);
      
      // Fallback to cached data if available
      const cachedData = this.getCachedData(endpoint);
      if (cachedData) {
        console.warn('📦 Returning cached data due to API failure');
        return cachedData;
      }
      
      throw error;
    }
  }

  /**
   * Cache management
   */
  setCachedData(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  getCachedData(key) {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    const isExpired = Date.now() - cached.timestamp > this.cacheTimeout;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  /**
   * Get all products from Blaze inventory
   */
  async getProducts() {
    const cacheKey = 'products';
    const cached = this.getCachedData(cacheKey);
    
    if (cached) {
      return cached;
    }

    const products = await this.makeRequest('/v1/products');
    this.setCachedData(cacheKey, products);
    
    return products;
  }

  /**
   * Get products by category
   */
  async getProductsByCategory(categoryId) {
    const cacheKey = `products_category_${categoryId}`;
    const cached = this.getCachedData(cacheKey);
    
    if (cached) {
      return cached;
    }

    const products = await this.makeRequest(`/v1/products?category=${categoryId}`);
    this.setCachedData(cacheKey, products);
    
    return products;
  }

  /**
   * Get product categories
   */
  async getCategories() {
    const cacheKey = 'categories';
    const cached = this.getCachedData(cacheKey);
    
    if (cached) {
      return cached;
    }

    const categories = await this.makeRequest('/v1/categories');
    this.setCachedData(cacheKey, categories);
    
    return categories;
  }

  /**
   * Create order in Blaze POS
   */
  async createOrder(orderData) {
    const order = await this.makeRequest('/v1/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
    
    return order;
  }

  /**
   * Get real-time inventory for a product
   */
  async getInventory(productId) {
    return await this.makeRequest(`/v1/inventory/${productId}`);
  }

  /**
   * Update inventory (for internal use)
   */
  async updateInventory(productId, quantity) {
    return await this.makeRequest(`/v1/inventory/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity })
    });
  }

  /**
   * Search products
   */
  async searchProducts(query) {
    const cacheKey = `search_${query}`;
    const cached = this.getCachedData(cacheKey);
    
    if (cached) {
      return cached;
    }

    const results = await this.makeRequest(`/v1/products/search?q=${encodeURIComponent(query)}`);
    this.setCachedData(cacheKey, results);
    
    return results;
  }

  /**
   * Get store information
   */
  async getStoreInfo() {
    const cacheKey = 'store_info';
    const cached = this.getCachedData(cacheKey);
    
    if (cached) {
      return cached;
    }

    const storeInfo = await this.makeRequest('/v1/store');
    this.setCachedData(cacheKey, storeInfo);
    
    return storeInfo;
  }

  /**
   * Demo data for development/testing
   */
  getDemoData(endpoint) {
    const demoData = {
      '/v1/products': {
        data: [
          {
            id: 'blaze_001',
            name: 'Girl Scout Cookies',
            category: 'flower',
            price: 45.00,
            thc_content: 22.5,
            cbd_content: 0.8,
            strain_type: 'Hybrid',
            inventory_count: 25,
            image_url: '/api/placeholder/300/300',
            description: 'Premium indoor-grown Girl Scout Cookies strain',
            brand: 'House Brand',
            effects: ['Relaxed', 'Happy', 'Euphoric'],
            terpenes: ['Caryophyllene', 'Limonene', 'Myrcene'],
            lab_tested: true,
            status: 'active'
          },
          {
            id: 'blaze_002',
            name: 'Blue Dream',
            category: 'flower',
            price: 40.00,
            thc_content: 18.2,
            cbd_content: 1.2,
            strain_type: 'Sativa',
            inventory_count: 18,
            image_url: '/api/placeholder/300/300',
            description: 'Classic Blue Dream sativa-dominant strain',
            brand: 'Premium Selections',
            effects: ['Creative', 'Energetic', 'Focused'],
            terpenes: ['Myrcene', 'Pinene', 'Caryophyllene'],
            lab_tested: true,
            status: 'active'
          },
          {
            id: 'blaze_003',
            name: 'STIIIZY Pod - OG Kush',
            category: 'vapes',
            price: 55.00,
            thc_content: 85.4,
            cbd_content: 0.2,
            strain_type: 'Indica',
            inventory_count: 12,
            image_url: '/api/placeholder/300/300',
            description: 'Premium STIIIZY live resin pod',
            brand: 'STIIIZY',
            effects: ['Relaxed', 'Sleepy', 'Calm'],
            lab_tested: true,
            status: 'active'
          },
          {
            id: 'blaze_004',
            name: 'CBX Gummies - Mixed Berry',
            category: 'edibles',
            price: 25.00,
            thc_content: 10.0,
            cbd_content: 0.5,
            strain_type: 'Hybrid',
            inventory_count: 35,
            image_url: '/api/placeholder/300/300',
            description: 'Delicious mixed berry gummies - 10mg THC each',
            brand: 'CBX',
            effects: ['Relaxed', 'Happy', 'Euphoric'],
            lab_tested: true,
            status: 'active',
            pieces_per_package: 10
          }
        ],
        total: 4,
        page: 1,
        per_page: 50
      },
      '/v1/categories': {
        data: [
          { id: 'flower', name: 'Flower', slug: 'flower' },
          { id: 'edibles', name: 'Edibles', slug: 'edibles' },
          { id: 'vapes', name: 'Vapes & Cartridges', slug: 'vapes' },
          { id: 'concentrates', name: 'Concentrates', slug: 'concentrates' },
          { id: 'pre-rolls', name: 'Pre-Rolls', slug: 'pre-rolls' },
          { id: 'topicals', name: 'Topicals', slug: 'topicals' }
        ]
      },
      '/v1/store': {
        data: {
          id: this.storeId,
          name: 'Kravings Club',
          address: '123 Cannabis St, Los Angeles, CA 90210',
          phone: '(555) 420-WEED',
          email: 'info@kravings.club',
          hours: {
            monday: '9:00 AM - 10:00 PM',
            tuesday: '9:00 AM - 10:00 PM',
            wednesday: '9:00 AM - 10:00 PM',
            thursday: '9:00 AM - 10:00 PM',
            friday: '9:00 AM - 11:00 PM',
            saturday: '9:00 AM - 11:00 PM',
            sunday: '10:00 AM - 9:00 PM'
          },
          delivery_zones: ['90210', '90211', '90212', '90213'],
          minimum_order: 30.00,
          delivery_fee: 5.00,
          tax_rate: 0.085
        }
      }
    };

    return demoData[endpoint] || { data: [], message: 'Demo endpoint not found' };
  }

  /**
   * Convert Blaze product format to our component format
   */
  mapBlazeProduct(blazeProduct) {
    return {
      id: blazeProduct.id,
      name: blazeProduct.name,
      category: blazeProduct.category,
      price: blazeProduct.price,
      thc: blazeProduct.thc_content,
      cbd: blazeProduct.cbd_content,
      type: blazeProduct.strain_type,
      image: blazeProduct.image_url || '/api/placeholder/300/300',
      brand: blazeProduct.brand,
      description: blazeProduct.description,
      effects: blazeProduct.effects || [],
      inStock: blazeProduct.inventory_count > 0,
      inventory: blazeProduct.inventory_count,
      labTested: blazeProduct.lab_tested,
      rating: 4.5, // Default rating, can be enhanced with reviews
      reviews: Math.floor(Math.random() * 200) + 50 // Mock reviews for now
    };
  }

  /**
   * Health check for Blaze API connection
   */
  async healthCheck() {
    try {
      await this.getStoreInfo();
      return { status: 'connected', message: 'Blaze API connection successful' };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }
}

// Export singleton instance
export const blazeAPI = new BlazeAPIService();
export default BlazeAPIService;