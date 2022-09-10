import type { NextPage } from "next";

import objects from "../research/processors/data/objects.json";
import shipping from "../research/processors/data/shipment.json";
import crops from "../research/processors/data/crops.json";
import achievements from "../research/processors/data/achievements.json";

import AchievementCard from "../components/cards/achievementcard";
import InfoCard from "../components/cards/infocard";
import SidebarLayout from "../components/sidebarlayout";
import BooleanCard from "../components/cards/booleancard";
import CropSlideOver from "../components/slideovers/cropslideover";
import ObjectSlideOver from "../components/slideovers/objectslideover";
import FilterBtn from "../components/filterbtn";

import { useState } from "react";
import { useKV } from "../hooks/useKV";
import { useCategory } from "../utils/useCategory";
import Head from "next/head";

import { InformationCircleIcon } from "@heroicons/react/solid";

const Shipping: NextPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [hasUploaded] = useKV<boolean>("general", "uploadedFile", false);

  const [name] = useKV("general", "name", "Farmer");
  const [shipped, setShipped] = useKV("shipping", "uniqueShipments", 0);

  const [showCrop, setShowCrop] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<any>(
    Object.values(crops)[0]
  );

  const [showItem, setShowItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(
    Object.values(objects)[0]
  );

  const { data, error, isLoading } = useCategory("shipping", "number");
  const [_filter, setFilter] = useState<string>("off");

  return (
    <>
      <Head>
        <title>stardew.app | Shipping</title>
        <meta
          name="description"
          content="Track your Stardew Valley farm and forage progress. See what items you need to ship for 100% completion on Stardew Valley."
        />
        <meta
          name="og:description"
          content="Track your Stardew Valley farm and forage progress. See what items you need to ship for 100% completion on Stardew Valley."
        />
        <meta
          name="twitter:description"
          content="Track your Stardew Valley farm and forage progress. See what items you need to ship for 100% completion on Stardew Valley."
        />
        <meta
          name="keywords"
          content="stardew valley shipping tracker, stardew valley, stardew, stardew checkup, stardew shipping, stardew 100% completion, stardew perfection tracker, stardew, valley, stardew farm and forage, stardew farm, stardew forage"
        />
      </Head>
      <SidebarLayout
        activeTab="Shipping"
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      >
        <div className="mx-auto flex max-w-screen-2xl flex-shrink-0 items-center justify-between px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Shipping
          </h1>
        </div>
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8">
          <div>
            <h2 className="my-2 text-lg font-semibold text-gray-900 dark:text-white">
              Achievements
            </h2>
            {hasUploaded && (
              <InfoCard
                title={`${name} has shipped ${shipped} unique items.`}
                Icon={InformationCircleIcon}
              />
            )}

            <div className="mt-4 grid grid-cols-2 gap-4 xl:grid-cols-3">
              {Object.values(achievements)
                .filter((achievement) => achievement.category === "shipping")
                .map((achievement) => (
                  <AchievementCard
                    id={achievement.id}
                    tag={"achievements"}
                    key={achievement.id}
                    title={achievement.name}
                    description={achievement.description}
                    sourceURL={achievement.iconURL}
                  />
                ))}
            </div>
          </div>
          <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            All Items to Ship
          </h2>

          {/* Filter Buttons */}
          <div className="mt-2 flex items-center space-x-4">
            <FilterBtn
              _filter={_filter}
              setFilter={setFilter}
              targetState="true"
              title="Shipped Item"
            />
            <FilterBtn
              _filter={_filter}
              setFilter={setFilter}
              targetState="false"
              title="Unshipped Item"
            />
          </div>
          {/* End Filter Buttons */}

          <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 xl:grid-cols-4">
            {isLoading || error || !hasUploaded
              ? Object.keys(shipping).map((id) => (
                  <BooleanCard
                    key={id}
                    category="shipping"
                    setCount={setShipped}
                    setSelected={
                      crops.hasOwnProperty(id)
                        ? setSelectedCrop
                        : setSelectedItem
                    }
                    setShow={
                      crops.hasOwnProperty(id) ? setShowCrop : setShowItem
                    }
                    itemObject={
                      crops.hasOwnProperty(id)
                        ? crops[id as keyof typeof crops]
                        : objects[id as keyof typeof objects]
                    }
                  />
                ))
              : Object.keys(data)
                  .filter((key) => {
                    if (_filter === "off") return true;
                    else return data[key] === JSON.parse(_filter);
                  })
                  .map((id) => (
                    <BooleanCard
                      key={id}
                      category="shipping"
                      setCount={setShipped}
                      setSelected={
                        crops.hasOwnProperty(id)
                          ? setSelectedCrop
                          : setSelectedItem
                      }
                      setShow={
                        crops.hasOwnProperty(id) ? setShowCrop : setShowItem
                      }
                      itemObject={
                        crops.hasOwnProperty(id)
                          ? crops[id as keyof typeof crops]
                          : objects[id as keyof typeof objects]
                      }
                    />
                  ))}
          </div>
        </div>
      </SidebarLayout>

      <CropSlideOver
        isOpen={showCrop}
        selected={selectedCrop}
        setCount={setShipped}
        setOpen={setShowCrop}
      />

      <ObjectSlideOver
        isOpen={showItem}
        selected={selectedItem}
        setCount={setShipped}
        setOpen={setShowItem}
      />
    </>
  );
};

export default Shipping;
