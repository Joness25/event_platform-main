import { auth } from "@clerk/nextjs";
import { getBusinessAdById } from "@/lib/actions/business.actions";
import BusinessForm from "@/components/shared/ReadOnly/BusinessForm";
import { ConfirmButton } from "@/components/shared/checkouts/business/ConfirmButton";

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
          Business Advertisement Details
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

        <ConfirmButton businessAd={businessAd} userId={userId} />
      </div>
    </>
  );
};

export default updateBusinessAd;
