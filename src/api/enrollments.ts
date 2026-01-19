import type { Enrollment as EnrollmentType } from './../types/enrollment.ts'

export const mockEnrollments = [
  {
    id: "1",
    student_name: "Juan Perez",
    email: "juan.perez@example.com",
    workshop: "React Basics",
    status: "confirmed",
    created_at: new Date("2024-11-20T10:00:00Z"),
  },
  {
    id: "2",
    student_name: "Maria Garcia",
    email: "maria.garcia@example.com",
    workshop: "Advanced TypeScript",
    status: "pending",
    created_at: new Date("2024-11-21T14:30:00Z"),
  },
  {
    id: "3",
    student_name: "Carlos Lopez",
    email: "carlos.lopez@example.com",
    workshop: "Node.js Fundamentals",
    status: "cancelled",
    created_at: new Date("2024-11-22T09:15:00Z"),
  },
  {
    id: "4",
    student_name: "Ana Martinez",
    email: "ana.martinez@example.com",
    workshop: "React Basics",
    status: "pending",
    created_at: new Date("2024-11-23T16:45:00Z"),
  },
]

export const fetchEnrollments = (): Promise<EnrollmentType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockEnrollments] as EnrollmentType[])
    }, 800)
  })
}
