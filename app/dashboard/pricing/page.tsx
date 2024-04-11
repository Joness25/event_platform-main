import { auth } from "@clerk/nextjs";
import BusinessForm from "@/components/shared/BusinessForm";
import BusinessPricingForm from "@/components/shared/priceForms/BusinessPrices";
import NgoPricingForm from "@/components/shared/priceForms/NgoPricing";

const CreateBusinessAd = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Create Event
        </h3>
      </section>

      <div className="wrapper my-8">
        {/* we pass the id of the user from clerk */}
        <h1>Create Business pricing</h1>
        <BusinessPricingForm type="Create" />
        <h1>Create Ngo pricing</h1>
        <NgoPricingForm type="Create" />
      </div>
    </>
  );
};

export default CreateBusinessAd;
