import { SignInForm } from '@/features/auth/components/sign-in-form';
import { getAuth } from '@/features/auth/queries/get-auth';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image'
import { redirect } from 'next/navigation';

const SignInPage = async () => {

  const t = await getTranslations();

  const { user } = await getAuth();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div>
      <div className="container relative h-screen flex-col items-center justify-center overflow-hidden md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex">
          <div className="absolute inset-0 bg-zinc-900">
            <Image
              src="/images/authentication.jpg"
              layout="fill"
              objectFit="cover"
              alt="Authentication"
            />
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[450px]">
            <Image
              src="/logo.png"
              width={100}
              height={100}
              alt="Acento Tónico"
            />
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {t('title')}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t("auth.description")}
              </p>
            </div>
            <SignInForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
