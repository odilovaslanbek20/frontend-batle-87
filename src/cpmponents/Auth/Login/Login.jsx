import axios from "axios";
import { useState } from "react";
import { FaBlog } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function Login() {
  let navigate = useNavigate();
  let [password, setPassword] = useState();
  let [username, setUsername] = useState();
  function LoginFunction() {
    if (!username || !password) {
      toast.error("Please fill all blanks!");
      return;
    }
    axios
      .post("https://nt-shopping-list.onrender.com/api/auth", {
        password: password,
        username: username,
      })
      .then((res) => {
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Login failed!");
      });
  }
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="border-[1px] border-solid border-[#0D6EFD] w-[450px] p-[50px] rounded-[20px] flex justify-center items-center flex-col">
        <FaBlog className="mx-auto text-[70px] text-[#0D6EFD] mb-[50px]" />
        <p className="text-[#212529] text-[20px] font-[600]">Username</p>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Enter your username"
          className="text-[#212529] mt-[10px] mb-[20px] outline-[#0D6EFD] border-[1px] border-solid border-[#0D6EFD] rounded-[10px] w-[300px] text-[15px] p-[5px]"
        />
        <p className="text-[#212529] text-[20px] font-[600]">Password</p>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password"
          className="text-[#212529] mt-[10px] mb-[20px] outline-[#0D6EFD] border-[1px] border-solid border-[#0D6EFD] rounded-[10px] w-[300px] text-[15px] p-[5px]"
        />
        <button
          onClick={() => LoginFunction()}
          className="w-[300px] bg-[#0D6EFD] p-[5px] text-white text-[20px] font-[600] rounded-[10px] mb-[20px]"
        >
          Sign In
        </button>
        <p className="text-[#212529] text-[17px]">{`Don't have an account?`}</p>
        <Link className="text-[#0D6EFD] font-[500] underline" to="register">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
