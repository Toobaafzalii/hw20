"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { record, z } from "zod";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";

interface IAuthFormProps {
  title: string;
}

interface IFormValues {
  email: string;
  password: string;
}

const checkoutSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be longer than 8")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,16}$/,
      "Password is not strong enough"
    ),
});

export default function AuthForm(props: IAuthFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: IFormValues) => {
    try {
      const pb = new PocketBase("https://tooba-todo.pockethost.io");
      if (props.title == "SignUp") {
        const newUserData = {
          email: data.email,
          emailVisibility: true,
          password: data.password,
          passwordConfirm: data.password,
        };
        const record = await pb.collection("users").create(newUserData);
      }
      const authData = await pb
        .collection("users")
        .authWithPassword(data.email, data.password);
      router.push("/todos");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center border-2 rounded-xl p-10 ">
      <form
        className="w-full flex flex-col justify-between items-start gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="flex self-center text-3xl font-extrabold">
          {props.title}
        </h2>
        <div className="w-full px-6 space-y-3">
          <label htmlFor="email" className="text-xl font-bold ">
            EMAIL
          </label>
          <br />
          <input
            type="text"
            id="email"
            {...register("email")}
            className="w-full py-2 px-3 rounded-lg text-lg border-2 "
            placeholder="Inter Your Email"
          />
          {errors.email?.message && (
            <p className="text-red-700 text-md font-medium ">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="w-full px-6 space-y-3">
          <label htmlFor="password" className="text-xl font-bold ">
            PASSWORD
          </label>
          <br />
          <input
            type="password"
            id="password"
            {...register("password")}
            className="w-full py-2 px-3 rounded-lg text-lg border-2 "
            placeholder="Inter Your Password"
          />
          {errors.password?.message && (
            <p className="text-red-700 text-md font-medium">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="w-full px-6">
          <button
            disabled={!isValid}
            className={`w-full font-bold py-2 px-4 rounded mt-4 shadow-md ${
              isValid
                ? "bg-sky-600 hover:bg-sky-500 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            SUBMIT
          </button>
        </div>
        <a
          href={props.title == "LogIn" ? "signup" : "login"}
          className="flex self-center font-semibold text-sky-800 underline"
        >
          <p>{props.title == "LogIn" ? "SignUp" : "LogIn"}</p>
        </a>
      </form>
    </div>
  );
}
