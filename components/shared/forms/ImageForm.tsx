"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
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
import { ImageFormSchema, ngosProfileFormSchema } from "@/lib/validator";
import * as z from "zod";
import {
  ImageFormDefaultValues,
  ngosProfileFormDefaultValues,
} from "@/constants";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "../FileUploader";
import { useEffect, useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";

import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { IProfile } from "@/lib/database/models/ngoprofile.model";
import {
  createNgoProfile,
  updateNgoProfile,
} from "@/lib/actions/NgoProfile.actions";
import NgoPricingDropdown from "./NgoPricingDropdown";
import { Checkbox } from "@/components/ui/checkbox";
import NgoBasicDropdown from "./NgoBasicDropdown";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import NgoForm from "./NgoForm";
import NgoDropdown from "./NgoDropdown";
import ImageForm from "./ImageForm";
import { createNgoImage } from "@/lib/actions/ImageNgo.actions";
import { INgoImage } from "@/lib/database/models/ImagesNgo.model";

type NgoProfileFormProps = {
  userId: string;
  type: "Create" | "Update";
  ngoProfileId: string;
};

//event - businessAd
//eventId - businessAdId

const ImageNgoForm = ({ userId, type, ngoProfileId }: NgoProfileFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const initialValues = ImageFormDefaultValues;
  const router = useRouter();

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof ImageFormSchema>>({
    resolver: zodResolver(ImageFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof ImageFormSchema>) {
    let uploadedImageUrl = values.imageUrl;
    console.log(values);

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newNgoProfileImage = await createNgoImage({
          formValues: { ...values, imageUrl: uploadedImageUrl },
          userId,
          ngoProfileId,
        });

        if (newNgoProfileImage) {
          form.reset();
          // router.push(`/order_form/ngo-profile/${newNgoProfile._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    //     if (type === "Update") {
    //       if (!ngoProfileId) {
    //         router.back();
    //         return;
    //       }
    // // export async function createNgoImage({
    //     //   userId,
    //     //   ngoProfileId,
    //     //   formValues,
    //       try {
    //         const updatedNgoProfile = await updateNgoImage({
    //           ngoProfile: {
    //             ...values,
    //             imageUrl: uploadedImageUrl,
    //             _id: ngoProfileId,
    //           },
    //           userId,
    //           path: `/order_form/ngo-profile/${ngoProfileId}`,
    //         });

    //         if (updatedNgoProfile) {
    //           form.reset();
    //           if (!ngoProfileIdState) {
    //             // // Only update ngoProfileIdState if it's not already set
    //             setNgoProfileIdState(updatedNgoProfile._id!);
    //           }
    //           // router.push(`/order_form/ngo-profile/${updatedNgoProfile._id}`);
    //         }
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col gap-5 relative overflow-x-hidden"
        >
          <div className=" flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="title"
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
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
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
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className={cn("button col-span-2 w-full", {
              // hidden: formStep == 1,
            })}
          >
            {form.formState.isSubmitting ? "Submitting..." : `${type} Event `}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ImageNgoForm;
