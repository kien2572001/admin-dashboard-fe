class UserServices {
  static instance = null;

  constructor() {
    if (UserServices.instance) {
      throw new Error("Singleton class, Use UserServices.getInstance()");
    }
    //this.baseUrl = process.env.BACKEND_URL + "/user-service";
    this.baseUrl = "http://localhost:8081";
    UserServices.instance = this;
  }

  static getInstance() {
    if (!UserServices.instance) {
      return new UserServices();
    }
    return UserServices.instance;
  }

  async fetchMyProfile() {
    const token = localStorage.getItem("ACCESS_TOKEN");
    try {
      const response = await fetch(`${this.baseUrl}/user/my-profile`, {
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

  async fetchShopProfile() {
    const token = localStorage.getItem("ACCESS_TOKEN");
    try {
      const response = await fetch(`${this.baseUrl}/private/shop/by-owner`, {
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

export default UserServices.getInstance();
