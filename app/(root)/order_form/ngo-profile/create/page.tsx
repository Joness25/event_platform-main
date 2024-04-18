import { auth } from "@clerk/nextjs";
// import NgoProfileForm from "@/components/shared/forms/NgoProfileForm";
import NgoProfileForm from "@/components/shared/forms/NgoPofile/NgoProfileForm";
import FormStep from "@/components/shared/stepper";
import MultiStepForm from "@/components/shared/Stepper2";

const CreateNgoProfile = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Create Event
        </h3>
      </section>
      <FormStep />
      <MultiStepForm />
      <div className="wrapper my-8">
        <NgoProfileForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateNgoProfile;
