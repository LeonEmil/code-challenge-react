import React, { useId, useState } from "react"
import { Alert, TextField, Button, Box, Typography, Paper } from "@mui/material"
import type { Enrollment as EnrollmentType } from "../types/enrollment"

type Props = {
    onCreate: (enrollment: EnrollmentType) => void
}

export const NewEnrollmentForm: React.FC<Props> = ({ onCreate }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [workshop, setWorkshop] = useState("")
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const formTitleId = useId()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!name || !email || !workshop) {
            setSubmitStatus('error')
            return
        }

        const newEnrollment = {
            id: crypto.randomUUID(),
            student_name: name,
            email,
            workshop,
            status: "pending",
            created_at: new Date().toISOString(),
        }

        onCreate(newEnrollment as EnrollmentType)
        setName("")
        setEmail("")
        setWorkshop("")
        setSubmitStatus('success')
    }

    return (
        <Paper sx={{ p: 3 }} component="section" aria-labelledby={formTitleId}>
            <Typography variant="h6" gutterBottom id={formTitleId}>New Enrollment</Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                aria-label="Formulario para crear una nueva inscripción"
                noValidate
            >
                <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    fullWidth
                    aria-label="Nombre del estudiante"
                />
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                    aria-label="Email del estudiante"
                />
                <TextField
                    label="Workshop"
                    variant="outlined"
                    value={workshop}
                    onChange={(e) => setWorkshop(e.target.value)}
                    required
                    fullWidth
                    aria-label="Taller"
                />
                {submitStatus === 'success' && (
                    <Alert severity="success" role="status" aria-live="polite">
                        Enrollment created.
                    </Alert>
                )}
                {submitStatus === 'error' && (
                    <Alert severity="error" role="alert" aria-live="assertive">
                        Please fill all required fields.
                    </Alert>
                )}
                <Button type="submit" variant="contained" color="primary">
                    Create
                </Button>
            </Box>
        </Paper>
    )
}
