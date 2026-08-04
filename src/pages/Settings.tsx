import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useSettings, useUpdateSettings } from "@/hooks/use-settings"

const settingsSchema = z.object({
  siteName: z.string().min(2, "Site name is required"),
  siteDescription: z.string().max(200).optional(),
  supportEmail: z.string().email("Enter a valid email"),
  timezone: z.string().min(1, "Timezone is required"),
  language: z.string().min(1, "Language is required"),
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  weeklyReport: z.boolean(),
  twoFactorAuth: z.boolean(),
})

type SettingsFormValues = z.infer<typeof settingsSchema>

export default function Settings() {
  const { data: settings, isLoading } = useSettings()
  const updateMutation = useUpdateSettings()

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      siteName: "",
      siteDescription: "",
      supportEmail: "",
      timezone: "UTC",
      language: "en",
      emailNotifications: true,
      pushNotifications: false,
      weeklyReport: true,
      twoFactorAuth: false,
    },
  })

  // Load settings into form
  useEffect(() => {
    if (settings) {
      form.reset(settings)
    }
  }, [settings, form])

  const onSubmit = (values: SettingsFormValues) => {
    updateMutation.mutate(values)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-40 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application settings and preferences.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* General */}
        <Card>
          <CardHeader>
            <CardTitle>General</CardTitle>
            <CardDescription>
              Basic information about your application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel>Site Name</FieldLabel>
                <Input {...form.register("siteName")} />
                <FieldError>
                  {form.formState.errors.siteName?.message}
                </FieldError>
              </Field>

              <Field>
                <FieldLabel>Description</FieldLabel>
                <Input {...form.register("siteDescription")} />
                <FieldError>
                  {form.formState.errors.siteDescription?.message}
                </FieldError>
              </Field>

              <Field>
                <FieldLabel>Support Email</FieldLabel>
                <Input type="email" {...form.register("supportEmail")} />
                <FieldError>
                  {form.formState.errors.supportEmail?.message}
                </FieldError>
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel>Timezone</FieldLabel>
                  <Input {...form.register("timezone")} placeholder="UTC" />
                  <FieldError>
                    {form.formState.errors.timezone?.message}
                  </FieldError>
                </Field>

                <Field>
                  <FieldLabel>Language</FieldLabel>
                  <Input {...form.register("language")} placeholder="en" />
                  <FieldError>
                    {form.formState.errors.language?.message}
                  </FieldError>
                </Field>
              </div>
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Configure how you receive notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Email Notifications</div>
                <div className="text-sm text-muted-foreground">
                  Receive notifications via email
                </div>
              </div>
              <Switch
                checked={form.watch("emailNotifications")}
                onCheckedChange={(checked) =>
                  form.setValue("emailNotifications", checked)
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Push Notifications</div>
                <div className="text-sm text-muted-foreground">
                  Receive push notifications in browser
                </div>
              </div>
              <Switch
                checked={form.watch("pushNotifications")}
                onCheckedChange={(checked) =>
                  form.setValue("pushNotifications", checked)
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Weekly Report</div>
                <div className="text-sm text-muted-foreground">
                  Get a weekly summary of activity
                </div>
              </div>
              <Switch
                checked={form.watch("weeklyReport")}
                onCheckedChange={(checked) =>
                  form.setValue("weeklyReport", checked)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>
              Manage security preferences for your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Two-Factor Authentication</div>
                <div className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </div>
              </div>
              <Switch
                checked={form.watch("twoFactorAuth")}
                onCheckedChange={(checked) =>
                  form.setValue("twoFactorAuth", checked)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => settings && form.reset(settings)}
          >
            Reset
          </Button>
          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}