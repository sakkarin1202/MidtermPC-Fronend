import { Button, Form, Input } from "antd";
import axios from "axios";
import React from "react";
import Swal from "sweetalert2"; 
import { useNavigate } from "react-router-dom"; 

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Signup = () => {
  const navigate = useNavigate(); 

  const onFinish = async (values) => {
    let { confirmPassword, ...payload } = values;
    payload.role = "user";

    if (values.password !== values.confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");
    } else {
      try {
        const res = await axios.post(
          "https://midtermpc-backend.onrender.com/api/v1/auth/signup",
          payload
        );
        console.log("Response:", res);

        Swal.fire({
          title: "Registration successful!",
          text: "Please check your email for confirmation.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/signin");
        });
      } catch (error) {
        console.error("Error:", error);
        console.error("Server response:", error.response?.data);
        Swal.fire(
          "Registration failed!",
          error.response?.data?.message || "Please try again.",
          "error"
        );
      }
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar bg-gradient-to-r from-gray-800 to-gray-500 shadow-lg rounded-lg  p-4">
        <div className="flex-1">
          <a
            href="/"
            className="btn btn-ghost normal-case text-2xl text-lime-500"
          >
            Digital Hub
          </a>
        </div>
      </nav>
      <div className="min-h-screen bg-gradient-to-r from-purple-400 to-blue-500 text-gray-900 flex justify-center">
        {/* Updated gradient background */}
        <div className="max-w-screen-xl m-0 sm:m-10 bg-cyan-50 shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-20 flex flex-col items-center">
              <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
                Create Your Account
              </h1>
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 400 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input
                    placeholder="Enter your username"
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg py-2 px-4 transition duration-300 ease-in-out mx-2"
                  />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input
                    placeholder="Enter your email"
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg py-2 px-4 transition duration-300 ease-in-out mx-2"
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    placeholder="Enter your password"
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg py-2 px-4 transition duration-300 ease-in-out mx-2"
                  />
                </Form.Item>

                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Confirm your password"
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-lg py-2 px-4 transition duration-300 ease-in-out mx-2"
                  />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
                  >
                    Sign Up
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
