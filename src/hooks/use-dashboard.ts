import { useQuery } from "@tanstack/react-query"
import {
  getDashboardStats,
  getRevenueData,
  getUsersChartData,
} from "@/lib/api/charts"

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  })
}

export function useRevenueChart() {
  return useQuery({
    queryKey: ["revenue-chart"],
    queryFn: getRevenueData,
  })
}

export function useUsersChart() {
  return useQuery({
    queryKey: ["users-chart"],
    queryFn: getUsersChartData,
  })
}