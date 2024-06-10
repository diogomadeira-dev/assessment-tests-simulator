import { SignInForm } from '@/features/auth/components/sign-in-form';
import { getAuth } from '@/features/auth/queries/get-auth';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';

const SignInPage = async () => {

  const t = await getTranslations('auth');

  const { user } = await getAuth();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <>
      <h2>{t('signUp')}</h2>
      <SignInForm />
    </>
  );
};

export default SignInPage;
