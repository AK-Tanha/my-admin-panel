export type User = {
  id: string
  name: string
  email: string
  role: string
  status: "Active" | "Inactive"
  lastLogin: string
}

const fakeUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2 hours ago",
  },
  {
    id: "2",
    name: "Sarah Smith",
    email: "sarah@example.com",
    role: "Editor",
    status: "Active",
    lastLogin: "5 hours ago",
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael@example.com",
    role: "Viewer",
    status: "Inactive",
    lastLogin: "3 days ago",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "Editor",
    status: "Active",
    lastLogin: "1 day ago",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david@example.com",
    role: "Viewer",
    status: "Active",
    lastLogin: "12 hours ago",
  },
  {
    id: "6",
    name: "Lisa Brown",
    email: "lisa@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "30 minutes ago",
  },
  {
    id: "7",
    name: "Robert Taylor",
    email: "robert@example.com",
    role: "Viewer",
    status: "Inactive",
    lastLogin: "1 week ago",
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getUsers(): Promise<User[]> {
  await delay(600)
  return [...fakeUsers]
}

export async function createUser(data: Omit<User, "id" | "lastLogin">): Promise<User> {
  await delay(500)
  const newUser: User = {
    id: Date.now().toString(),
    ...data,
    lastLogin: "Just now",
  }
  fakeUsers.unshift(newUser)
  return newUser
}

export async function updateUser(id: string, data: Partial<User>): Promise<User> {
  await delay(500)
  const index = fakeUsers.findIndex((u) => u.id === id)
  if (index === -1) throw new Error("User not found")

  fakeUsers[index] = { ...fakeUsers[index], ...data }
  return fakeUsers[index]
}

export async function deleteUser(id: string): Promise<void> {
  await delay(400)
  const index = fakeUsers.findIndex((u) => u.id === id)
  if (index === -1) throw new Error("User not found")
  fakeUsers.splice(index, 1)
}