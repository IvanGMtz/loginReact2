import { useForm } from "react-hook-form";
import { useAuth } from "../shared/AuthContext";

function RegisterPage() {

  const { register, handleSubmit } = useForm();
  const {signup, user} = useAuth();

  console.log(user);

  const onSubmit = handleSubmit(async (values) => {
    signup(values)
  })

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <input type="text" {...register('name', { required: true })} placeholder="Username"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" />
        <input type="email" {...register('email', { required: true })} placeholder="Email"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" />
        <input type="password" {...register('password', { required: true })} placeholder="Password"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" />
        <button>
          Register
        </button>

      </form>
    </div>
  );
}

export default RegisterPage;