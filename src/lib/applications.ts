import { supabase } from './supabase'
import type { Application, ApplicationInsert } from '@/types'

export async function getApplications(): Promise<Application[]> {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function createApplication(app: ApplicationInsert): Promise<Application> {
  const { data, error } = await supabase
    .from('applications')
    .insert(app)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateApplication(id: string, updates: Partial<ApplicationInsert>): Promise<Application> {
  const { data, error } = await supabase
    .from('applications')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteApplication(id: string): Promise<void> {
  const { error } = await supabase
    .from('applications')
    .delete()
    .eq('id', id)

  if (error) throw error
}
