"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/AuthContext";

const Login = () => {
  const {
    // username,
    // setUsername,
    // password,
    // setPassword,
    setUser,
    // setIsAuthenticated,
  } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  const router = useRouter(); 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username) {
      username.trim();
      setUser(username);
      // setIsAuthenticated(true);
      // console.log("User authenticated, navigating to home..."); // Debugging
      router.push("/");
      setUsername('')
      setPassword('')
    }
  };

    return (
        <div className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
      
    <div className="text-center p-5 border rounded-xl min-w-[25%] border-gray-500">
    <h1 className="pb-5 text-2xl font-bold text-gray-100">
      Key to the Vault
    </h1>
    <form onSubmit={handleLogin} className=" flex flex-col gap-6">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent border rounded-md py-3 px-2 tracking-wide border-gray-500"
              required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border rounded-md py-3 px-2 tracking-wide border-gray-500"
              required
      />
      <button
        type="submit"
        className=" text-black font-bold tracking-wide border rounded-md py-3 px-2 bg-gray-50 hover:bg-gray-200"
      >
        Login
      </button>
    </form>
  </div>
  </div>
  );
};

export default Login;
