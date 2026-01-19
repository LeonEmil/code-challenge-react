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
    return (
      <Typography role="status" aria-live="polite">
        No enrollments found.
      </Typography>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Tabla de inscripciones">
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="col">Name</TableCell>
            <TableCell component="th" scope="col">Email</TableCell>
            <TableCell component="th" scope="col">Workshop</TableCell>
            <TableCell component="th" scope="col">Status</TableCell>
            <TableCell component="th" scope="col">Date</TableCell>
            <TableCell component="th" scope="col">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {enrollments.map((enrollment) => {
            const createdAt = normalizeDate(enrollment.created_at)
            const formattedDate = createdAt.toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
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
                    aria-label={`Estado: ${enrollment.status}`}
                  />
                </TableCell>
                <TableCell>
                  <time dateTime={createdAt.toISOString()}>{formattedDate}</time>
                </TableCell>
                <TableCell>
                  {enrollment.status === 'pending' && (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => onConfirm(enrollment.id)}
                      aria-label={`Confirmar inscripción de ${enrollment.student_name}`}
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
