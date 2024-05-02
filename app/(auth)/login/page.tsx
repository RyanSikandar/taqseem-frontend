"use client";
import React from "react";
import { loginSchema } from "@/schemas/auth.schema";
import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Cursor, useTypewriter } from 'react-simple-typewriter'
import { FaApple } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
const Page = () => {
  const [text, count] = useTypewriter({ words: ["Hi, We missed you.", "Please Login to spread happiness !"], loop: true, delaySpeed: 2000 })
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
    console.log(values);
  };

  return (
    <div className="flex h-full w-full flex-col space-y-6">

      <div className="flex justify-center items-center">
        <Image
          src="/assets/icons/Taqseem.svg"
          alt="icon"
          width={150}
          height={150}
          style={{ objectFit: "contain" }}
        />
      </div>


      <div className="flex flex-col justify-center items-center">
        <h1 className=" text-2xl font-semibold mb-2 tracking-[2px]">Login</h1>
        <div>
          <span className="">{text}</span>
          <Cursor cursorColor='black' />
        </div>

      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col space-y-4 "
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase dark:text-primary ">
                  Email
                </FormLabel>
                <FormControl>
                  <Input disabled={isLoading} className="border-b-2 border-gray-300 focus:border-black outline-none rounded-lg w" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase dark:text-primary ">
                  password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled={isLoading}
                    className="border-b-2 border-gray-300 focus:border-black outline-none rounded-lg"
                    {...field}
                  />
                </FormControl>
                <div className="flex justify-end mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  <a
                    href="#"
                    className="text-neutral-800 underline dark:text-neutral-300 mt-2"
                  >
                    Forgot password?
                  </a>
                </div>
              </FormItem>
            )}
          />
          <Button
            variant="default"
            size="lg"
            className="font-satoshi mt-2 text-xl rounded-[6px] bg-black px-4 py-6 text-white"
            type="submit"
          >
            {isLoading ? (
              <div className="flex gap-2">Loading...</div>
            ) : (
              "Log In"
            )}
          </Button>
        </form>
        <Button
          variant="default"
          size="lg"
          className=" mt-2 text-xl rounded-[6px] border-2 border-[#F7AB0A] bg-white px-4 py-6 text-[#F7AB0A]
          hover:bg-[#F7AB0A]/80 hover:text-white transition-all duration-300 ease-in-out"
          type="submit"
        >
          {isLoading ? (
            <div className="flex gap-2">Loading...</div>
          ) : (
            "Continue as Guest"
          )}
        </Button>

        <p className="flex justify-center item-cente">or</p>

        <Button
          variant="default"
          size="lg"
          className=" mt-2 text-lg rounded-[6px] border-2 border-black bg-white px-4 py-6 text-black"
          type="submit"
        >
          {isLoading ? (
            <div className="flex gap-2">Loading...</div>
          ) : (
            <div className="flex ">Continue with<span className="ml-1 items-center justify-center"><FaGoogle size={24} /></span>
            </div>
          )}
        </Button>

        <Button
          variant="default"
          size="lg"
          className=" mt-2 text-lg rounded-[6px] border-2 border-black bg-white px-4 py-6 text-black"
          type="submit"
        >
          {isLoading ? (
            <div className="flex gap-2">Loading...</div>
          ) : (
            <div className="flex">Continue with<span className="ml-1 items-center justify-center"><FaApple size={25} /></span>
            </div>)}
        </Button>
      </Form>
      <div className="flex justify-center items-center mt-6">
        <a className="text-sm text-neutral-500 dark:text-neutral-400">
          Don't have an account? <span className="text-[#F7AB0A] underline hover:cursor-pointer"> Sign up </span>
        </a>
      </div>
    </div>
  );
};

export default Page;
