import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Mail, MapPin, Phone, Calendar, Shield } from "lucide-react";
import { toast } from "sonner";
import { FileDropzone, type DropzoneFile } from "@/components/ui/file-dropzone";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number is too short")
    .regex(/^[+]?[\d\s\-()]+$/, "Please enter a valid phone number"),
  location: z.string().min(2, "Location is required"),
  bio: z.string().max(200, "Bio must be less than 200 characters").optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function Profile() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, USA",
      bio: "Full-stack developer and admin panel enthusiast.",
    },
  });


  function onSubmit(values: ProfileFormValues) {
    console.log(values);
    toast.success("Profile updated successfully!");
  }
  const [avatar, setAvatar] = useState<DropzoneFile[]>([]);
  const avatarPreview = avatar[0]?.preview;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and personal information.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="items-center text-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatarPreview || ""} alt="John Doe" />
              <AvatarFallback className="text-2xl">JD</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle className="text-xl">John Doe</CardTitle>
              <CardDescription>john@example.com</CardDescription>
            </div>
            <Badge variant="secondary" className="mt-2">
              <Shield className="mr-1 h-3 w-3" />
              Admin
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <Separator />
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>john@example.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>New York, USA</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Joined January 2024</span>
              </div>
            </div>
            <Separator />
            <Button className="w-full" variant="outline">
              Change Avatar
            </Button>
          </CardContent>
        </Card>

        {/* Right Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FieldGroup>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel>First Name</FieldLabel>
                    <Input {...form.register("firstName")} />
                    <FieldError>
                      {form.formState.errors.firstName?.message}
                    </FieldError>
                  </Field>

                  <Field>
                    <FieldLabel>Last Name</FieldLabel>
                    <Input {...form.register("lastName")} />
                    <FieldError>
                      {form.formState.errors.lastName?.message}
                    </FieldError>
                  </Field>
                </div>

                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input type="email" {...form.register("email")} />
                  <FieldError>
                    {form.formState.errors.email?.message}
                  </FieldError>
                </Field>

                <Field>
                  <FieldLabel>Phone</FieldLabel>
                  <Input {...form.register("phone")} />
                  <FieldError>
                    {form.formState.errors.phone?.message}
                  </FieldError>
                </Field>

                <Field>
                  <FieldLabel>Location</FieldLabel>
                  <Input {...form.register("location")} />
                  <FieldError>
                    {form.formState.errors.location?.message}
                  </FieldError>
                </Field>

                <Field>
                  <FieldLabel>Bio</FieldLabel>
                  <Input {...form.register("bio")} />
                  <FieldError>{form.formState.errors.bio?.message}</FieldError>
                </Field>
                <FileDropzone
                  value={avatar}
                  onChange={setAvatar}
                  maxFiles={1}
                  multiple={false}
                  accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
                  label="Change avatar"
                  description="Square image recommended"
/>
              </FieldGroup>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
