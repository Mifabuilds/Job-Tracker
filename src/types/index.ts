export type Status = 'Saved' | 'Applied' | 'Interview' | 'Offer' | 'Rejected'
export type Priority = 'High' | 'Medium' | 'Low'

export interface Application {
  id: string
  company: string
  role: string
  status: Status
  priority: Priority
  date_applied: string | null
  salary: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export type ApplicationInsert = Omit<Application, 'id' | 'created_at' | 'updated_at'>
