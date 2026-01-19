export type EnrollmentStatus = 'pending' | 'confirmed' | 'cancelled'

export type StatusFilter = 'all' | EnrollmentStatus

export type Enrollment = {
  id: string
  student_name: string
  email: string
  workshop: string
  status: EnrollmentStatus
  created_at: Date | string
}

export interface Session {
  id: string
  title: string
}
