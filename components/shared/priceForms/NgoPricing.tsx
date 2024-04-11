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
import { pricingFormSchema } from "@/lib/validator";
import * as z from "zod";
import { pricingDefaultValues } from "@/constants";

import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { IPricingNgo } from "@/lib/database/models/pricingNgo.model";
import {
  createNgoPricing,
  updateNgoPricing,
} from "@/lib/actions/pricingNgo.actions";

type NgoPricingFormProps = {
  type: "Create" | "Update";
  pricing?: IPricingNgo;
  pricingId?: string;
};

const NgoPricingForm = ({ type, pricing, pricingId }: NgoPricingFormProps) => {
  const initialValues =
    pricing && type === "Update"
      ? {
          ...pricing,
        }
      : pricingDefaultValues;
  const router = useRouter();

  const form = useForm<z.infer<typeof pricingFormSchema>>({
    resolver: zodResolver(pricingFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof pricingFormSchema>) {
    if (type === "Create") {
      try {
        const newPricing = await createNgoPricing({
          pricing: { ...values },
          path: "/profile",
        });

        if (newPricing) {
          form.reset();
          router.push(`/events/${newPricing._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!pricingId) {
        router.back();
        return;
      }

      try {
        const updatedPricing = await updateNgoPricing({
          pricing: {
            ...values,
            _id: pricingId,
          },
          path: `/events/${pricingId}`,
        });

        if (updatedPricing) {
          form.reset();
          router.push(`/events/${updatedPricing._id}`);
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
            name="productNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Product Number <span className=" text-red-500">*</span>
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
            name="pageType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  No. of pages
                  <span className=" text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="No. of pages"
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
            name="priceInUsd"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Price in USD <span className=" text-red-500">*</span>
                </FormLabel>{" "}
                <FormControl>
                  <Input
                    placeholder="USD"
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
            name="priceInKsh"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Price in ksh <span className=" text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="ksh"
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
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Description <span className=" text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="description"
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

export default NgoPricingForm;
