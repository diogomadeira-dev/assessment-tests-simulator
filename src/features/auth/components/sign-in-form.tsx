import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTranslations } from 'next-intl'
import { signIn } from '../actions/sign-in'

const SignInForm = () => {
  const t = useTranslations()

  return (
    <form action={signIn} className="flex flex-col gap-y-2 p-4">
      <Input name="username" type="text" placeholder={t('labels.username')} />
      <Input
        name="password"
        type="password"
        placeholder={t('labels.password')}
      />

      <Button type="submit">{t('auth.signIn')}</Button>
    </form>
  )
}

export { SignInForm }
