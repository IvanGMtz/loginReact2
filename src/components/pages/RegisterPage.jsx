import { useForm } from "react-hook-form";
import { useAuth } from "../shared/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {

  const { register, handleSubmit, formState:{errors} } = useForm();
  const {signup, isAuthenticated} = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    if (isAuthenticated) navigate('/tasks')
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    signup(values)
  })

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <input type="text"  {...register("name", {
            required: {
              value: true,
              message: "Name is required",
            },
            maxLength: {
              value: 20,
              message: "Name must be less than 20 characters",
            },
            minLength: {
              value: 2,
              message: "Name must be more than 2 characters",
            },
          })} placeholder="Username"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" />
        {errors.name && <span>{errors.name.message}</span>}

        <input type="email" {...register("email", {
            required: {
              value: true,
              message: "Email es requerido",
            },
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Email no válido",
            },
          })} placeholder="Email"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" />
          {errors.email && <span>{errors.email.message}</span>}

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