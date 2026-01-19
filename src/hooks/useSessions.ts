import { useState } from "react"
import type { Session as SessionType } from '../types/enrollment'

export const useSessions = () => {
    const [sessions, setSessions] = useState<SessionType[]>([])
    return { sessions, setSessions }
}
