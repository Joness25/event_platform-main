import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IBusinessAd } from "@/lib/database/models/businessad.model";
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";

import { IoEyeOutline } from "react-icons/io5";

type CardProps = {
  businessAd: IBusinessAd;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const BusinessCard = ({ businessAd, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  // const isEventCreator = userId === businessAd.organizer._id.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/dashboard/business/${businessAd._id}`}
        style={{
          backgroundImage: `url(${
            businessAd.imageUrl || "/assets/images/cards/gray1.jpg"
          })`,
        }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      />
      {/* IS EVENT CREATOR ... */}

      {/* {isEventCreator && !hidePrice && ( */}
      <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
        <Link
          href={`/dashboard/businessAdverts/${businessAd._id}`}
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

        <DeleteConfirmation eventId={businessAd._id} />
      </div>
      {/* )} */}

      <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
        {!hidePrice && (
          <div className="flex gap-2">
            <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
              {businessAd.isFree ? "FREE" : `$${businessAd.price.priceInKsh}`}
            </span>
            <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
              {businessAd.price.pageType}
            </p>
          </div>
        )}

        <p className="p-medium-16 p-medium-18 text-grey-500">
          {formatDateTime(businessAd.createdAtt).dateTime}
        </p>

        {/* <Link href={`/events/${businessAd._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
            {businessAd.title}
          </p>
        </Link> */}

        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {businessAd.organizer.firstName} {businessAd.organizer.lastName}
          </p>

          {hasOrderLink && (
            <Link
              href={`/orders?eventId=${businessAd._id}`}
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

export default BusinessCard;
