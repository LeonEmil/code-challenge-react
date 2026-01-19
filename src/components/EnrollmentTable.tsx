import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import type { Enrollment as EnrollmentType, EnrollmentStatus as EnrollmentStatusType } from './../types/enrollment.ts'

type Props = {
  enrollments: EnrollmentType[]
  onConfirm: (id: string) => void
}

const getStatusColor = (status: EnrollmentStatusType) => {
  switch (status) {
    case 'confirmed':
      return 'success'
    case 'pending':
      return 'warning'
    case 'cancelled':
      return 'error'
    default:
      return 'default'
  }
}

const normalizeDate = (date: Date | string): Date => {
  return typeof date === 'string' ? new Date(date) : date
}

export const EnrollmentTable = ({ enrollments, onConfirm }: Props) => {
  if (!enrollments.length) {
    return <Typography>No enrollments found.</Typography>
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="enrollments table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Workshop</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {enrollments.map((enrollment) => {
            const createdAt = normalizeDate(enrollment.created_at)
            return (
              <TableRow
                key={enrollment.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {enrollment.student_name}
                </TableCell>
                <TableCell>{enrollment.email}</TableCell>
                <TableCell>{enrollment.workshop}</TableCell>
                <TableCell>
                  <Chip
                    label={enrollment.status}
                    color={getStatusColor(enrollment.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{createdAt.toLocaleDateString()}</TableCell>
                <TableCell>
                  {enrollment.status === 'pending' && (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => onConfirm(enrollment.id)}
                    >
                      Confirm
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
