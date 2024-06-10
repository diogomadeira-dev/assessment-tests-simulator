import { signUp } from '../actions/sign-up';

const SignUpForm = () => {
  return (
    <form action={signUp} className="p-4 flex flex-col gap-y-2">
      <input name="username" type="text" placeholder="Username" />
      <input name="password" type="password" placeholder="Password" />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export { SignUpForm };
