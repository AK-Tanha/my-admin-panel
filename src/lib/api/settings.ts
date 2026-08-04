export type AppSettings = {
  siteName: string
  siteDescription: string
  supportEmail: string
  timezone: string
  language: string
  emailNotifications: boolean
  pushNotifications: boolean
  weeklyReport: boolean
  twoFactorAuth: boolean
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

let settings: AppSettings = {
  siteName: "Admin Panel",
  siteDescription: "Your signature admin panel",
  supportEmail: "support@example.com",
  timezone: "UTC",
  language: "en",
  emailNotifications: true,
  pushNotifications: false,
  weeklyReport: true,
  twoFactorAuth: false,
}

const USE_MOCK = true

export async function getSettings(): Promise<AppSettings> {
  if (USE_MOCK) {
    await delay(400)
    return { ...settings }
  }
  // return apiClient.get<AppSettings>("/settings")
  return { ...settings }
}

export async function updateSettings(
  data: Partial<AppSettings>
): Promise<AppSettings> {
  if (USE_MOCK) {
    await delay(500)
    settings = { ...settings, ...data }
    return { ...settings }
  }
  // return apiClient.put<AppSettings>("/settings", data)
  return { ...settings }
}