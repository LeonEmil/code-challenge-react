import React, { useState } from "react"
import { TextField, Button, Box, Typography, Paper } from "@mui/material"
import type { Enrollment as EnrollmentType } from "../types/enrollment"

type Props = {
    onCreate: (enrollment: EnrollmentType) => void
}

export const NewEnrollmentForm: React.FC<Props> = ({ onCreate }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [workshop, setWorkshop] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!name || !email || !workshop) return

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
    }

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>New Enrollment</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    label="Workshop"
                    variant="outlined"
                    value={workshop}
                    onChange={(e) => setWorkshop(e.target.value)}
                    required
                    fullWidth
                />
                <Button type="submit" variant="contained" color="primary">
                    Create
                </Button>
            </Box>
        </Paper>
    )
}
