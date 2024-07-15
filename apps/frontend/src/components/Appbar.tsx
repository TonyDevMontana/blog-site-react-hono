import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";

export const Appbar = () => {
  const [logIn, setLogIn] = useState(false);
  const [username, setUsername] = useState("U");
  // const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/user/check`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setLogIn(res.data.permitted);
        setUsername(res.data.username);
        // setIsLoading(false);
      });
  }, []);

  return (
    <div className="p-4 border-b">
      <div className="flex justify-between items-center">
        <div>
          <Link to="/">Nocturnal NoteBook</Link>
        </div>
        {logIn ? (
          <div className="flex justify-center items-center">
            {location.pathname !== "/publish" && (
              <div>
                <Link
                  to="/publish"
                  className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-4"
                >
                  New
                </Link>
              </div>
            )}
            <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full">
              {username.substring(0, 1)}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 my-2">
            <div>
              <Link
                to="/signin"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
              >
                SignIn
              </Link>
            </div>
            <div>
              <Link
                to="/signup"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
              >
                SignUp
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
