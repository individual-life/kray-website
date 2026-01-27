"use client";

import { poppins } from "@/app/fonts";
import Image from "next/image";
import SignInThirdParty from "@/components/common/SignInThirdParty";
import { ShowIcon } from "@/public/icons/ShowIcon";
import { HideIcon } from "@/public/icons/HideIcon";
import { useState, ChangeEvent } from "react";
import Button from "../common/Button";

const LoginSection = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = () => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLengthValid = password.length >= 8;

    if (!isLengthValid) {
      setPasswordError("Password must be at least 8 characters long.");
    } else if (!hasUpperCase) {
      setPasswordError("Password must contain at least one uppercase letter.");
    } else if (!hasLowerCase) {
      setPasswordError("Password must contain at least one lowercase letter.");
    } else if (!hasNumber) {
      setPasswordError("Password must contain at least one number.");
    } else if (!hasSpecialChar) {
      setPasswordError("Password must contain at least one special character.");
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError("");
  };

  return (
    <div className="h-[calc(100vh-60px)] grid grid-cols-12 px-[9vw] gap-x-5">
      <div className="col-span-8 mb-[50px] mt-[30px] bg-[rgba(0,0,0,0.1)] rounded-[20px] relative flex flex-col justify-center items-center"></div>
      <div className=" col-span-4  mb-[50px] mt-[30px] rounded-[20px] relative p-[20px] flex flex-col justify-center ">
        <div>
          <h1 className={`${poppins.className} text-[19px] font-medium`}>
            Register or login
          </h1>
          <p
            className={`text-(--color-grey) text-[14px] w-[80%] font-normal mt-[10px]`}
          >
            To keep things easy, just log in with your email or hit that button
            below to create an account.
          </p>
        </div>
        <div className="mt-[30px]">
          <SignInThirdParty
            icon="/icons/google.png"
            title="Sign in with Google"
          />
        </div>
        <div className="flex items-center gap-x-[10px] my-[20px]">
          <div className="w-full h-px bg-[rgba(0,0,0,0.1)]"></div>
          <span className="text-(--color-grey) text-[14px] font-normal">
            or
          </span>
          <div className="w-full h-px bg-[rgba(0,0,0,0.1)]"></div>
        </div>
        <div>
          <div>
            <label htmlFor="email" className={` text-[14px] font-normal`}>
              Email <span className="text-(--color-orange)">*</span>
            </label>
            <div className="w-full mt-[5px] h-[45px] border border-[rgba(0,0,0,0.1)] rounded-[10px] px-[15px]">
              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                className="w-full h-full outline-none border-none text-[14px]"
              />
            </div>
          </div>
          <div className="mt-[20px]">
            <label htmlFor="password" className={` text-[14px] font-normal`}>
              Password <span className="text-(--color-orange)">*</span>
            </label>
            <div
              className={`w-full mt-[5px] h-[45px] border ${passwordError ? "border-red-500" : "border-[rgba(0,0,0,0.1)]"} rounded-[10px] pl-[15px] flex transition-colors duration-200`}
            >
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder=""
                className="w-full h-full outline-none border-none text-[14px]"
                value={password}
                onChange={handlePasswordChange}
                onBlur={validatePassword}
              />
              <div
                className="cursor-pointer flex justify-center items-center pr-[15px]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <ShowIcon size={20} /> : <HideIcon size={20} />}
              </div>
            </div>
            {passwordError && (
              <p className="text-red-500 text-[12px] mt-[5px] font-normal">
                {passwordError}
              </p>
            )}
            <p className="text-[14px] font-normal mt-[5px] text-end cursor-pointer text-(--color-orange)">
              Forgot Password?
            </p>
          </div>
        </div>
        <div className="mt-[20px] flex justify-between items-center">
          <div className="">
            <p className="text-[14px] font-medium">Keep me updated</p>
            <p className="text-[13px] text-(--color-grey) mt-[2px] leading-[18px] w-[90%]">
              Get occasional insights, new features, and tips delivered to your
              inbox.
            </p>
          </div>
          <div
            className="cursor-pointer select-none flex justify-between "
            onClick={() => setNewsletter(!newsletter)}
          >
            <div
              className={`mt-[5px] w-[35px] h-[20px] rounded-[20px] p-[2px] cursor-pointer transition-all duration-300 ${newsletter ? "bg-(--color-orange)" : "bg-[rgba(0,0,0,0.1)]"}`}
              onClick={() => setNewsletter(!newsletter)}
            >
              <div
                className={`w-[16px] h-[16px] bg-white rounded-full shadow-sm transform transition-all duration-300 ${newsletter ? "translate-x-[15px]" : "translate-x-0"}`}
              ></div>
            </div>
          </div>
        </div>
        <div className="mt-[40px]">
          <Button title="Sign In" />
        </div>
        <div className="mt-[40px]">
          <p className="text-[14px] font-normal">
            Not signed up yet?{" "}
            <span className="text-(--color-orange) cursor-pointer">
              Register
            </span>
          </p>
        </div>
        <div className="h-[20px]"></div>
      </div>
    </div>
  );
};

export default LoginSection;
