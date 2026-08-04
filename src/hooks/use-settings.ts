import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getSettings, updateSettings, type AppSettings } from "@/lib/api/settings"
import { toast } from "sonner"

export function useSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  })
}

export function useUpdateSettings() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<AppSettings>) => updateSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] })
      toast.success("Settings saved successfully")
    },
    onError: () => {
      toast.error("Failed to save settings")
    },
  })
}