'use server'

import { db } from '@/index'
import { educations } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createEducation(formData: FormData) {
  const institution = formData.get('institution') as string
  const major = formData.get('major') as string
  const startedAt = formData.get('started_at') as string
  const endedAtRaw = formData.get('ended_at') as string
  const endedAt = endedAtRaw || null
  const description = (formData.get('description') as string) || null

  await db.insert(educations).values({ institution, major, startedAt, endedAt, description })

  revalidatePath('/')
  redirect('/')
}

export async function updateEducation(id: number, formData: FormData) {
  const institution = formData.get('institution') as string
  const major = formData.get('major') as string
  const startedAt = formData.get('started_at') as string
  const endedAtRaw = formData.get('ended_at') as string
  const endedAt = endedAtRaw || null
  const description = (formData.get('description') as string) || null

  await db.update(educations)
    .set({ institution, major, startedAt, endedAt, description })
    .where(eq(educations.id, id))

  revalidatePath('/')
  redirect('/')
}

export async function deleteEducation(id: number) {
  await db.delete(educations).where(eq(educations.id, id))
  revalidatePath('/')
}
