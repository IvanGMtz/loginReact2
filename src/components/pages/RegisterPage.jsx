import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../shared/context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = useRef(null);
  password.current = watch("password", "");
  
  const { signup, isAuthenticated, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        {RegisterErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white" key={i}>
            {error}
          </div>
        ))}
        <h1 className="text-2xl font-bold text-center">Register Account</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("name", {
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
            })}
            placeholder="Username"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.name && <span>{errors.name.message}</span>}

          <input
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email es requerido",
              },
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Email no válido",
              },
            })}
            placeholder="Email"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.email && <span>{errors.email.message}</span>}

          <input
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 6,
                message: "Password must be more than 6 characters",
              },
            })}
            placeholder="Password"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.password && <span>{errors.password.message}</span>}
          <input
            type="password"
            {...register("confirmationPassword", {
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 6,
                message: "Password must be more than 6 characters",
              },
              validate: (value) =>
                value === password.current || "Passwords don't match",
            })}
            placeholder="Confirmation Password"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.confirmationPassword && (
            <span>{errors.confirmationPassword.message}</span>
          )}
          <br />
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Register
          </button>
        </form>
        <p className="flex gap-x-2 justify-between">
          Already Have an Account?
          <Link className="text-sky-500" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;