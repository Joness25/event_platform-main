import Collection from "@/components/shared/Collection";
import BusinessCollection from "@/components/shared/collections/BusinessCollection";
import NgoCollection from "@/components/shared/collections/NgoCollection";
import NgoProfileCollection from "@/components/shared/collections/NgoProfileCollection";
import { Button } from "@/components/ui/button";
import { getNgoProfilesByUser } from "@/lib/actions/NgoProfile.actions";
import { getBusinessAdsByUser } from "@/lib/actions/business.actions";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { getNgosByUser } from "@/lib/actions/ngoBasic.actions";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage });

  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
  const organizedEvents = await getEventsByUser({ userId, page: eventsPage });
  const businessAds = await getBusinessAdsByUser({ userId, page: eventsPage });
  const ngos = await getNgosByUser({ userId, page: eventsPage });
  const ngoProfiles = await getNgoProfilesByUser({ userId, page: eventsPage });

  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">Explore More Events</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={orderedEvents}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
      </section>

      {/* Events Organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create">Create New Event</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={organizedEvents?.data}
          emptyTitle="No events have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEvents?.totalPages}
        />
      </section>

      {/* Business Adverts bought */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/order_form/business/create">
              Create New Business Advertisement
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <BusinessCollection
          data={businessAds?.data} //we send events.data
          emptyTitle="No Events Found" //what will be showing in case we dont have any events
          emptyStateSubtext="Come back later"
          collectionType="All_Events" //this collection is gonna be reusable and we are gonna resuseit for a couple of thhings
          limit={6}
          page={1}
          totalPages={businessAds?.totalPages}
        />
      </section>

      {/* Basic information for ngos listed */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/order_form/ngo-basic/create">Get your NGO listed</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        <NgoProfileCollection
          data={ngoProfiles?.data} //we send events.data
          emptyTitle="No Ngo Profiles Found" //what will be showing in case we dont have any events
          emptyStateSubtext="Come back later"
          collectionType="All_Events" //this collection is gonna be reusable and we are gonna resuseit for a couple of thhings
          limit={6}
          page={1}
          totalPages={ngoProfiles?.totalPages}
        />
      </section>

      {/* Ngo profiles listed */}

      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/order_form/ngo-profile/create">
              Create New NGO Profile
            </Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        <NgoCollection
          data={ngos?.data} //we send events.data
          emptyTitle="No Events Found" //what will be showing in case we dont have any events
          emptyStateSubtext="Come back later"
          collectionType="All_Events" //this collection is gonna be reusable and we are gonna resuseit for a couple of thhings
          limit={6}
          page={1}
          totalPages={ngos?.totalPages}
        />
      </section>
    </>
  );
};

export default ProfilePage;
