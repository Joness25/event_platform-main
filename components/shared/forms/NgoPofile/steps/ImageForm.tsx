"use client";

import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import NgoPricingDropdown from "../../NgoPricingDropdown";
import FileUploader from "@/components/shared/FileUploader";

// @ts-ignore
export function ImageForm({ form, setFiles }) {
  return (
    <div className=" flex flex-col gap-5 md:flex-row">
      <FormField
        control={form.control}
        name="imageTitle"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>
              Image Title
              <span className=" text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder="ie Logo"
                {...field}
                className=" input-field"
              />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="imageUrl"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl className="h-72">
              <FileUploader
                onFieldChange={field.onChange}
                imageUrl={field.value!}
                setFiles={setFiles}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
