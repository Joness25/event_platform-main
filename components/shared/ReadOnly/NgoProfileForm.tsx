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
import { ngosProfileFormSchema } from "@/lib/validator";
import * as z from "zod";
import { ngosProfileFormDefaultValues } from "@/constants";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "../FileUploader";
import { useState } from "react";
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
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import NgoDropdown from "./NgoDropdown";
import { ConfirmButton } from "../checkouts/ngo_profiles/ConfirmButton";

type NgoProfileFormProps = {
  userId: string;
  type: "Create" | "Update";
  ngoProfile: IProfile;
  ngoProfileId: string;
};

//event - businessAd
//eventId - businessAdId

const NgoProfileForm = ({
  userId,
  type,
  ngoProfile,
  ngoProfileId,
}: NgoProfileFormProps) => {
  const [formStep, setFormStep] = useState<number>(0);
  const [files, setFiles] = useState<File[]>([]);
  const initialValues =
    ngoProfile && type === "Update"
      ? {
          ...ngoProfile,
        }
      : ngosProfileFormDefaultValues;
  const router = useRouter();

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof ngosProfileFormSchema>>({
    resolver: zodResolver(ngosProfileFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof ngosProfileFormSchema>) {
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
        const newNgoProfile = await createNgoProfile({
          ngoProfile: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: "/profile",
        });

        if (newNgoProfile) {
          form.reset();
          router.push(`/order_form/ngo-profile/${newNgoProfile._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!ngoProfileId) {
        router.back();
        return;
      }

      try {
        const updatedNgoProfile = await updateNgoProfile({
          ngoProfile: {
            ...values,
            imageUrl: uploadedImageUrl,
            _id: ngoProfileId,
          },
          userId,
          path: `/order_form/ngo-profile/${ngoProfileId}`,
        });

        if (updatedNgoProfile) {
          form.reset();
          router.push(`/order_form/ngo-profile/${updatedNgoProfile._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  //   createdAtt: z.date(),
  //   isFree: z.boolean(),
  // });

  return (
    // <Form {...form}>
    // <form
    //   onSubmit={form.handleSubmit(onSubmit)}
    //   className="space-y-8 flex flex-col gap-5 relative overflow-x-hidden"
    // >
    //   <motion.div
    //     className={cn("space-y-3", {
    //       // hidden: formStep == 1,
    //     })}
    //     // formStep == 0 -> translateX == 0
    //     // formStep == 1 -> translateX == '-100%'
    //     animate={{
    //       translateX: `-${formStep * 100}%`,
    //     }}
    //     transition={{
    //       ease: "easeInOut",
    //     }}
    //   >
    //     <div className="flex flex-col gap-5 md:flex-row">
    //       <FormField
    //         control={form.control}
    //         name="description"
    //         render={({ field }) => (
    //           <FormItem className="w-full">
    //             <FormLabel>
    //               Company's profile
    //               <span className=" text-red-500">*</span>
    //             </FormLabel>
    //             <FormControl className="h-72">
    //               <Textarea
    //                 placeholder="Artwork/illustrations for company/institution"
    //                 {...field}
    //                 className="textarea rounded-2xl"
    //               />
    //             </FormControl>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />
    //       <FormField
    //         control={form.control}
    //         name="priceId"
    //         render={({ field }) => (
    //           <FormItem className="w-full">
    //             <FormLabel>
    //               Page Size <span className=" text-red-500">*</span>
    //             </FormLabel>
    //             <FormControl>
    //               <NgoPricingDropdown
    //                 onChangeHandler={field.onChange}
    //                 value={field.value}
    //               />
    //             </FormControl>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />
    //     </div>
    //     <div className=" flex flex-col gap-5 md:flex-row">
    //       <FormField
    //         control={form.control}
    //         name="imageUrl"
    //         render={({ field }) => (
    //           <FormItem className="w-full">
    //             <FormControl className="h-72">
    //               <FileUploader
    //                 onFieldChange={field.onChange}
    //                 imageUrl={field.value}
    //                 setFiles={setFiles}
    //               />
    //             </FormControl>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />
    //     </div>
    //   </motion.div>

    //   <div className=" flex flex-col gap-5 md:flex-row">{/*  */}</div>
    //   <div className="hidden">
    //     <FormField
    //       control={form.control}
    //       name="createdAtt"
    //       render={({ field }) => (
    //         <FormItem className="w-full">
    //           <FormLabel>
    //             Created At <span className=" text-red-500">*</span>
    //           </FormLabel>
    //           <FormControl>
    //             <Input
    //               placeholder="Created At"
    //               {...field}
    //               className=" input-field"
    //               value={Date.now()}
    //             />
    //           </FormControl>
    //           <FormDescription>
    //             This is your public display name.
    //           </FormDescription>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //     <FormField
    //       control={form.control}
    //       name="isFree"
    //       render={({ field }) => (
    //         <FormItem className="w-full">
    //           <FormLabel>
    //             Is Free <span className=" text-red-500">*</span>
    //           </FormLabel>
    //           <FormControl>
    //             <Checkbox
    //               checked={field.value}
    //               // onChange={(e) => field.onChange(e.target.checked)}
    //               className="input-field"
    //             />
    //           </FormControl>
    //           <FormDescription>
    //             This indicates whether the event is free or not.
    //           </FormDescription>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //   </div>

    //   <motion.div
    //     className={cn("space-y-3 absolute top-0 left-0 right-0", {
    //       // hidden: formStep == 0,
    //     })}
    //     // formStep == 0 -> translateX == 100%
    //     // formStep == 1 -> translateX == 0
    //     animate={{
    //       translateX: `${100 - formStep * 100}%`,
    //     }}
    //     style={{
    //       translateX: `${100 - formStep * 100}%`,
    //     }}
    //     transition={{
    //       ease: "easeInOut",
    //     }}
    //   >
    //     <div className=" flex flex-col gap-5 md:flex-row">
    //       <FormField
    //         control={form.control}
    //         name="name"
    //         render={({ field }) => (
    //           <FormItem className="w-full">
    //             <FormLabel>
    //               Name of Organization{" "}
    //               <span className=" text-red-500">*</span>
    //             </FormLabel>
    //             <FormControl>
    //               <Input
    //                 placeholder="Client's Name"
    //                 {...field}
    //                 className=" input-field"
    //               />
    //             </FormControl>
    //             <FormDescription>
    //               This is your public display name.
    //             </FormDescription>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />
    //       <FormField
    //         control={form.control}
    //         name="website"
    //         render={({ field }) => (
    //           <FormItem className="w-full">
    //             <FormLabel>
    //               Website
    //               <span className=" text-red-500">*</span>
    //             </FormLabel>
    //             <FormControl>
    //               <Input
    //                 placeholder="Website"
    //                 {...field}
    //                 className=" input-field"
    //               />
    //             </FormControl>
    //             <FormDescription>
    //               This is your public display name.
    //             </FormDescription>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />

    //       <FormField
    //         control={form.control}
    //         name="physicalAddress"
    //         render={({ field }) => (
    //           <FormItem className="w-full">
    //             <FormLabel>
    //               Physical Address <span className=" text-red-500">*</span>
    //             </FormLabel>{" "}
    //             <FormControl>
    //               <Input
    //                 placeholder="Client's Name"
    //                 {...field}
    //                 className=" input-field"
    //               />
    //             </FormControl>
    //             <FormDescription>
    //               This is your public display name.
    //             </FormDescription>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />
    //     </div>
    //     <div className=" flex flex-col gap-5 md:flex-row">
    //       <FormField
    //         control={form.control}
    //         name="telephoneNumber"
    //         render={({ field }) => (
    //           <FormItem className="w-full">
    //             <FormLabel>
    //               Phone <span className=" text-red-500">*</span>
    //             </FormLabel>
    //             <FormControl>
    //               <Input
    //                 placeholder="Phone No"
    //                 {...field}
    //                 className=" input-field"
    //               />
    //             </FormControl>
    //             <FormDescription>
    //               This is your public display name.
    //             </FormDescription>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />
    //       <FormField
    //         control={form.control}
    //         name="email"
    //         render={({ field }) => (
    //           <FormItem className="w-full">
    //             <FormLabel>
    //               Email <span className=" text-red-500">*</span>
    //             </FormLabel>
    //             <FormControl>
    //               <Input
    //                 placeholder="Email"
    //                 {...field}
    //                 className=" input-field"
    //               />
    //             </FormControl>
    //             <FormDescription>
    //               This is your public display name.
    //             </FormDescription>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />
    //     </div>
    //     <div className=" flex flex-col gap-5 md:flex-row">
    //       <FormField
    //         control={form.control}
    //         name="postalAddress"
    //         render={({ field }) => (
    //           <FormItem className="w-full">
    //             <FormLabel>
    //               Postal address
    //               <span className=" text-red-500">*</span>
    //             </FormLabel>
    //             <FormControl>
    //               <Input
    //                 placeholder="Person awarding order"
    //                 {...field}
    //                 className=" input-field"
    //               />
    //             </FormControl>
    //             <FormDescription>
    //               This is your public display name.
    //             </FormDescription>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />
    //       <FormField
    //         control={form.control}
    //         name="faxNumber"
    //         render={({ field }) => (
    //           <FormItem className="w-full">
    //             <FormLabel>
    //               Fax Number
    //               <span className=" text-red-500">*</span>
    //             </FormLabel>
    //             <FormControl>
    //               <Input
    //                 placeholder="Designation"
    //                 {...field}
    //                 className=" input-field"
    //               />
    //             </FormControl>
    //             <FormDescription>
    //               This is your public display name.
    //             </FormDescription>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />
    //     </div>
    //     <div className=" flex flex-col gap-5 md:flex-row">
    //       <FormField
    //         control={form.control}
    //         name="contactPersonName"
    //         render={({ field }) => (
    //           <FormItem className="w-full">
    //             <FormLabel>
    //               Contact Person's Name
    //               <span className=" text-red-500">*</span>
    //             </FormLabel>
    //             <FormControl>
    //               <Input
    //                 placeholder="Website"
    //                 {...field}
    //                 className=" input-field"
    //               />
    //             </FormControl>
    //             <FormDescription>
    //               This is your public display name.
    //             </FormDescription>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />
    //       <FormField
    //         control={form.control}
    //         name="contactPersonTitle"
    //         render={({ field }) => (
    //           <FormItem className="w-full">
    //             <FormLabel>
    //               Contact Person's Title
    //               <span className=" text-red-500">*</span>
    //             </FormLabel>
    //             <FormControl>
    //               <Input
    //                 placeholder="Website"
    //                 {...field}
    //                 className=" input-field"
    //               />
    //             </FormControl>
    //             <FormDescription>
    //               This is your public display name.
    //             </FormDescription>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />
    //     </div>
    //     <div className=" flex flex-col gap-5 md:flex-row">
    //       <FormField
    //         control={form.control}
    //         name="categoryId"
    //         render={({ field }) => (
    //           <FormItem className="w-full">
    //             <FormLabel>
    //               Area of interest
    //               <span className=" text-red-500">*</span>
    //             </FormLabel>
    //             <FormControl>
    //               <NgoDropdown
    //                 onChangeHandler={field.onChange}
    //                 value={field.value}
    //               />
    //             </FormControl>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />
    //     </div>
    //     <div className="hidden">
    //       <FormField
    //         control={form.control}
    //         name="createdAtt"
    //         render={({ field }) => (
    //           <FormItem className="w-full">
    //             <FormLabel>
    //               Created At <span className=" text-red-500">*</span>
    //             </FormLabel>
    //             <FormControl>
    //               <Input
    //                 placeholder="Created At"
    //                 {...field}
    //                 className=" input-field"
    //                 value={Date.now()}
    //               />
    //             </FormControl>
    //             <FormDescription>
    //               This is your public display name.
    //             </FormDescription>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />
    //       <FormField
    //         control={form.control}
    //         name="isFree"
    //         render={({ field }) => (
    //           <FormItem className="w-full">
    //             <FormLabel>
    //               Is Free <span className=" text-red-500">*</span>
    //             </FormLabel>
    //             <FormControl>
    //               <Checkbox
    //                 checked={field.value}
    //                 // onChange={(e) => field.onChange(e.target.checked)}
    //                 className="input-field"
    //               />
    //             </FormControl>
    //             <FormDescription>
    //               This indicates whether the event is free or not.
    //             </FormDescription>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />
    //     </div>
    //   </motion.div>

    //   <Button
    //     type="submit"
    //     size="lg"
    //     disabled={form.formState.isSubmitting}
    //     className={cn("button col-span-2 w-full", {
    //       hidden: formStep == 0,
    //     })}
    //   >
    //     {form.formState.isSubmitting ? "Submitting..." : `${type} Event `}
    //   </Button>
    //   <Button
    //     type="button"
    //     size="lg"
    //     className={cn("button col-span-2 w-full", {
    //       hidden: formStep == 1,
    //     })}
    //     variant={"ghost"}
    //     onClick={() => {
    //       // validation
    //       form.trigger(["description"]);
    //       const descriptionState = form.getFieldState("description");

    //       // const emailState = form.getFieldState("email");
    //       // const nameState = form.getFieldState("name");
    //       // const yearState = form.getFieldState("year");
    //       // const idState = form.getFieldState("studentId");

    //       if (!descriptionState.isDirty || descriptionState.invalid) return;
    //       // if (!emailState.isDirty || emailState.invalid) return;
    //       // if (!nameState.isDirty || nameState.invalid) return;
    //       // if (!yearState.isDirty || yearState.invalid) return;
    //       // if (!idState.isDirty || idState.invalid) return;

    //       setFormStep(1);
    //     }}
    //   >
    //     Next Step
    //     <ArrowRight className="w-4 h-4 ml-2" />
    //   </Button>
    //   {/* <Button
    //     type="button"
    //     variant={"ghost"}
    //     onClick={() => {
    //       setFormStep(0);
    //     }}
    //     className={cn({
    //       hidden: formStep == 0,
    //     })}
    //   >
    //     Go Back
    //   </Button> */}
    //   <ConfirmButton ngoProfile={ngoProfile} userId={userId} />
    // </form>
    // </Form>
    <ConfirmButton ngoProfile={ngoProfile} userId={userId} />
  );
};

export default NgoProfileForm;
