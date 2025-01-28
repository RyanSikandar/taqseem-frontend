"use client"

import React, { useState } from "react"
import { registerSchema } from "@/schemas/auth.schema"
import type * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Loader2, Upload } from "lucide-react"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import axios from "axios"
import { useRouter } from "next/navigation"

type RegisterFormValues = z.infer<typeof registerSchema>

const TwoStepRegistration = () => {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      cnic: "",
      description: "",
      image: "",
      location: "",
    },
  })

  const isLoading = form.formState.isSubmitting

  const handleImageUpload = async (file: File) => {
    try {
      // Get presigned URL from your backend
      const data = await axios.get(`http://localhost:5000/api/auth/presignedurl?fileType=${file.type}`, {
        withCredentials: false
      })
      console.log(data)
      const presignedUrl = data.data.url
      console.log(presignedUrl)
      // Upload to S3
      const response = await axios.put(presignedUrl, file, {
        headers: { "Content-Type": file.type },
        withCredentials: true,
      })
      console.log(response)

      // Get the public URL
      const publicUrl = presignedUrl.split("?")[0]
      setImageUrl(publicUrl)

      // Set preview
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)

      return publicUrl
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Image Upload Failed",
        description: "There was an error uploading your image. Please try again.",
        variant: "destructive",
      })
      return null
    }
  }

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      // Include the imageUrl in the form data
      const dataToSubmit = { ...values, image: imageUrl }
      console.log(dataToSubmit, imageUrl)

      // Here you would typically send the form data to your backend
      const response = await axios.post("http://localhost:5000/api/auth/register", dataToSubmit, {
        withCredentials: true
      })

      console.log(response.data)
      router.push("/dashboard")
      toast({
        title: "Registration Successful",
        description: "Your account has been created.",
      })
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration Failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      })
    }
  }

  const nextStep = async () => {
    const isValid = await form.trigger(["name", "email", "password", "confirmPassword"])
    if (isValid) {
      setStep(2)
    }
  }

  const prevStep = () => {
    setStep(1)
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-8 bg-gray-50">
      <div className="w-full max-w-2xl space-y-8 rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-center text-3xl font-bold text-gray-800">Register at Taqseem</h1>
        <Progress value={step === 1 ? 50 : 100} className="w-full [&>*]:bg-[#F7AB0A]/80" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="rounded-md border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Enter your name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="rounded-md border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Enter your email"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          disabled={isLoading}
                          className="rounded-md border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          disabled={isLoading}
                          className="rounded-md border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Confirm your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  onClick={nextStep}
                  className="w-full rounded-md bg-black px-4 py-2 text-white hover:bg-[#F7AB0A] focus:outline-none focus:ring-2 focus:bg-[#F7AB0A] focus:ring-offset-2"
                >
                  Next
                </Button>
              </>
            )}
            {step === 2 && (
              <>
                <FormField
                  control={form.control}
                  name="cnic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">CNIC</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="rounded-md border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Enter your CNIC"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Location</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="rounded-md border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Enter your location"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isLoading}
                          className="h-24 rounded-md border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Tell us about yourself"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Profile Image</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-4">
                          <Input
                            type="file"
                            disabled={isLoading}
                            className="hidden"
                            accept="image/*"
                            id="image-upload"
                            onChange={async (e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                const url = await handleImageUpload(file)
                                if (url) onChange(url)
                              }
                            }}
                            {...field}
                          />
                          <label
                            htmlFor="image-upload"
                            className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                          >
                            {imagePreview ? (
                              <Image
                                src={imagePreview || "/placeholder.svg"}
                                alt="Profile preview"
                                width={128}
                                height={128}
                                className="h-full w-full rounded-full object-cover"
                              />
                            ) : (
                              <Upload className="h-8 w-8 text-gray-400" />
                            )}
                          </label>
                          <div className="text-sm text-gray-500">
                            {imagePreview ? "Click to change" : "Click to upload"}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between space-x-4">
                  <Button
                    type="button"
                    onClick={prevStep}
                    className="w-full rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Previous
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </div>
              </>
            )}
          </form>
        </Form>
      </div>
    </div>
  )
}

export default TwoStepRegistration

