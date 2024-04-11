import { auth } from "@clerk/nextjs";
import { getBusinessAdById } from "@/lib/actions/business.actions";
import NgoForm from "@/components/shared/ReadOnly/NgoForm";

type UpdateNgoProps = {
  params: {
    id: string;
  };
};

const updateNgo = async ({ params: { id } }: UpdateNgoProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const ngo = await getBusinessAdById(id);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          NGO Details
        </h3>
      </section>

      <div className="wrapper my-8">
        {/* we pass the id of the user from clerk */}
        <NgoForm userId={userId} type="Update" ngo={ngo} ngoId={ngo._id} />
      </div>
    </>
  );
};

export default updateNgo;
