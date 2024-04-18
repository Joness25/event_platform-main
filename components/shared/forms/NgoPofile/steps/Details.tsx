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

// @ts-ignore
export function DetailsForm({ form }) {
  return (
    <div>
      <div className=" flex flex-col gap-5 md:flex-row">
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
                  placeholder="Location"
                  {...field}
                  className=" input-field"
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
                  placeholder="Postal address"
                  {...field}
                  className=" input-field"
                />
              </FormControl>
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
                  placeholder="Fax Number"
                  {...field}
                  className=" input-field"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
