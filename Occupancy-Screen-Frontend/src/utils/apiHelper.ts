import axios, { AxiosInstance, AxiosResponse } from "axios";
import { BASE_URL } from "./constants";

class ApiHelper {
  private static axiosInstance: AxiosInstance;

  // Initialize axiosInstance using a static method
  private static initializeAxiosInstance(): AxiosInstance {
    return axios.create({
      baseURL: BASE_URL,
      headers: {
        Authorization: this.getAuthorizationToken(),
      },
    });
  }

  // Call the initialize method directly to set axiosInstance
  public static getAxiosInstance(): AxiosInstance {
    if (!this.axiosInstance) {
      this.axiosInstance = this.initializeAxiosInstance();
    }
    return this.axiosInstance;
  }

  // Method to set Authorization header, now as a regular static method
  public static setAuthorizationHeader(token: string | null): void {
    if (token) {
      this.getAxiosInstance().defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    } else {
      delete this.getAxiosInstance().defaults.headers.common["Authorization"];
    }
  }

  // Adjusted to a static method
  private static getAuthorizationToken(): string | undefined {
    const token: string = localStorage.getItem("token") ?? "";
    return token ? `Bearer ${token}` : undefined;
  }

  // Static GET method
  public static async get<T>(
    url: string,
    params?: object
  ): Promise<AxiosResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.getAxiosInstance().get<T>(
        url,
        { params }
      );
      return response as AxiosResponse<T>;
    } catch (error) {
      console.error("Error occurred: ", error);
      throw error;
    }
  }

  // Static POST method
  public static async post<T>(
    url: string,
    data?: object
  ): Promise<AxiosResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.getAxiosInstance().post<T>(
        url,
        data
      );
      return response as AxiosResponse<T>;
    } catch (error) {
      console.error("Error occurred: ", error);
      throw error;
    }
  }

  // Static DELETE method
  public static async delete<T>(url: string): Promise<AxiosResponse<T>> {
    try {
      const response: AxiosResponse<T> =
        await this.getAxiosInstance().delete<T>(url);
      return response as AxiosResponse<T>;
    } catch (error) {
      console.error("Error occurred: ", error);
      throw error;
    }
  }
}

export default ApiHelper;
