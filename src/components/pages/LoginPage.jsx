import { useForm } from "react-hook-form";
import { useAuth } from "../shared/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {

  const { login, handleSubmit, formState: {errors}, register } = useForm()

  const { signin, errors: signInErrors, isAuthenticated } = useAuth();
   const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  })

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md ">
        {signInErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white" key={i}>
            {error}
          </div>
        ))}
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={onSubmit}>
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
          <br />
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Login
          </button>
        </form>
        <p className="flex gap-x-2 justify-between">
          Don't have an account?{" "}
          <Link to="/register" className="text-sky-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage