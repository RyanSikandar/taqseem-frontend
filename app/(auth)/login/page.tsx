"use client";
import React from "react";
import { loginSchema } from "@/schemas/auth.schema";
import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
const Page = () => {
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
    <div className="flex h-[500px] w-full flex-col space-y-6">
      <div className="flex flex-col justify-center items-center">
        <h1 className=" text-2xl font-normal">Login</h1>
        <a>Welcome back! Please enter your details.</a>
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
                  <Input disabled={isLoading} className="" {...field} />
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
                    className=""
                    {...field}
                  />
                </FormControl>
                <div className="flex justify-end mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  <a
                    href="#"
                    className="text-neutral-800 underline dark:text-neutral-300"
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
          className=" mt-2 text-xl rounded-[6px] border-2 border-[#F7AB0A] bg-white px-4 py-6 text-[#F7AB0A]"
          type="submit"
        >
          {isLoading ? (
            <div className="flex gap-2">Loading...</div>
          ) : (
            "Continue as Guest"
          )}
        </Button>

        <a className="flex justify-center item-center">or</a>

        <Button
          variant="default"
          size="lg"
          className=" mt-2 text-lg rounded-[6px] border-2 border-black bg-white px-4 py-6 text-black"
          type="submit"
        >
          {isLoading ? (
            <div className="flex gap-2">Loading...</div>
          ) : (
            "Continue with Google"
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
            "Continue with apple"
          )}
        </Button>      
      </Form>
      <div className="flex justify-center items-center mt-6">
      <a className="text-sm text-neutral-500 dark:text-neutral-400">
        Don't have an account? <span className="text-[#F7AB0A]"> Sign up </span>
      </a>
    </div>
    </div>
  );
};

export default Page;
