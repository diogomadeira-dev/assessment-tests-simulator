import { signUp } from '../actions/sign-up'

const SignUpForm = () => {
  return (
    <form action={signUp} className="flex flex-col gap-y-2 p-4">
      <input name="username" type="text" placeholder="Username" />
      <input name="password" type="password" placeholder="Password" />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
      />
      <button type="submit">Sign Up</button>
    </form>
  )
}

export { SignUpForm }
