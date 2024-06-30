/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
    USER_SERVICE_URL: process.env.USER_SERVICE_URL,
    ORDER_SERVICE_URL: process.env.ORDER_SERVICE_URL,
    PRODUCT_SERVICE_URL: process.env.PRODUCT_SERVICE_URL,
    INVENTORY_SERVICE_URL: process.env.INVENTORY_SERVICE_URL,
  },
};

export default nextConfig;
