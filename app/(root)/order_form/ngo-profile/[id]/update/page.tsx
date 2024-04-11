import { auth } from "@clerk/nextjs";
import { getBusinessAdById } from "@/lib/actions/business.actions";
import NgoProfileForm from "@/components/shared/forms/NgoProfileForm";

type UpdateNgoProfileProps = {
  params: {
    id: string;
  };
};

const updateNgoProfile = async ({ params: { id } }: UpdateNgoProfileProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const ngoProfile = await getBusinessAdById(id);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Create NGO Profile
        </h3>
      </section>

      <div className="wrapper my-8">
        {/* we pass the id of the user from clerk */}
        <NgoProfileForm
          userId={userId}
          type="Update"
          ngoProfile={ngoProfile}
          ngoProfileId={ngoProfile._id}
        />
      </div>
    </>
  );
};

export default updateNgoProfile;
