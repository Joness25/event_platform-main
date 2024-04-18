"use client";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
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
import { ngosProfileFormSchema } from "@/lib/validator";
import * as z from "zod";
import { ngosProfileFormDefaultValues } from "@/constants";
import { FormEvent, useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { IProfile } from "@/lib/database/models/ngoprofile.model";
import {
  createNgoProfile,
  updateNgoProfile,
} from "@/lib/actions/NgoProfile.actions";
import NgoPricingDropdown from "../NgoPricingDropdown";
import NgoBasicDropdown from "../NgoBasicDropdown";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import NgoForm from "../NgoForm";
import { useUploadThing } from "@/lib/uploadthing";
import { ProfileForm } from "./steps/Profile";
import { DetailsForm } from "./steps/Details";
import { ImageForm } from "./steps/ImageForm";
import { ContactsForm } from "./steps/Contacts";
import { HiddenForm } from "./steps/HiddenForm";
import { useMultistepForm } from "./useMultistepForm";
import Stepper from "./Stepper";
import Final from "./steps/Final";
import StepperControl from "./StepperControl";
import { createNgoImage } from "@/lib/actions/ImageNgo.actions";

type NgoProfileFormProps = {
  userId: string;
  type: "Create" | "Update";
  ngoProfile?: IProfile;
  ngoProfileId?: string;
};

//event - businessAd
//eventId - businessAdId

const NgoProfileForm = ({
  userId,
  type,
  ngoProfile,
  ngoProfileId,
}: NgoProfileFormProps) => {
  // others
  const [files, setFiles] = useState<File[]>([]);
  const initialValues =
    ngoProfile && type === "Update"
      ? {
          ...ngoProfile,
        }
      : ngosProfileFormDefaultValues;
  const router = useRouter();

  const form = useForm<z.infer<typeof ngosProfileFormSchema>>({
    resolver: zodResolver(ngosProfileFormSchema),
    defaultValues: initialValues,
  });
  //  Multistep
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <ProfileForm form={form} />,
      <DetailsForm form={form} />,
      <ContactsForm form={form} />,
      <ImageForm form={form} setFiles={setFiles} />,
      <Final />,
    ]);
  const titles = [
    "Profile Details",
    "Organization Information",
    "Contact Details",
    "Image form",
    "Complete",
  ];
  // export async function createNgoImage({
  //   title,
  //   imageUrl,
  //   ngoProfile,

  const { startUpload } = useUploadThing("imageUploader");

  async function onSubmit(values: z.infer<typeof ngosProfileFormSchema>) {
    if (!isLastStep) return next();
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newNgoProfile = await createNgoProfile({
          ngoProfile: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: "/profile",
        });

        if (newNgoProfile) {
          form.reset();
          // router.push(`/order_form/ngo-profile/${newNgoProfile._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!ngoProfileId) {
        router.back();
        return;
      }
      try {
        const updatedNgoProfile = await updateNgoProfile({
          ngoProfile: {
            ...values,
            imageUrl: uploadedImageUrl,
            _id: ngoProfileId,
          },
          userId,
          path: `/order_form/ngo-profile/${ngoProfileId}`,
        });

        if (updatedNgoProfile) {
          form.reset();
          // router.push(`/order_form/ngo-profile/${updatedNgoProfile._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  let currentStep = currentStepIndex + 1;
  console.log(currentStep);
  console.log(steps.length);

  return (
    <div className="mx-auto rounded-2xl bg-white pb-2 shadow-xl ">
      <div className="horizontal container mt-5 px-[20px]">
        <Stepper steps={titles} currentStep={currentStep} />

        <div className="my-10 p-10 ">
          <div
            style={{
              position: "relative",
              background: "white",
              border: "1px solid black",
              padding: "2rem",
              margin: "1rem",
              borderRadius: ".5rem",
              fontFamily: "Arial",
              // maxWidth: "max-content",
            }}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 flex flex-col gap-5 relative overflow-x-hidden"
              >
                {step}

                {/* This won't be in the steps---Its hidden */}
                <HiddenForm form={form} />

                <div
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    gap: ".5rem",
                    justifyContent: "flex-end",
                  }}
                >
                  {/* {!isFirstStep && (
                    <button type="button" onClick={back}>
                      Back
                    </button>
                  )} */}
                  {!isFirstStep && !isLastStep && (
                    <button type="button" onClick={back}>
                      Back
                    </button>
                  )}
                  {isLastStep && (
                    <Button
                      type="submit"
                      size="lg"
                      disabled={form.formState.isSubmitting}
                      className={cn("button col-span-2 w-full", {
                        // hidden: formStep == 1,
                      })}
                    >
                      {form.formState.isSubmitting
                        ? "Submitting..."
                        : `${type} Event `}
                    </Button>
                  )}
                  {/* {isLastStep && (
                    <button type="button" onClick={back}>
                      Finish
                    </button>
                  )} */}
                  {/* const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = */}

                  {/* Button for current step = 1 */}
                  <Button
                    type="button"
                    size="lg"
                    className={cn("button col-span-2 w-full", {
                      hidden: currentStep !== 1,
                    })}
                    variant={"ghost"}
                    onClick={() => {
                      // validation
                      form.trigger(["description"]);
                      form.trigger(["categoryId"]);
                      form.trigger(["priceId"]);
                      form.trigger(["name"]);
                      // const descriptionState =
                      //   form.getFieldState("description");
                      const nameState = form.getFieldState("name");

                      const categoryIdState = form.getFieldState("categoryId");
                      const priceIdState = form.getFieldState("priceId");
                      const descriptionState =
                        form.getFieldState("description");

                      if (!descriptionState.isDirty || descriptionState.invalid)
                        return;
                      if (!nameState.isDirty || nameState.invalid) return;
                      // if (!priceIdState.isDirty || priceIdState.invalid) return;
                      // if (!descriptionState.isDirty || descriptionState.invalid) return;
                      // if (!idState.isDirty || idState.invalid) return;

                      if (!isLastStep) return next();
                    }}
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  {/* Button for currentStep = 2 */}
                  <Button
                    type="button"
                    size="lg"
                    className={cn("button col-span-2 w-full", {
                      hidden: currentStep !== 2,
                    })}
                    variant={"ghost"}
                    onClick={() => {
                      // validation
                      form.trigger(["physicalAddress"]);
                      form.trigger(["telephoneNumber"]);
                      form.trigger(["postalAddress"]);
                      form.trigger(["email"]);

                      // states
                      const physicalAddressState =
                        form.getFieldState("physicalAddress");
                      const telephoneNumberState =
                        form.getFieldState("telephoneNumber");
                      const postalAddressState =
                        form.getFieldState("postalAddress");
                      const emailState = form.getFieldState("email");

                      // Checking if dirty/ not touched
                      if (
                        !physicalAddressState.isDirty ||
                        physicalAddressState.invalid
                      )
                        return;
                      if (!emailState.isDirty || emailState.invalid) return;
                      if (
                        !telephoneNumberState.isDirty ||
                        telephoneNumberState.invalid
                      )
                        return;
                      if (
                        !postalAddressState.isDirty ||
                        postalAddressState.invalid
                      )
                        return;

                      if (!isLastStep) return next();
                    }}
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    className={cn("button col-span-2 w-full", {
                      hidden: currentStep !== 3,
                    })}
                    variant={"ghost"}
                    onClick={() => {
                      // validation
                      form.trigger(["contactPersonName"]);
                      form.trigger(["contactPersonTitle"]);

                      // states
                      const contactPersonNameState =
                        form.getFieldState("contactPersonName");
                      const contactPersonTitleState =
                        form.getFieldState("contactPersonTitle");

                      // Checking if dirty/ not touched
                      if (
                        !contactPersonNameState.isDirty ||
                        contactPersonNameState.invalid
                      )
                        return;
                      if (
                        !contactPersonTitleState.isDirty ||
                        contactPersonTitleState.invalid
                      )
                        return;

                      if (!isLastStep) return next();
                    }}
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    className={cn("button col-span-2 w-full", {
                      hidden: currentStep !== 4,
                    })}
                    variant={"ghost"}
                    onClick={() => {
                      if (!isLastStep) return next();
                    }}
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NgoProfileForm;
