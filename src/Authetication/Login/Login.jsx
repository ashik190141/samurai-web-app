import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../../utils/userLogin';
import Swal from "sweetalert2";

const Login = () => {
    const [show, setShow] = useState(false);
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const handleLogin = async(data) => {
        setShow(true);
        try{
            const res = await userLogin(data);
            console.log(res);
            if(res.success){
                setShow(false);
                localStorage.setItem("email",res?.email)
                Swal.fire({
                  title: "Logged in Successful",
                  confirmButtonText: "OK",
                }).then((result) => {
                  if (result.isConfirmed) {
                    navigate('/dashboard')
                  }
                });
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
      <div>
        <div
          className="hero min-h-screen font-family"
          style={{
            backgroundImage: `url("https://media.istockphoto.com/id/1398434616/photo/grocery-online-shopping.jpg?s=2048x2048&w=is&k=20&c=fUx3FIFt96Wvm1DK4fKkby7MCYiZ5AhUVCa4rFw2URw=")`,
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center">
            <div className="w-auto md:w-[350px] lg:w-[500px]">
              <div className="card flex-shrink-0 w-full shadow-2xl">
                <div className="card-body">
                  <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="pb-8">
                      <input
                        type="text"
                        id="email"
                        {...register("email", { required: true })}
                        placeholder="Email"
                        className="p-2 border-b-2 border-black bg-transparent w-full text-white"
                      />
                    </div>
                    <div className="pb-8">
                      <input
                        type="password"
                        id="password"
                        {...register("password", { required: true })}
                        placeholder="Password"
                        className="text-white p-2 border-b-2 border-black bg-transparent w-full"
                      />
                    </div>
                    <div>
                      {!show && (
                        <input
                          type="submit"
                          value="LOGIN"
                          className="btn text-lg text-white bg-gradient-to-r from-purple-500 to-pink-500 w-full"
                        />
                      )}
                      <div
                        className={`text-center ${
                          show ? "block" : "hidden"
                        } mt-3`}
                      >
                        <span className="loading loading-spinner w-[50px] text-warning text-center"></span>
                      </div>
                    </div>
                  </form>
                  <div className="grid grid-cols-2 mt-5">
                    <p className="text-left text-lg text-white font-normal">
                      New?
                    </p>
                    <Link to="/register">
                      <p className="text-right text-lg text-white font-normal link link-hover">
                        Go to Register
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Login;