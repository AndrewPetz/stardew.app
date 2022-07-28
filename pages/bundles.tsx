import { FilterIcon } from "@heroicons/react/outline";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import BundleCard from "../components/bundles/bundleCard";
import SidebarLayout from "../components/sidebarlayout";
import { useLocalStorageState } from "../hooks/use-local-storage";

import bundles from "../research/processors/bundles.json";
import {
  Bundle,
  BundleItem,
  communityCenter,
  CommunityCenterRoom,
} from "../types/bundles";

const Bundles: NextPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // Object.entries(communityCenter).map(([roomName, room]) => {
  //   const roomItems = Object.entries(room).map(([itemName, item]) => {
  //     const { itemsRequired, bundleReward } = item;
  //     return {
  //       roomName,
  //       itemName,
  //       itemsRequired,
  //       bundleReward,
  //     };
  //   });
  //   return roomItems;
  // });

  return (
    <>
      <Head>
        <title>stardew.app | Bundles</title>
      </Head>
      <SidebarLayout
        activeTab="Bundles"
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      >
        <div className="mx-auto flex max-w-screen-2xl flex-shrink-0 items-center justify-between px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            All Bundles
          </h1>
          <div>
            <label className="flex cursor-pointer flex-col items-center rounded-md border border-gray-300 bg-white p-1 text-white hover:border-gray-400 dark:border-[#2A2A2A] dark:bg-[#1F1F1F]">
              <span className="flex justify-between">
                {" "}
                <FilterIcon
                  className="h-5 w-5 text-black dark:bg-[#1F1F1F] dark:text-white"
                  aria-hidden="true"
                />
              </span>
            </label>
          </div>
        </div>
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 gap-4 py-4">
            {Object.entries(communityCenter).map(([roomName, room]) => (
              <div key={roomName} className="space-y-2">
                <div className="text-lg text-gray-900 dark:text-white">
                  {roomName}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {Object.entries(room).map(([bundleName, bundle]) => {
                    return (
                      <BundleCard
                        key={`${roomName}-${bundleName}`}
                        bundleName={bundleName}
                        bundle={bundle}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SidebarLayout>
    </>
  );
};

export default Bundles;
