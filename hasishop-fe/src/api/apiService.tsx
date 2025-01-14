export class ApiService {
  private headers: Headers;
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
  }

  async get<T>(url: string): Promise<T> {
    const response = await fetch(this.baseURL + url, {
        headers: this.headers,
        method: "GET"
    });

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    const responeData = await response.json();
    return responeData;
  }

  async post<T, D>(url: string, data: D): Promise<T> {
    const response = await fetch(this.baseURL + url, {
        headers: this.headers,
        method: "POST",
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    const responeData = await response.json();
    return responeData;
  }

  async put<T, D>(url: string, data: D): Promise<T> {
    const response = await fetch(this.baseURL + url, {
        headers: this.headers,
        method: "PUT",
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    const responeData = await response.json();
    return responeData;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await fetch(this.baseURL + url, {
        headers: this.headers,
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    const responeData = await response.json();
    return responeData;
  }
}