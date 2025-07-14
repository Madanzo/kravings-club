export class KravingsWordPress {
  constructor() {
    this.baseUrl = process.env.WORDPRESS_API_URL || 'https://kravings.club';
    this.username = process.env.WP_USERNAME;
    this.password = process.env.WP_APP_PASSWORD;
    
    if (typeof window === 'undefined') {
      this.auth = Buffer.from(`${this.username}:${this.password}`).toString('base64');
    } else {
      this.auth = btoa(`${this.username}:${this.password}`);
    }
  }

  async fetchWithAuth(url) {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Basic ${this.auth}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return await response.json();
  }

  async getProducts() {
    return await this.fetchWithAuth(`${this.baseUrl}/wp-json/wp/v2/posts?per_page=50`);
  }

  async getProductsByCategory(categoryId) {
    return await this.fetchWithAuth(`${this.baseUrl}/wp-json/wp/v2/posts?categories=${categoryId}&per_page=20`);
  }

  async getFlowerProducts() {
    return await this.getProductsByCategory(356);
  }

  async getEdibleProducts() {
    return await this.getProductsByCategory(357);
  }

  async getPages() {
    return await this.fetchWithAuth(`${this.baseUrl}/wp-json/wp/v2/pages`);
  }

  async searchProducts(query) {
    return await this.fetchWithAuth(`${this.baseUrl}/wp-json/wp/v2/posts?search=${encodeURIComponent(query)}`);
  }
}

export const wp = new KravingsWordPress();