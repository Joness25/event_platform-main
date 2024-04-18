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
import NgoDropdown from "../../NgoDropdown";

// @ts-ignore
export function ProfileForm({ form }) {
  return (
    <>
      <div className="flex flex-col gap-5 md:flex-row">
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

        <FormField
          control={form.control}
          name="priceId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Page Size <span className=" text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <NgoPricingDropdown
                  onChangeHandler={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
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
    </>
  );
}
