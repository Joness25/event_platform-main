import { auth } from "@clerk/nextjs";
import { getBusinessAdById } from "@/lib/actions/business.actions";
import NgoProfileForm from "@/components/shared/ReadOnly/NgoProfileForm";
import { getNgoProfileById } from "@/lib/actions/NgoProfile.actions";
import Checkout from "@/components/shared/checkouts/ngo_profiles/Checkout";
import ImageNgoForm from "@/components/shared/forms/ImageForm";

type UpdateNgoProfileProps = {
  params: {
    id: string;
  };
};

const updateNgoProfile = async ({ params: { id } }: UpdateNgoProfileProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const ngoProfile = await getNgoProfileById(id);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          NGO Profile Details
        </h3>
      </section>

      <div className="wrapper my-8">
        {/* we pass the id of the user from clerk */}
        {/* <NgoProfileForm
          userId={userId}
          type="Update"
          ngoProfile={ngoProfile}
          ngoProfileId={ngoProfile._id}
        /> */}
        <ImageNgoForm
          userId={userId}
          type="Create"
          ngoProfileId={ngoProfile._id}
        />
        <Checkout ngoProfile={ngoProfile} userId={userId} />
      </div>
    </>
  );
};

export default updateNgoProfile;
