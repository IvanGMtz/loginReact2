import { useForm } from "react-hook-form";

function RegisterPage() {
  
    const { register } = useForm();

  return (
    <div>
      <form>
        <input type="text" name="username" />
        <input type="email" name="email" />
        <input type="password" name="password" />
      </form>
    </div>
  );
}

export default RegisterPage