import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";
import { IProfile } from "@/lib/database/models/ngoprofile.model";
import { IoEyeOutline } from "react-icons/io5";

type CardProps = {
  ngoProfile: IProfile;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const NgoProfileCard = ({ ngoProfile, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === ngoProfile.organizer._id.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/events/${ngoProfile._id}`}
        style={{
          backgroundImage: `url(${
            ngoProfile.imageUrl || "/assets/images/cards/green3.jpg"
          })`,
        }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />
      {/* IS EVENT CREATOR ... */}

      {isEventCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link
            href={`/dashboard/businessAdverts/${ngoProfile._id}`}
            className=" text-red-500"
          >
            {/* change this image to view icon */}
            {/* <Image
            src="/assets/icons/edit.svg"
            alt="edit"
            width={20}
            height={20}
          /> */}
            <IoEyeOutline size={20} />
          </Link>

          <DeleteConfirmation eventId={ngoProfile._id} />
        </div>
      )}

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        {!hidePrice && (
          <div className=" gap-2">
            <p className="p-medium-16 p-medium-18 text-grey-500">
              {ngoProfile.price.pageType}
            </p>
            <p className="p-medium-16 p-medium-18 text-grey-500">
              paid amount:
              {ngoProfile.price.priceInKsh}
            </p>
          </div>
        )}

        <p className="p-medium-16 p-medium-18 text-grey-500">
          {formatDateTime(ngoProfile.createdAtt).dateTime}
        </p>

        {/* <Link href={`/events/${ngoProfile._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
            {ngoProfile.organizer.firstName}
          </p>
        </Link> */}

        <div className="flex-between w-full">
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
            {ngoProfile.organizer.firstName} {ngoProfile.organizer.lastName}
          </p>

          {hasOrderLink && (
            <Link
              href={`/orders?eventId=${ngoProfile._id}`}
              className="flex gap-2"
            >
              <p className="text-primary-500">Order Details</p>
              <Image
                src="/assets/icons/arrow.svg"
                alt="search"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NgoProfileCard;
