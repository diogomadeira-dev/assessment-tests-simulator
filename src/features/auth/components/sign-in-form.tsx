import { Input } from '@/components/ui/input';
import { signIn } from '../actions/sign-in';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

const SignInForm = () => {

  const t = useTranslations();

  return (
    <form action={signIn} className="p-4 flex flex-col gap-y-2">
      <Input name="username" type="text" placeholder={t("labels.username")} />
      <Input name="password" type="password" placeholder={t("labels.password")} />

      <Button type="submit">{t("auth.signIn")}</Button>
    </form>
  );
};

export { SignInForm };
