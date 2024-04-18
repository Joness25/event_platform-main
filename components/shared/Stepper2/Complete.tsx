import Final from "./Final";
import { FormWrapper } from "./FormWrapper";

type AddressData = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

type AddressFormProps = AddressData & {
  updateFields: (fields: Partial<AddressData>) => void;
  title: string;
};

export function Complete({
  street,
  city,
  state,
  zip,
  updateFields,
  title,
}: AddressFormProps) {
  return (
    <FormWrapper title={title}>
      <Final />
    </FormWrapper>
  );
}
