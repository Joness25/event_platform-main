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
export function ContactsForm({ form }) {
  return (
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
                placeholder="Contact Person's name"
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
        name="contactPersonTitle"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>
              Contact Person's Title
              <span className=" text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Contact Person's Title"
                {...field}
                className=" input-field"
              />
            </FormControl>
            <FormDescription>This is your public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
