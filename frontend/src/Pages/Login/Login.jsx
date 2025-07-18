import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  return (
    <div className="relative min-h-[92vh] flex flex-col justify-center items-center">

      <div className="h-[250px] flex flex-col justify-between p-5 bg-bgd border border-line rounded-[10px] z-[999]">
        <h1 className="text-[50px] text-txt font-oswald text-center">LOGIN</h1>

        <div className="flex justify-center">
          <button
            onClick={handleGoogleLogin}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`flex items-center gap-2 font-montserrat border-none px-5 py-2 rounded transition-all duration-500 ${
              isHovered
                ? "bg-txt text-rd"
                : "bg-rd text-txt"
            }`}
          >
            <FaGoogle /> Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
