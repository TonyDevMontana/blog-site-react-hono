import { useState } from "react";
import { LabelledInput } from "../components/LabelledInput";
import { signupType } from "@repo/common";
import { Link, useNavigate } from "react-router-dom";
import { Quote } from "../components/Quote";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Signup() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState<signupType>({
    username: "",
    email: "",
    password: "",
  });

  const sendRequest = async () => {
    try {
      await axios.post(`${BACKEND_URL}/api/user/signup`, userInput);
      alert("User created! Now please sign in");
      navigate("/signin");
    } catch (e) {
      alert("Error while signing up try again");
    }
  };

  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col h-screen justify-center">
        <div className="flex justify-center">
          <div className="p-4">
            <div className="px-20 mb-4">
              <div>
                <div className="text-3xl font-extrabold mb-2">
                  <div className="flex justify-center">Create an account</div>
                </div>
                <div className="text-slate-500">
                  Already have an account?{" "}
                  <Link className="underline mb-4" to="/signin">
                    Signin
                  </Link>
                </div>
              </div>
            </div>

            <LabelledInput
              type="text"
              placeholder="UserABC"
              label="Username:"
              onChange={(e) => {
                setUserInput({ ...userInput, username: e.target.value });
              }}
            ></LabelledInput>

            <LabelledInput
              type="text"
              placeholder="username@gmail.com"
              label="Email:"
              onChange={(e) => {
                setUserInput({ ...userInput, email: e.target.value });
              }}
            ></LabelledInput>

            <LabelledInput
              type="password"
              placeholder="********"
              label="Password:"
              onChange={(e) => {
                setUserInput({ ...userInput, password: e.target.value });
              }}
            ></LabelledInput>

            <div className="flex justify-center">
              <button
                onClick={sendRequest}
                type="button"
                className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Quote />
      </div>
    </div>
  );
}
