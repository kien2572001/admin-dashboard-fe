class ProductService {
  static instance = null;

  constructor() {
    if (ProductService.instance) {
      throw new Error("Singleton class, Use ProductService.getInstance()");
    }
    //this.baseUrl = process.env.BACKEND_URL + "/product-service";
    this.baseUrl = "http://localhost:8082";
    ProductService.instance = this;
  }

  static getInstance() {
    if (!ProductService.instance) {
      return new ProductService();
    }
    return ProductService.instance;
  }

  async fetchProductById(productId) {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      const response = await fetch(
        `${this.baseUrl}/private/product/id/${productId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          },
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message, error.status);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error; // Re-throw for handling in components
    }
  }

  async fetchProductsListForSeller({ page = 1, limit = 10 }) {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      const response = await fetch(
        `${this.baseUrl}/private/product/list?` +
          new URLSearchParams({ page, limit }),
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          },
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message, error.status);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error; // Re-throw for handling in components
    }
  }

  async fetchAllCategories() {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      const response = await fetch(`${this.baseUrl}/private/category/list`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message, error.status);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error; // Re-throw for handling in components
    }
  }

  async createProduct(product) {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      const response = await fetch(`${this.baseUrl}/private/product/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message, error.status);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error; // Re-throw for handling in components
    }
  }

  async updateProduct(productId, product) {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      const response = await fetch(
        `${this.baseUrl}/private/product/id/${productId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          },
          body: JSON.stringify(product),
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message, error.status);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error; // Re-throw for handling in components
    }
  }

  async deleteProduct(productId) {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      const response = await fetch(
        `${this.baseUrl}/private/product/id/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          },
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message, error.status);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error; // Re-throw for handling in components
    }
  }

  async updateProductMedia(productId, media) {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      const response = await fetch(
        `${this.baseUrl}/private/product/${productId}/media`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          },
          body: media,
        }
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message, error.status);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error; // Re-throw for handling in components
    }
  }
}

export default ProductService.getInstance();
