export type Project = {
  id: string
  name: string
  client: string
  status: "Planning" | "In Progress" | "Completed" | "On Hold"
  budget: string
  deadline: string
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

let projects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    client: "Acme Corp",
    status: "In Progress",
    budget: "$12,000",
    deadline: "2026-09-15",
  },
  {
    id: "2",
    name: "Mobile App",
    client: "TechStart",
    status: "Planning",
    budget: "$25,000",
    deadline: "2026-11-01",
  },
  {
    id: "3",
    name: "API Integration",
    client: "DataFlow Inc",
    status: "Completed",
    budget: "$8,500",
    deadline: "2026-07-20",
  },
  {
    id: "4",
    name: "Marketing Dashboard",
    client: "Growth Labs",
    status: "On Hold",
    budget: "$6,200",
    deadline: "2026-10-10",
  },
  {
    id: "5",
    name: "E-commerce Store",
    client: "ShopEasy",
    status: "In Progress",
    budget: "$18,000",
    deadline: "2026-12-01",
  },
]

export async function getProjects(): Promise<Project[]> {
  await delay(600)
  return [...projects]
}

export async function createProject(
  data: Omit<Project, "id">
): Promise<Project> {
  await delay(500)
  const newProject: Project = {
    id: Date.now().toString(),
    ...data,
  }
  projects.unshift(newProject)
  return newProject
}

export async function updateProject(
  id: string,
  data: Partial<Project>
): Promise<Project> {
  await delay(500)
  const index = projects.findIndex((p) => p.id === id)
  if (index === -1) throw new Error("Project not found")
  projects[index] = { ...projects[index], ...data }
  return projects[index]
}

export async function deleteProject(id: string): Promise<void> {
  await delay(400)
  projects = projects.filter((p) => p.id !== id)
}