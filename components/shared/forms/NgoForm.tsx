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
import { Input } from "@/components/ui/input";
import { ngosBasicFormSchema } from "@/lib/validator";
import * as z from "zod";
import { ngosBasicFormDefaultValues } from "@/constants";

import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { INGO } from "@/lib/database/models/ngobasic.model";
import { createNgo, updateNgo } from "@/lib/actions/ngoBasic.actions";
import NgoDropdown from "./NgoDropdown";
import { Checkbox } from "@/components/ui/checkbox";

type NgoFormProps = {
  userId: string;
  type: "Create" | "Update";
  ngo?: INGO;
  ngoId?: string;
};

const NgoForm = ({ userId, type, ngo, ngoId }: NgoFormProps) => {
  const initialValues =
    ngo && type === "Update"
      ? {
          ...ngo,
        }
      : ngosBasicFormDefaultValues;
  const router = useRouter();

  const form = useForm<z.infer<typeof ngosBasicFormSchema>>({
    resolver: zodResolver(ngosBasicFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof ngosBasicFormSchema>) {
    if (type === "Create") {
      try {
        const newNgo = await createNgo({
          ngo: { ...values },
          userId,
          path: "/profile",
        });

        if (newNgo) {
          form.reset();
          router.push(`/order_form/ngo-basic/${newNgo._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!ngoId) {
        router.back();
        return;
      }

      try {
        const updatedNgo = await updateNgo({
          userId,
          ngo: {
            ...values,
            _id: ngoId,
          },
          path: `/order_form/ngo-basic/${ngoId}`,
        });

        if (updatedNgo) {
          form.reset();
          router.push(`/order_form/ngo-basic/${updatedNgo._id}`);
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
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Name of Organization <span className=" text-red-500">*</span>
                </FormLabel>
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

          <FormField
            control={form.control}
            name="physicalAddress"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Physical Address <span className=" text-red-500">*</span>
                </FormLabel>{" "}
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
            name="postalAddress"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Postal address
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
            name="faxNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Fax Number
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
        <div className=" flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="contactPersonName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Contact Person's Name
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
          <FormField
            control={form.control}
            name="contactPersonTitle"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Contact Person's Title
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
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Area of interest
                  <span className=" text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <NgoDropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
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

export default NgoForm;
