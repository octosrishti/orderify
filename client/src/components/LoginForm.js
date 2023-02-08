import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setIsLogin}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  //APi and routing login

  const handleCustomLogin = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) throw Error("Missing required fields");
      fetch('https://orderify.onrender.com/login',{
        method: 'POST',
        headers:{
          "content-type":"application/json",
          },
        body:JSON.stringify({email,password})
      }).then(res=>res.json())
      .then(data=>{
        localStorage.setItem("userInfo",JSON.stringify(data))
        navigate('/')
      })
      .catch(err=>{
        console.log(err)
      })
      
    } catch (error) {
      console.log(`${error.message}`.replace("Firebase: ", ""));
      setError(`${error.message}`.replace("Firebase: ", ""));
    }
  };

  const handleCloseError = (e) => {
    e.preventDefault();
    setError("");
  };



  return (
    <div className="w-full sm:w-2/3 md:w-2/3 lg:w-1/3 mx-auto mt-4">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg  w-full p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#">
          
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Login
        </h3>

          {error && (
            <div>
              <div className="w-fill bg-red-300 flex p-3 pl-3 bg-gray-100  rounded-lg">
                <button
                  onClick={handleCloseError}
                  className="hover:bg-red-400 rounded"
                >
                  X
                </button>
                <span
                  className="ml-2 truncate"
                  title="Test with a very really long name (resize the browser to see it truncate)"
                >
                  {error}
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-wrap  w-full  relative h-15 bg-gray-50 border border-gray-300 items-center rounded mb-4">
            <div className="flex -mr-px justify-center w-15 p-4">
              <span className="flex items-center leading-normal bg-gray-50 px-3 border-0 rounded rounded-r-none text-2xl text-gray-600">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
            <input
              type="email"
              className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 bg-gray-50 border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap  w-full  relative h-15 bg-gray-50 border border-gray-300 items-center rounded mb-4">
            <div className="flex -mr-px justify-center w-15 p-4">
              <span className="flex items-center leading-normal bg-gray-50 px-3 border-0 rounded rounded-r-none text-2xl text-gray-600">
                <i className="fas fa-lock"></i>
              </span>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 bg-gray-50 border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-xl outline-none"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex -mr-px1">
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="flex items-center leading-normal bg-gray-50 rounded rounded-l-none border-0 px-3 whitespace-no-wrap text-gray-600"
              >
                <i
                  className={`fas  ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                ></i>
              </span>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  required=""
                />
              </div>
              <div className="text-sm ml-3">
                <label
                  for="remember"
                  className="font-medium text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={handleCustomLogin}
            className="w-full text-white text-lg bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login to your account
          </button>

          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsLogin(false);
              }}
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;