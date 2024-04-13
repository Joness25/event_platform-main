"use client";

import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { Button } from "@/components/ui/button";
import { checkoutNgoProfileOrder } from "@/lib/actions/ngoProfileOrders";
import { IProfile } from "@/lib/database/models/ngoprofile.model";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({
  ngoProfile,
  userId,
}: {
  ngoProfile: IProfile;
  userId: string;
}) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const onCheckout = async () => {
    const order = {
      title: ngoProfile.title,
      name: ngoProfile.name!,
      ngoProfileId: ngoProfile._id!,
      product: `${ngoProfile.price.pageType!} profile`,
      description: `Get ${ngoProfile.price
        .pageType!} profile for your NGO on our ebook`,
      price: ngoProfile.price.priceInUsd!,
      isFree: ngoProfile.isFree!,
      buyerId: userId!,
      databaseType: "NgoProfileOrder",
    };
    console.log(order);
    await checkoutNgoProfileOrder(order);
  };
  return (
    <form action={onCheckout} method="post">
      <Button type="submit" role="link" size="lg" className="button sm:w-fit">
        {ngoProfile.isFree ? "Get Ticket" : "Buy Ticket"}
      </Button>
    </form>
  );
};

export default Checkout;
