"use client";

import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { IBusinessAd } from "@/lib/database/models/businessad.model";
import { Button } from "@/components/ui/button";
import { checkoutBusinessOrder } from "@/lib/actions/businessOrders";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({
  businessAd,
  userId,
}: {
  businessAd: IBusinessAd;
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
      title: businessAd.title,
      companyName: businessAd.companyName!,
      businessAdId: businessAd._id!,
      product: `${businessAd.price.pageType!} Advertisement`,
      description: `Get ${businessAd.price
        .pageType!} Advertisement for your business on our ebook`,
      price: businessAd.price.priceInUsd!,
      isFree: businessAd.isFree!,
      buyerId: userId!,
      databaseType: "BusinessOrder",
    };
    console.log(order);
    await checkoutBusinessOrder(order);
  };
  return (
    <form action={onCheckout} method="post">
      <Button type="submit" role="link" size="lg" className="button sm:w-fit">
        {businessAd.isFree ? "Get Ticket" : "Buy Ticket"}
      </Button>
    </form>
  );
};

export default Checkout;
