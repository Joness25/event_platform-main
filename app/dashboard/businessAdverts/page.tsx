import BusinessCollection from "@/components/dashboard/collections/BusinessCollection";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { getAllBusinessAds } from "@/lib/actions/business.actions";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const price = (searchParams?.price as string) || "";

  const businesses = await getAllBusinessAds({
    query: searchText,
    price,
    page,
    limit: 6,
  });

  // console.log(businesses)

  return (
    <>
      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          Trust by <br /> Thousands of Events
        </h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <BusinessCollection
          data={businesses?.data} //we send events.data
          emptyTitle="No Events Found" //what will be showing in case we dont have any events
          emptyStateSubtext="Come back later"
          collectionType="All_Events" //this collection is gonna be reusable and we are gonna resuseit for a couple of thhings
          limit={6}
          page={page}
          totalPages={businesses?.totalPages}
        />
      </section>
    </>
  );
}
