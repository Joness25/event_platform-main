"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { businessFormSchema } from "@/lib/validator";
import * as z from "zod";
import { businessFormDefaultValues } from "@/constants";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "../FileUploader";
import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";

import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { IBusinessAd } from "@/lib/database/models/businessad.model";
import {
  createBusinessAD,
  updateBusinessAd,
} from "@/lib/actions/business.actions";
import BusinessDropdown from "./BusinessDropdown";

type EventFormProps = {
  userId: string;
  type: "Create" | "Update" | "ReadOnly";
  businessAd?: IBusinessAd;
  businessAdId?: string;
};

//event - businessAd
//eventId - businessAdId

const BusinessForm = ({
  userId,
  type,
  businessAd,
  businessAdId,
}: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const initialValues =
    businessAd && type === "Update"
      ? {
          ...businessAd,
        }
      : businessFormDefaultValues;
  const router = useRouter();

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof businessFormSchema>>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof businessFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newBusinessAd = await createBusinessAD({
          businessAd: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: "/profile",
        });

        if (newBusinessAd) {
          form.reset();
          router.push(`/order_form/business/${newBusinessAd._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!businessAdId) {
        router.back();
        return;
      }

      try {
        const updatedAd = await updateBusinessAd({
          businessAd: {
            ...values,
            imageUrl: uploadedImageUrl,
            _id: businessAdId,
          },
          userId,
          path: `/order_form/business/${businessAdId}`,
        });

        if (updatedAd) {
          form.reset();
          router.push(`/order_form/business/${updatedAd._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col gap-5"
      >
        <div className=" flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="priceId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Page Size <span className=" text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <BusinessDropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className=" flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="clientsName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Client's Name:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Client's Name"
                    {...field}
                    className=" input-field"
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className=" flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="telephoneNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Phone <span className=" text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Phone No"
                    {...field}
                    className=" input-field"
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Email <span className=" text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                    className=" input-field"
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className=" flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="orderAwarderName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Name of person awarding order
                  <span className=" text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Person awarding order"
                    {...field}
                    className=" input-field"
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="designation"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Designation
                  <span className=" text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Designation"
                    {...field}
                    className=" input-field"
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Website
                  <span className=" text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Website"
                    {...field}
                    className=" input-field"
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className=" flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Company's profile
                  <span className=" text-red-500">*</span>
                </FormLabel>
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Artwork/illustrations for company/institution"
                    {...field}
                    className="textarea rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="hidden">
          <FormField
            control={form.control}
            name="createdAtt"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Created At <span className=" text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Created At"
                    {...field}
                    className=" input-field"
                    value={Date.now()}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Is Free <span className=" text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    // onChange={(e) => field.onChange(e.target.checked)}
                    className="input-field"
                  />
                </FormControl>
                <FormDescription>
                  This indicates whether the event is free or not.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className=" flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? "Submitting..." : `${type} Event `}
        </Button>
      </form>
    </Form>
  );
};

export default BusinessForm;
