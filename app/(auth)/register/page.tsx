"use client";
import React from "react";
import { registerSchema } from "@/schemas/auth.schema";
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
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      confirmPassword: "",
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleSubmit = async (values: z.infer<typeof registerSchema>) => {
    console.log(values);
  };

  return (
    <div className="flex h-[500px] w-[500px] flex-col items-center justify-center space-y-4  shadow-xl">
      <h1 className="text-2xl font-bold">Register</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col items-center justify-center space-y-4"
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
                  <Input
                    disabled={isLoading}
                    className="border-0 bg-zinc-200/60 ring-offset-0 focus-visible:ring-0 dark:bg-input"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase dark:text-primary ">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className="border-0 bg-zinc-200/60 ring-offset-0 focus-visible:ring-0 dark:bg-input"
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
                <FormLabel className="text-xs uppercase dark:text-primary ">
                  password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled={isLoading}
                    className="border-0 bg-zinc-200/60  ring-offset-0 
                                    focus-visible:ring-0 dark:bg-input"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase dark:text-primary ">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled={isLoading}
                    className="border-0 bg-zinc-200/60  ring-offset-0 
                                    focus-visible:ring-0 dark:bg-input"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            variant="default"
            size="lg"
            className=" mt-2 rounded-[3px] bg-black px-4 py-0.5 text-white"
            type="submit"
          >
            {isLoading ? (
              <div className="flex gap-2">Loading...</div>
            ) : (
              "Sign up"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;
