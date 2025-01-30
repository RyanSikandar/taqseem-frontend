"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
interface FormData {
  title: string;
  description: string;
  cause: string;
  help: string;
  days: number;
}

export default function RequestVolunteer() {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const causeValue = watch("cause");

  const onSubmit = (data: FormData) => {
    if (images.length === 0) {
      alert("Please upload at least one image");
      return;
    }
    console.log("Form data:", data);
    console.log("Images:", images);
    reset();
    setImages([]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...files]);

    // Create preview URLs
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setImages((prev) => [...prev, ...files]);

    // Create preview URLs
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10 mt-10">
      <div className="max-w-4xl mx-auto">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Request Volunteer</h1>

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
                  Drag and drop your cause images/documents here, or click to
                  select files
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

            {/* Topic Input */}
            <div className="space-y-2">
              <label htmlFor="topic" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="topic"
                placeholder="e.g., teach maths to underprivileged children"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className="text-sm text-red-500">Topic is required</p>
              )}
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
              {errors.description && (
                <p className="text-sm text-red-500">Description is required</p>
              )}
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
                  <SelectItem value="community">
                    Community Development
                  </SelectItem>
                  <SelectItem value="welfare">Welfare</SelectItem>
                </SelectContent>
              </Select>
              {errors.cause && (
                <p className="text-sm text-red-500">{errors.cause.message}</p>
              )}
            </div>
            {/* Description Input */}
            <div className="space-y-2">
              <label htmlFor="donationUse" className="text-sm font-medium">
                How it will help the community
              </label>
              <Textarea
                id="donationUse"
                placeholder="Write detailed explanation about how it will help the community"
                className="min-h-[150px]"
                {...register("help", { required: true })}
              />
              {errors.help && (
                <p className="text-sm text-red-500">Usage is required</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium">
                Days Left
              </label>
              <Input
                type="number"
                {...register("days", { required: true })}
                id="days-left"
                placeholder="e.g., 7"
              />
              {errors.days && (
                <p className="text-sm text-red-500">Days Left is required</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-black hover:bg-[#F7AB0A]"
            >
              Submit
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
