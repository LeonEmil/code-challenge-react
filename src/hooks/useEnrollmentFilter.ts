import { useMemo } from 'react'
import type { Enrollment as EnrollmentType, StatusFilter as StatusFilterType } from '../types/enrollment'

export const useEnrollmentFilter = (
  enrollments: EnrollmentType[],
  statusFilter: StatusFilterType,
  searchText: string,
) => {
  return useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase()

    return enrollments.filter((enrollment) => {
      const matchesStatus =
        statusFilter === 'all' || enrollment.status === statusFilter

      const matchesSearch =
        normalizedSearch === '' ||
        enrollment.student_name.toLowerCase().includes(normalizedSearch) ||
        enrollment.email.toLowerCase().includes(normalizedSearch)

      return matchesStatus && matchesSearch
    })
  }, [enrollments, statusFilter, searchText])
}

