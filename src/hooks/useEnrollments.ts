import { useEffect, useState } from 'react'
import { fetchEnrollments } from '../api/enrollments'
import type { Enrollment as EnrollmentType } from '../types/enrollment'

const normalizeDate = (date: Date | string): Date => {
  return typeof date === 'string' ? new Date(date) : date
}

export const useEnrollments = () => {
  const [enrollments, setEnrollments] = useState<EnrollmentType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchEnrollments()
      .then((data) => {
        setEnrollments(
          data.map((enrollment) => ({
            ...enrollment,
            created_at: normalizeDate(enrollment.created_at),
          })),
        )
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err : new Error('Failed to load enrollments'))
      })
      .finally(() => setLoading(false))
  }, [])

  const addEnrollment = (enrollment: EnrollmentType) => {
    setEnrollments((prev) => [
      ...prev,
      {
        ...enrollment,
        created_at: normalizeDate(enrollment.created_at),
      },
    ])
  }

  const confirmEnrollment = (id: string) => {
    setEnrollments((prev) =>
      prev.map((enrollment) =>
        enrollment.id === id ? { ...enrollment, status: 'confirmed' } : enrollment,
      ),
    )
  }

  return {
    enrollments,
    loading,
    error,
    addEnrollment,
    confirmEnrollment,
  }
}
