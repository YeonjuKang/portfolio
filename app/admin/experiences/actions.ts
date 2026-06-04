'use server'

import { db } from '@/index'
import { experiences } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createExperience(formData: FormData) {
  const company = formData.get('company') as string
  const role = formData.get('role') as string
  const startedAt = formData.get('started_at') as string
  const endedAtRaw = formData.get('ended_at') as string
  const endedAt = endedAtRaw || null
  const descriptionRaw = formData.get('description') as string
  const description = descriptionRaw.split('\n').map(s => s.trim()).filter(Boolean)

  await db.insert(experiences).values({ company, role, startedAt, endedAt, description })

  revalidatePath('/')
  redirect('/')
}

export async function updateExperience(id: number, formData: FormData) {
  const company = formData.get('company') as string
  const role = formData.get('role') as string
  const startedAt = formData.get('started_at') as string
  const endedAtRaw = formData.get('ended_at') as string
  const endedAt = endedAtRaw || null
  const descriptionRaw = formData.get('description') as string
  const description = descriptionRaw.split('\n').map(s => s.trim()).filter(Boolean)

  await db.update(experiences)
    .set({ company, role, startedAt, endedAt, description })
    .where(eq(experiences.id, id))

  revalidatePath('/')
  redirect('/')
}

export async function deleteExperience(id: number) {
  await db.delete(experiences).where(eq(experiences.id, id))
  revalidatePath('/')
}
