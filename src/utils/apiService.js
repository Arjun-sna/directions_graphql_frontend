import { create } from "apisauce";

const URL_ROOT = "url";
const { RESTAURANT_API_KEY } = process.env;

class ApiService {
  constructor() {
    this.request = create({
      baseURL: URL_ROOT,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "user-key": RESTAURANT_API_KEY
      }
    });

    if (process.env.NODE_ENV === "development") {
      this.request.addMonitor(console.log);
    }
  }

  sendGet = async (path, params = {}) => {
    const response = await this.request.get(path, params);

    return response.ok ? response.data : null;
  };

  sendPost = async (path, body) => {
    const response = await this.request.post(path, body);

    return response.ok ? response.data : null;
  };
}

export default new ApiService();
