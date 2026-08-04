type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

interface RequestOptions {
  method?: RequestMethod
  body?: unknown
  headers?: Record<string, string>
  params?: Record<string, string | number | boolean | undefined>
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl
  }

  private getAuthToken(): string | null {
    // Later you can change this to read from cookies or auth context
    const user = localStorage.getItem("admin_user")
    if (!user) return null

    // For now we don't have a real token, just simulate
    return "fake-jwt-token"
  }

  private buildUrl(endpoint: string, params?: RequestOptions["params"]): string {
    const url = new URL(endpoint, this.baseUrl || window.location.origin)

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value))
        }
      })
    }

    return this.baseUrl ? url.toString() : endpoint + (url.search || "")
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = "GET", body, headers = {}, params } = options

    const token = this.getAuthToken()

    const config: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    }

    if (body) {
      config.body = JSON.stringify(body)
    }

    const url = this.buildUrl(endpoint, params)

    const response = await fetch(url, config)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Request failed with status ${response.status}`)
    }

    // Handle empty responses (like DELETE)
    if (response.status === 204) {
      return {} as T
    }

    return response.json()
  }

  get<T>(endpoint: string, params?: RequestOptions["params"]) {
    return this.request<T>(endpoint, { method: "GET", params })
  }

  post<T>(endpoint: string, body?: unknown) {
    return this.request<T>(endpoint, { method: "POST", body })
  }

  put<T>(endpoint: string, body?: unknown) {
    return this.request<T>(endpoint, { method: "PUT", body })
  }

  patch<T>(endpoint: string, body?: unknown) {
    return this.request<T>(endpoint, { method: "PATCH", body })
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: "DELETE" })
  }
}

// Create the main instance
// Later change this to your real API URL
export const apiClient = new ApiClient(import.meta.env.VITE_API_URL || "")