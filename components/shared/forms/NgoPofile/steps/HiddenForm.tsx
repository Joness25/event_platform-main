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
import { Checkbox } from "@/components/ui/checkbox";

// @ts-ignore
export function HiddenForm({ form }) {
  return (
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
            <FormDescription>This is your public display name.</FormDescription>
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
  );
}
