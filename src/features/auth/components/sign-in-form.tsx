import { signIn } from '../actions/sign-in';

const SignInForm = () => {
  return (
    <form action={signIn} className="p-4 flex flex-col gap-y-2">
      <input name="username" type="text" placeholder="Username" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Sign In</button>
    </form>
  );
};

export { SignInForm };
