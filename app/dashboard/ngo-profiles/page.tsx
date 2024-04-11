import NgoProfileCollection from "@/components/dashboard/collections/NgoProfileCollection";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { getAllNgoProfiles } from "@/lib/actions/NgoProfile.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const price = (searchParams?.price as string) || "";

  const ngoProfiles = await getAllNgoProfiles({
    query: searchText,
    price,
    page,
    limit: 6,
  });

  console.log(ngoProfiles);

  return (
    <>
      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">All NGO profiles</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <NgoProfileCollection
          data={ngoProfiles?.data} //we send events.data
          emptyTitle="No Ngo Profiles Found" //what will be showing in case we dont have any events
          emptyStateSubtext="Come back later"
          collectionType="All_Events" //this collection is gonna be reusable and we are gonna resuseit for a couple of thhings
          limit={6}
          page={page}
          totalPages={ngoProfiles?.totalPages}
        />
      </section>
    </>
  );
}
