import { useMemo } from 'react'
import type { Enrollment as EnrollmentType, StatusFilter as StatusFilterType } from '../types/enrollment'

export const useEnrollmentFilter = (
  enrollments: EnrollmentType[],
  statusFilter: StatusFilterType,
) => {
  return useMemo(() => {
    if (statusFilter === 'all') return enrollments
    return enrollments.filter((enrollment) => enrollment.status === statusFilter)
  }, [enrollments, statusFilter])
}
