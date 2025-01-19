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
import Link from "next/link";

const Login = () => {
  const [text, count] = useTypewriter({ 
    words: ["Hi, We missed you.", "Please Login to spread happiness !"], 
    loop: true, 
    delaySpeed: 2000 
  });

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
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-8">
      <div className="w-full max-w-[320px] space-y-6 sm:max-w-[400px] md:max-w-[500px]">
        <div className="flex justify-center">
          <Image
            src="/assets/icons/Taqseem.svg"
            alt="icon"
            width={150}
            height={150}
            className="h-auto w-[100px] sm:w-[125px] md:w-[150px]"
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="text-center">
          <h1 className="mb-4 text-xl font-semibold tracking-[8px] sm:text-2xl md:tracking-[10px]">
            Login
          </h1>
          <div className="min-h-[32px] text-sm sm:text-base md:text-lg">
            <span>{text}</span>
            <Cursor cursorColor='black' />
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase dark:text-primary md:text-sm">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input 
                      disabled={isLoading} 
                      className="h-10 border-b-2 border-gray-300 bg-[#EEEEEE] outline-none focus:border-black md:h-12" 
                      placeholder="Enter your email"
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase dark:text-primary md:text-sm">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={isLoading}
                      className="h-10 border-b-2 border-gray-300 bg-[#EEEEEE] outline-none focus:border-black md:h-12"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <div className="mt-1 flex justify-end">
                    <a href="#" className="text-xs text-neutral-800 underline hover:text-neutral-600 dark:text-neutral-300 sm:text-sm">
                      Forgot password?
                    </a>
                  </div>
                </FormItem>
              )}
            />
            
            <div className="space-y-3 pt-2">
              <Button
                variant="default"
                size="lg"
                className="w-full rounded-[6px] bg-black px-4 py-5 text-lg font-medium text-white transition-all hover:bg-black/90 sm:py-6 sm:text-xl"
                type="submit"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">Loading...</div>
                ) : (
                  "Log In"
                )}
              </Button>

              <Button
                variant="default"
                size="lg"
                className="w-full rounded-[6px] border-2 border-[#F7AB0A] bg-white px-4 py-5 text-lg font-medium text-[#F7AB0A] transition-all duration-300 ease-in-out hover:bg-[#F7AB0A]/80 hover:text-white sm:py-6 sm:text-xl"
                type="submit"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">Loading...</div>
                ) : (
                  "Continue as Donor"
                )}
              </Button>
            </div>
          </form>

          <div className="my-6 flex items-center">
            <span className="h-px flex-1 bg-black"></span>
            <span className="mx-4 text-sm sm:text-base">or</span>
            <span className="h-px flex-1 bg-black"></span>
          </div>

          <div className="space-y-3">
            <Button
              variant="default"
              size="lg"
              className="w-full rounded-[6px] border-2 border-black bg-white px-4 py-5 text-base text-black transition-all hover:bg-black hover:text-white sm:py-6 sm:text-lg"
              type="submit"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">Loading...</div>
              ) : (
                <div className="flex items-center justify-center">
                  Continue with<FaGoogle className="ml-2" size={20} />
                </div>
              )}
            </Button>

            <Button
              variant="default"
              size="lg"
              className="w-full rounded-[6px] border-2 border-black bg-white px-4 py-5 text-base text-black transition-all hover:bg-black hover:text-white sm:py-6 sm:text-lg"
              type="submit"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">Loading...</div>
              ) : (
                <div className="flex items-center justify-center">
                  Continue with<FaApple className="ml-2" size={22} />
                </div>
              )}
            </Button>
          </div>
        </Form>

        <div className="text-center">
          <Link 
            href="/register" 
            className="text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 sm:text-base"
          >
            Don't have an account? 
            <span className="text-[#F7AB0A] underline hover:text-[#F7AB0A]/80"> Sign up </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;