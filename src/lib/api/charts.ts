export type RevenuePoint = {
  month: string
  revenue: number
}

export type UsersPoint = {
  month: string
  users: number
}

export type DashboardStats = {
  totalUsers: number
  documents: number
  reports: number
  activeNow: number
  usersChange: string
  documentsChange: string
  reportsChange: string
  activeChange: string
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getDashboardStats(): Promise<DashboardStats> {
  await delay(500)
  return {
    totalUsers: 2350,
    documents: 1234,
    reports: 573,
    activeNow: 48,
    usersChange: "+18% from last month",
    documentsChange: "+12% from last month",
    reportsChange: "+8% from last month",
    activeChange: "+4 since last hour",
  }
}

export async function getRevenueData(): Promise<RevenuePoint[]> {
  await delay(600)
  return [
    { month: "Jan", revenue: 4200 },
    { month: "Feb", revenue: 3800 },
    { month: "Mar", revenue: 5100 },
    { month: "Apr", revenue: 4600 },
    { month: "May", revenue: 5800 },
    { month: "Jun", revenue: 6200 },
    { month: "Jul", revenue: 7100 },
  ]
}

export async function getUsersChartData(): Promise<UsersPoint[]> {
  await delay(600)
  return [
    { month: "Jan", users: 120 },
    { month: "Feb", users: 180 },
    { month: "Mar", users: 240 },
    { month: "Apr", users: 200 },
    { month: "May", users: 310 },
    { month: "Jun", users: 290 },
    { month: "Jul", users: 380 },
  ]
}