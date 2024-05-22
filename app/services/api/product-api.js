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
}

export default ProductService.getInstance();
