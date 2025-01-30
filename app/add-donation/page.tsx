"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Upload, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { useMutation } from "@tanstack/react-query"
import { toast } from "@/hooks/use-toast"
interface FormData {
  title: string
  description: string
  cause: string
  donationUsage: string
  targetAmount: number
  daysLeft: number
  location: string
  IBAN: string
  BankName: string
  AccountTitle: string
  image: string[]
}

const getPresignedUrl = async (fileName: string, fileType: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/presignedurl?fileType=${fileType}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include'
  })

  if (!response.ok) {
    throw new Error("Failed to get presigned URL")
  }

  return response.json()
}

const uploadFileToS3 = async (file: File, url: string, index: number) => {
  const response = await fetch(url, {
    method: "PUT",
    credentials: 'include',
    body: file,
  })

  if (!response.ok) {
    throw new Error(`Failed to upload file at index ${index}`)
  }

  console.log(response)
  // Return the public URL of the uploaded file
  return url.split("?")[0]
}

const addDonation = async (data: FormData) => {
  console.log("Data", data)
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/donation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  })
  if (!response.ok) {
    throw new Error("Failed to add donation")
  }
  return response.json()
}

export default function RaiseCause() {
  const [images, setImages] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [uploadProgress, setUploadProgress] = useState<number[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])

  const verifyMutation = useMutation({
    mutationFn: addDonation,
    onSuccess: () => {
      // Invalidate and refetch the donations query after successful verification
      // queryClient.invalidateQueries({ queryKey: ["donations", id] });
      toast({
        title: "Donation added successfully!",
      })
    },
    onError: (err: any) => {
      toast({
        title: "Error adding donation",
        description: err.message,
        variant: "destructive",
      })
    },
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>()

  const causeValue = watch("cause")

  const onSubmit = (data: FormData) => {
    if (images.length === 0) {
      alert("Please upload at least one image")
      return
    }

    // Include image URLs in the form data
    const formDataWithImages = {
      ...data,
      imageUrls,
    }

    console.log("Form data:", formDataWithImages)
    verifyMutation.mutate(formDataWithImages)
    reset()
    setImages([])
    setPreviews([])
    setUploadProgress([])
    setImageUrls([])
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImages((prev) => [...prev, ...files])

    // Create preview URLs
    const newPreviews = files.map((file) => URL.createObjectURL(file))
    setPreviews((prev) => [...prev, ...newPreviews])

    // Initialize progress for new uploads
    setUploadProgress((prev) => [...prev, ...new Array(files.length).fill(0)])

    // Upload each file
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      try {
        const { url } = await getPresignedUrl(file.name, file.type)
        console.log("Presigned URL", url)
        const publicUrl = await uploadFileToS3(file, url, images.length + i)
        setImageUrls((prev) => [...prev, publicUrl])
        setUploadProgress((prev) => {
          const copy = [...prev]
          copy[images.length + i] = 100
          return copy
        })
        toast({
          title: "Success",
          description: `${file.name} uploaded successfully`,
        })
      } catch (error) {
        console.error("Error uploading file:", error)
        toast({
          title: "Error",
          description: `Failed to upload ${file.name}`,
          variant: "destructive",
        })
      }
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    setImages((prev) => [...prev, ...files])

    // Create preview URLs
    const newPreviews = files.map((file) => URL.createObjectURL(file))
    setPreviews((prev) => [...prev, ...newPreviews])

    // Initialize progress for new uploads
    setUploadProgress((prev) => [...prev, ...new Array(files.length).fill(0)])

    // Upload each file
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      try {
        const { url } = await getPresignedUrl(file.name, file.type)
        const publicUrl = await uploadFileToS3(file, url, images.length + i)
        setImageUrls((prev) => [...prev, publicUrl])
        toast({
          title: "Success",
          description: `${file.name} uploaded successfully`,
        })
      } catch (error) {
        console.error("Error uploading file:", error)
        toast({
          title: "Error",
          description: `Failed to upload ${file.name}`,
          variant: "destructive",
        })
      }
    }
  }

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previews[index])
    setImages((prev) => prev.filter((_, i) => i !== index))
    setPreviews((prev) => prev.filter((_, i) => i !== index))
    setUploadProgress((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10 mt-10">
      <div className="max-w-4xl mx-auto">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Raise Cause</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Image Upload Area */}
            <div
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-[#F7AB0A] transition-colors"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <label htmlFor="images" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">
                  Drag and drop your cause images/documents here, or click to select files
                </p>
              </label>
            </div>

            {/* Image Previews */}
            {previews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {previews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square relative rounded-lg overflow-hidden">
                      <Image
                        src={preview || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      {uploadProgress[index] < 100 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <p className="text-white">{uploadProgress[index]}%</p>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Title Input */}
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                placeholder="e.g., Need donation for school renovation"
                {...register("title", { required: true })}
              />
              {errors.title && <p className="text-sm text-red-500">Title is required</p>}
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                placeholder="Write detailed description about the cause"
                className="min-h-[150px]"
                {...register("description", { required: true })}
              />
              {errors.description && <p className="text-sm text-red-500">Description is required</p>}
            </div>

            {/* Cause Select */}
            <div className="space-y-2">
              <label htmlFor="cause" className="text-sm font-medium">
                Cause
              </label>
              <Select
                {...register("cause", { required: "Please select a cause" })}
                value={causeValue}
                onValueChange={(value) => setValue("cause", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select the cause" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="environment">Environment</SelectItem>
                  <SelectItem value="community">Community Development</SelectItem>
                  <SelectItem value="welfare">Welfare</SelectItem>
                </SelectContent>
              </Select>
              {errors.cause && <p className="text-sm text-red-500">{errors.cause.message}</p>}
            </div>
            {/* Donation Usage Input */}
            <div className="space-y-2">
              <label htmlFor="donationUsage" className="text-sm font-medium">
                How the donation will be used
              </label>
              <Textarea
                id="donationUsage"
                placeholder="Write detailed explanation about how the donation will be used"
                className="min-h-[150px]"
                {...register("donationUsage", { required: true })}
              />
              {errors.donationUsage && <p className="text-sm text-red-500">Usage is required</p>}
            </div>

            {/* Target Amount Input */}
            <div className="space-y-2">
              <label htmlFor="targetAmount" className="text-sm font-medium">
                Target Amount
              </label>
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Rs. </p>
                <Input
                  type="number"
                  {...register("targetAmount", { required: true })}
                  id="targetAmount"
                  placeholder="7000"
                />
              </div>
              {errors.targetAmount && <p className="text-sm text-red-500">Target amount is required</p>}
            </div>

            {/* Days Left Input */}
            <div className="space-y-2">
              <label htmlFor="daysLeft" className="text-sm font-medium">
                Days Left
              </label>
              <Input type="number" {...register("daysLeft", { required: true })} id="daysLeft" placeholder="e.g., 7" />
              {errors.daysLeft && <p className="text-sm text-red-500">Days Left is required</p>}
            </div>

            {/* Location Input */}
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                Location
              </label>
              <Input
                id="location"
                placeholder="e.g., Karachi, Pakistan"
                {...register("location", { required: true })}
              />
              {errors.location && <p className="text-sm text-red-500">Location is required</p>}
            </div>

            {/* IBAN Input */}
            <div className="space-y-2">
              <label htmlFor="IBAN" className="text-sm font-medium">
                IBAN Number (Receiving Account)
              </label>
              <Input id="IBAN" placeholder="e.g., PK06SCBL0000001123456702" {...register("IBAN", { required: true })} />
              {errors.IBAN && <p className="text-sm text-red-500">IBAN is required</p>}
            </div>

            {/* Bank Name Input */}
            <div className="space-y-2">
              <label htmlFor="BankName" className="text-sm font-medium">
                Bank Name (Receiving Account)
              </label>
              <Input id="BankName" placeholder="e.g., Bank Alfalah" {...register("BankName", { required: true })} />
              {errors.BankName && <p className="text-sm text-red-500">Bank Name is required</p>}
            </div>

            {/* Account Title Input */}
            <div className="space-y-2">
              <label htmlFor="AccountTitle" className="text-sm font-medium">
                Account Title (Receiving Account)
              </label>
              <Input
                id="AccountTitle"
                placeholder="e.g., Rayan Sikandar"
                {...register("AccountTitle", { required: true })}
              />
              {errors.AccountTitle && <p className="text-sm text-red-500">Account title is required</p>}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-black hover:bg-[#F7AB0A]">
              Submit
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

