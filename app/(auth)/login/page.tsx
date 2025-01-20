"use client"
import React from "react"
import { loginSchema } from "@/schemas/auth.schema"
import type * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Cursor, useTypewriter } from "react-simple-typewriter"
import { FaApple, FaGoogle } from "react-icons/fa"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import Link from "next/link"

const Login = () => {
  const [text] = useTypewriter({
    words: ["Hi, We missed you.", "Please Login to spread happiness !"],
    loop: true,
    delaySpeed: 2000,
  })

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const isLoading = form.formState.isSubmitting

  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
    console.log(values)
  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <div className="w-full max-w-[320px] space-y-4 sm:max-w-[400px]">
        <div className="flex justify-center">
          <Image
            src="/assets/icons/Taqseem.svg"
            alt="icon"
            width={100}
            height={100}
            className="h-auto w-[80px] sm:w-[100px]"
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="text-center">
          <h1 className="mb-2 text-lg font-semibold tracking-[6px] sm:text-xl sm:tracking-[8px]">Login</h1>
          <div className="h-6 text-xs sm:text-sm">
            <span>{text}</span>
            <Cursor cursorColor="black" />
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase dark:text-primary">Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="h-8 border-b-2 border-gray-300 bg-[#EEEEEE] text-sm outline-none focus:border-black sm:h-10"
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
                  <FormLabel className="text-xs uppercase dark:text-primary">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={isLoading}
                      className="h-8 border-b-2 border-gray-300 bg-[#EEEEEE] text-sm outline-none focus:border-black sm:h-10"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <div className="mt-1 flex justify-end">
                    <a
                      href="#"
                      className="text-xs text-neutral-800 underline hover:text-neutral-600 dark:text-neutral-300"
                    >
                      Forgot password?
                    </a>
                  </div>
                </FormItem>
              )}
            />

            <div className="space-y-2 pt-2">
              <Button
                variant="default"
                size="sm"
                className="w-full rounded-[6px] bg-black px-4 py-2 text-sm font-medium text-white transition-all hover:bg-black/90 sm:py-3 sm:text-base"
                type="submit"
              >
                {isLoading ? "Loading..." : "Log In"}
              </Button>

              <Button
                variant="default"
                size="sm"
                className="w-full rounded-[6px] border-2 border-[#F7AB0A] bg-white px-4 py-2 text-sm font-medium text-[#F7AB0A] transition-all duration-300 ease-in-out hover:bg-[#F7AB0A]/80 hover:text-white sm:py-3 sm:text-base"
                type="submit"
              >
                {isLoading ? "Loading..." : "Continue as Donor"}
              </Button>
            </div>
          </form>

          <div className="my-3 flex items-center">
            <span className="h-px flex-1 bg-black"></span>
            <span className="mx-2 text-xs sm:text-sm">or</span>
            <span className="h-px flex-1 bg-black"></span>
          </div>

          <div className="space-y-2">
            <Button
              variant="default"
              size="sm"
              className="w-full rounded-[6px] border-2 border-black bg-white px-4 py-2 text-xs text-black transition-all hover:bg-black hover:text-white sm:py-3 sm:text-sm"
              type="submit"
            >
              {isLoading ? (
                "Loading..."
              ) : (
                <div className="flex items-center justify-center">
                  Continue with
                  <FaGoogle className="ml-2" size={16} />
                </div>
              )}
            </Button>

            <Button
              variant="default"
              size="sm"
              className="w-full rounded-[6px] border-2 border-black bg-white px-4 py-2 text-xs text-black transition-all hover:bg-black hover:text-white sm:py-3 sm:text-sm"
              type="submit"
            >
              {isLoading ? (
                "Loading..."
              ) : (
                <div className="flex items-center justify-center">
                  Continue with
                  <FaApple className="ml-2" size={18} />
                </div>
              )}
            </Button>
          </div>
        </Form>

        <div className="text-center">
          <Link
            href="/register"
            className="text-xs text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 sm:text-sm"
          >
            Don't have an account?
            <span className="text-[#F7AB0A] underline hover:text-[#F7AB0A]/80"> Sign up </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login

