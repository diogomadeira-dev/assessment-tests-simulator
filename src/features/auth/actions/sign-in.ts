'use server'

import { lucia } from '@/lib/lucia'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Argon2id } from 'oslo/password'

const signIn = async (formData: FormData) => {
  const formDataRaw = {
    username: formData.get('username') as string,
    password: formData.get('password') as string,
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username: formDataRaw.username },
    })

    if (!user) {
      // https://www.robinwieruch.de/next-forms/
      throw new Error('Incorrect username or password')
    }

    const validPassword = await new Argon2id().verify(
      user.hashedPassword,
      formDataRaw.password,
    )

    if (!validPassword) {
      // https://www.robinwieruch.de/next-forms/
      throw new Error('Incorrect username or password')
    }

    const session = await lucia.createSession(user.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    )
  } catch (error) {
    // TODO: add error feedback yourself
    // https://www.robinwieruch.de/next-forms/
  }

  redirect('/dashboard')
}

export { signIn }
