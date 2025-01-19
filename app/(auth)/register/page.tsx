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
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-8">
      <div className="w-full max-w-[320px] space-y-6 rounded-lg bg-white p-6 shadow-xl sm:max-w-[400px] md:max-w-[500px] md:p-8 lg:p-10">
        <h1 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">Register</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 md:space-y-6"
          >
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
                      className="h-10 border-0 bg-zinc-200/60 ring-offset-0 focus-visible:ring-0 dark:bg-input md:h-12"
                      placeholder="Enter your email"
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
                  <FormLabel className="text-xs uppercase dark:text-primary md:text-sm">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="h-10 border-0 bg-zinc-200/60 ring-offset-0 focus-visible:ring-0 dark:bg-input md:h-12"
                      placeholder="Enter your name"
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
                      className="h-10 border-0 bg-zinc-200/60 ring-offset-0 focus-visible:ring-0 dark:bg-input md:h-12"
                      placeholder="Enter your password"
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
                  <FormLabel className="text-xs uppercase dark:text-primary md:text-sm">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={isLoading}
                      className="h-10 border-0 bg-zinc-200/60 ring-offset-0 focus-visible:ring-0 dark:bg-input md:h-12"
                      placeholder="Confirm your password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              variant="default"
              size="lg"
              className="mt-6 w-full rounded-[3px] bg-black px-4 py-2 text-sm font-medium text-white transition-all hover:bg-black/90 md:py-3 md:text-base"
              type="submit"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">Loading...</div>
              ) : (
                "Sign up"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;