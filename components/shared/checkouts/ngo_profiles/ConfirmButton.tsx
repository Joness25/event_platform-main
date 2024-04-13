"use client";

import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { IBusinessAd } from "@/lib/database/models/businessad.model";
import { useTransition } from "react";
import { usePathname } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

import { checkoutOrder } from "@/lib/actions/order.actions";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function ConfirmButton({
  businessAd,
  userId,
}: {
  businessAd: IBusinessAd;
  userId: string;
}) {
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
      eventTitle: businessAd.price.pageType,
      eventId: businessAd._id,
      price: businessAd.price.priceInUsd,
      isFree: businessAd.isFree,
      buyerId: userId,
    };

    await checkoutOrder(order);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="button col-span-2 w-full bg-[#624CF5]"
        >
          Confirm
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription className="p-regular-16 text-grey-600">
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          {/* call check out button here */}
          <form action={onCheckout} method="post">
            <Button
              type="submit"
              role="link"
              size="lg"
              className="button sm:w-fit"
            >
              {businessAd.isFree ? "Get Ticket" : "Buy Ticket"}
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import Checkout from "./Checkout";

// export const ConfirmButton = ({ businessAdId }: { businessAdId: string }) => {
//   const pathname = usePathname();
//   let [isPending, startTransition] = useTransition();
//   const { user } = useUser();

//   const userId = user?.publicMetadata.userId as string;

//   return (
//     <AlertDialog>
//       <AlertDialogTrigger className="button col-span-2 w-full bg-[#624CF5]">
//         Confirm
//       </AlertDialogTrigger>

//       <AlertDialogContent className="bg-white">
//         <AlertDialogHeader>
//           <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
//           <AlertDialogDescription className="p-regular-16 text-grey-600">
//             This will permanently delete this event
//           </AlertDialogDescription>
//         </AlertDialogHeader>

//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>

//           <AlertDialogAction
//             onClick={() =>
//               startTransition(async () => {
//                 // await deleteEvent({ eventId, path: pathname });
//               })
//             }
//           >
//             <Checkout />
//             {isPending ? "Deleting..." : "Delete"}
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };
