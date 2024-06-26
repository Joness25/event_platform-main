import { auth } from "@clerk/nextjs";
import { getBusinessAdById } from "@/lib/actions/business.actions";
import BusinessForm from "@/components/shared/forms/BusinessForm";

type UpdateBusinessADProps = {
  params: {
    id: string;
  };
};

const updateBusinessAd = async ({ params: { id } }: UpdateBusinessADProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const businessAd = await getBusinessAdById(id);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Create Event
        </h3>
      </section>

      <div className="wrapper my-8">
        {/* we pass the id of the user from clerk */}
        <BusinessForm
          userId={userId}
          type="Update"
          businessAd={businessAd}
          businessAdId={businessAd._id}
        />
      </div>
    </>
  );
};

export default updateBusinessAd;
