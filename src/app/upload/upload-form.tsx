
"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Trash2, FileText, UploadCloud } from "lucide-react";
import { TitleSuggester } from "./title-suggester";
import { useState, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MAX_IMAGES = 3;
const MAX_SUBSECTIONS = 3;

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters.").max(70, "Title must be 70 characters or less for SEO."),
  description: z.string().min(20, "Description is too short."),
  category: z.string().min(1, "Please select a category."),
  images: z.array(z.any()).max(MAX_IMAGES, `You can only upload a maximum of ${MAX_IMAGES} images.`).default([]),
  subsections: z.array(z.object({
    title: z.string().min(5, "Subtitle is too short."),
    description: z.string().min(20, "Sub-description is too short."),
  })).max(MAX_SUBSECTIONS),
});

type UploadFormValues = z.infer<typeof formSchema>;

interface UploadFormProps {
  post?: UploadFormValues;
}

const categories = ["Stock Market", "IT", "Jobs", "News", "Lifestyle", "Food", "Travel", "Personal Finance", "Health & Fitness", "Technology", "Education", "Parenting"];

export function UploadForm({ post }: UploadFormProps) {
  const [titleCharCount, setTitleCharCount] = useState(post?.title.length || 0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: post || {
      title: "",
      description: "",
      category: "",
      images: [],
      subsections: [],
    },
  });

  const { fields: subsectionFields, append: appendSubsection, remove: removeSubsection } = useFieldArray({
    control: form.control,
    name: "subsections",
  });
  
  const images = form.watch("images");

  const handleFileChange = (files: FileList | null) => {
    if (files) {
        const currentImages = form.getValues("images") || [];
        const newImages = Array.from(files);
        const imageFiles = newImages.filter(file => file.type.startsWith('image/'));
        const combined = [...currentImages, ...imageFiles].slice(0, MAX_IMAGES);
        form.setValue("images", combined, { shouldValidate: true });
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (images.length < MAX_IMAGES) {
      setIsDragging(true);
    }
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (images.length < MAX_IMAGES) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  const removeImage = (index: number) => {
    const currentImages = form.getValues("images") || [];
    const newImages = currentImages.filter((_, i) => i !== index);
    form.setValue("images", newImages, { shouldValidate: true });
  };

  const onSubmit = (data: UploadFormValues) => {
    console.log(data);
    // Here you would handle form submission, e.g., uploading files and sending data to a server.
  };
  
  const descriptionValue = form.watch("description");
  
  const handleSelectTitle = (title: string) => {
    form.setValue("title", title);
    setTitleCharCount(title.length);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="title" className="text-lg font-semibold">Main Title</Label>
              <TitleSuggester description={descriptionValue} onSelectTitle={handleSelectTitle} />
            </div>
            <Controller
              name="title"
              control={form.control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter your blog title" onChange={(e) => {
                    field.onChange(e);
                    setTitleCharCount(e.target.value.length);
                }} />
              )}
            />
             <p className={`text-sm ${titleCharCount > 70 ? 'text-destructive' : 'text-muted-foreground'}`}>
                {titleCharCount} / 70 characters
            </p>
            {form.formState.errors.title && <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-lg font-semibold">Main Description</Label>
            <Controller
              name="description"
              control={form.control}
              render={({ field }) => <Textarea {...field} placeholder="Describe your blog post..." className="min-h-[150px]" />}
            />
            {form.formState.errors.description && <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-lg font-semibold">Category</Label>
            <Controller
              name="category"
              control={form.control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {form.formState.errors.category && <p className="text-sm text-destructive">{form.formState.errors.category.message}</p>}
          </div>

          <div className="space-y-4">
            <Label className="text-lg font-semibold">Images</Label>
            <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={cn(
                    "border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 text-center transition-colors",
                    isDragging ? "border-primary bg-primary/10" : "bg-transparent",
                    images.length >= MAX_IMAGES && "cursor-not-allowed opacity-50"
                )}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e.target.files)}
                    disabled={images.length >= MAX_IMAGES}
                />
                <div className="flex flex-col items-center justify-center space-y-4">
                  <UploadCloud className="h-12 w-12 text-muted-foreground" />
                  <p className="text-muted-foreground">
                      Drag & drop images here, or{" "}
                      <Button
                          type="button"
                          variant="link"
                          className="p-0 h-auto"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={images.length >= MAX_IMAGES}
                      >
                          browse files
                      </Button>
                  </p>
                  <p className="text-xs text-muted-foreground">Max {MAX_IMAGES} images allowed. {images.length} / {MAX_IMAGES} uploaded.</p>
                </div>
            </div>
            {form.formState.errors.images && <p className="text-sm text-destructive">{form.formState.errors.images.message}</p>}

            {images && images.length > 0 && (
                <div className="space-y-2 pt-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {images.map((file, index) => (
                            <div key={index} className="relative group aspect-square">
                                <Image
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    fill
                                    className="object-cover rounded-md"
                                    onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                                />
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => removeImage(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Remove image</span>
                                    </Button>
                                </div>
                                <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs truncate p-1 rounded-b-md">{file.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
          </div>
          
          <div className="space-y-4">
             <h3 className="text-lg font-semibold">Subsections</h3>
              {subsectionFields.map((field, index) => (
                 <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
                   <h4 className="font-semibold flex items-center"><FileText className="mr-2 h-5 w-5" /> Subsection {index + 1}</h4>
                   <div className="space-y-2">
                      <Label htmlFor={`subsections.${index}.title`}>Subtitle</Label>
                      <Controller
                          name={`subsections.${index}.title`}
                          control={form.control}
                          render={({ field }) => <Input {...field} placeholder="Subtitle" />}
                      />
                      {form.formState.errors.subsections?.[index]?.title && <p className="text-sm text-destructive">{form.formState.errors.subsections[index]?.title?.message}</p>}
                   </div>
                    <div className="space-y-2">
                      <Label htmlFor={`subsections.${index}.description`}>Sub-description</Label>
                      <Controller
                          name={`subsections.${index}.description`}
                          control={form.control}
                          render={({ field }) => <Textarea {...field} placeholder="Subsection description..." />}
                      />
                      {form.formState.errors.subsections?.[index]?.description && <p className="text-sm text-destructive">{form.formState.errors.subsections[index]?.description?.message}</p>}
                   </div>
                   <Button type="button" variant="ghost" size="icon" onClick={() => removeSubsection(index)} className="absolute top-2 right-2">
                      <Trash2 className="h-4 w-4" />
                   </Button>
                 </div>
              ))}

              {subsectionFields.length < MAX_SUBSECTIONS && (
                  <Button type="button" variant="outline" onClick={() => appendSubsection({ title: '', description: '' })}>
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Subsection
                  </Button>
              )}
          </div>

          <div className="flex justify-end">
            <Button type="submit" size="lg">{post ? 'Update Post' : 'Publish Post'}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
