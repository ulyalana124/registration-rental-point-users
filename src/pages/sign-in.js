import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Navigation from "../components/navigation";

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../utils/firebase/firebase";
import { useRouter } from "next/router";

import GoogleIcon from "../assets/google-logo.png";

const Home = () => {
  const router = useRouter();
  const logGoogleUser = async () => {
    await signInWithGooglePopup();
  };

  const handleLogin = async ({ email, password }) => {
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      router.push("/products");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };
  return (
    <>
      <Navigation />
      <div className="flex justify-center items-center min-h-screen">
        <div className="m-[24px] grid justify-items-center">
          <div className="p-[16px] border border-[#aaa] grid bg-[#fff] drop-shadow-2xl">
            <h2 className="text-[36px] text-center mb-[12px]">Sign In </h2>
            <h3 className="text-[24px] text-[#aaa] font-light text-center mb-[24px]">
              Sign In with your email and password
            </h3>
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Введіть електронну пошту";
                }
                if (!values.password) {
                  errors.password = "Введіть пароль";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                handleLogin(values);
                setSubmitting(false);
              }}
            >
              <Form className="grid gap-y-[12px]">
                <div className="grid">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="border border-[#aaa] px-[16px] py-[8px]"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-[12px] text-red-500"
                  />
                </div>

                <div className="grid">
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    name="password"
                    className="border border-[#aaa] px-[16px] py-[8px]"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-[12px] text-red-500"
                  />
                </div>
                <div className="mt-[24px] grid">
                  <button
                    type="submit"
                    className="bg-green-200 py-[12px] px-[12px]"
                  >
                    Sign In
                  </button>

                  {/* <button
                    type="button"
                    className="bg-white border border-[#aaa] py-[12px] px-[12px] flex items-center gap-x-[8px] justify-center"
                    onClick={logGoogleUser}
                  >
                    <Image
                      src={GoogleIcon}
                      alt=""
                      className="w-[24px] h-[24px]"
                    />
                    Google User
                  </button> */}
                </div>
              </Form>
            </Formik>{" "}
          </div>
          {/* <p className="mt-[16px]">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-purple-600">
              Sign Up
            </Link>
          </p> */}
        </div>
      </div>
    </>
  );
};

export default Home;
