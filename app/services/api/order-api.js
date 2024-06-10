class OrderService {
  static instance = null;

  constructor() {
    if (OrderService.instance) {
      throw new Error("Singleton class, Use OrderService.getInstance()");
    }
    //this.baseUrl = process.env.BACKEND_URL + "/order-service";
    this.baseUrl = "http://localhost:8041";
    OrderService.instance = this;
  }

  static getInstance() {
    if (!OrderService.instance) {
      return new OrderService();
    }
    return OrderService.instance;
  }

  async fetchOrderByCode(code) {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      const response = await fetch(`${this.baseUrl}/public/order/${code}`, {
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

  async fetchOrdersBySellerId(
    sellerId,
    { page = 1, limit = 10, status = "all", code = "" }
  ) {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      const response = await fetch(
        `${this.baseUrl}/public/order/shop/${sellerId}?` +
          new URLSearchParams({ page, limit, status, code }),
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

  async createFlashSale(flashsale) {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      const response = await fetch(`${this.baseUrl}/public/flashsale/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        },
        body: JSON.stringify(flashsale),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message, error.status);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  }

  async fetchFlashSaleBySellerId(sellerId, { page = 1, limit = 10 }) {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      const response = await fetch(
        `${this.baseUrl}/public/flashsale/shop/${sellerId}?` +
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
      throw error;
    }
  }

  async deleteFlashSale(flashsaleId) {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      const response = await fetch(
        `${this.baseUrl}/public/flashsale/${flashsaleId}`,
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
      throw error;
    }
  }

  async getFlashSaleById(flashsaleId) {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      const response = await fetch(
        `${this.baseUrl}/public/flashsale/${flashsaleId}`,
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
      throw error;
    }
  }

  async updateFlashSale(id, flashsale) {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      const response = await fetch(`${this.baseUrl}/public/flashsale/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        },
        body: JSON.stringify(flashsale),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message, error.status);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  }
}

export default OrderService.getInstance();
