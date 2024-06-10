import { SignInForm } from '@/features/auth/components/sign-in-form';
import { useTranslations } from 'next-intl';

const SignInPage = () => {

  const t = useTranslations('auth');

  return (
    <>
      <h2>{t('signUp')}</h2>
      <SignInForm />
    </>
  );
};

export default SignInPage;
