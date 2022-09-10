import type { NextPage } from "next";
import type { CraftingRecipe } from "../types/recipes";

import achievements from "../research/processors/data/achievements.json";
import crafting_recipes from "../research/processors/data/crafting_recipes.json";

import AchievementCard from "../components/cards/achievementcard";
import InfoCard from "../components/cards/infocard";
import SidebarLayout from "../components/sidebarlayout";
import RecipeCard from "../components/cards/recipecard";
import RecipeSlideOver from "../components/slideovers/recipeslideover";
import FilterBtn from "../components/filterbtn";

import { useState } from "react";
import { useKV } from "../hooks/useKV";
import { useCategory } from "../utils/useCategory";
import Head from "next/head";

import { InformationCircleIcon } from "@heroicons/react/solid";

// a mapping of achievements and their requirements
const requirements: Record<string, number> = {
  "D.I.Y.": 15,
  Artisan: 30,
  "Craft Master": 129,
};

const Crafting: NextPage = () => {
  const { data, error, isLoading } = useCategory("crafting", "number");
  const [_filter, setFilter] = useState<string>("off");

  const [hasUploaded] = useKV<boolean>("general", "user", false);

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [showRecipe, setShowRecipe] = useState<boolean>(false);

  const [name] = useKV("general", "name", "Farmer");
  const [craftedCount, setCraftedCount] = useKV("crafting", "craftedCount", 0);
  const [knownCount, setKnownCount] = useKV("crafting", "knownCount", 0);

  const [selectedRecipe, setSelectedRecipe] = useState<CraftingRecipe>(
    Object.values(crafting_recipes)[0]
  );

  return (
    <>
      <Head>
        <title>stardew.app | Crafting</title>
        <meta
          name="description"
          content="Track your Stardew Valley crafting recipe progress. See what recipes you need to craft for 100% completion on Stardew Valley."
        />
        <meta
          name="og:description"
          content="Track your Stardew Valley crafting recipe progress. See what recipes you need to craft for 100% completion on Stardew Valley."
        />
        <meta
          name="twitter:description"
          content="Track your Stardew Valley crafting recipe progress. See what recipes you need to craft for 100% completion on Stardew Valley."
        />
        <meta
          name="keywords"
          content="stardew valley crafting tracker, stardew valley, stardew, stardew checkup, stardew crafting, stardew 100% completion, stardew perfection tracker, stardew, valley"
        />
        d
      </Head>
      <SidebarLayout
        activeTab="Crafting"
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      >
        <div className="mx-auto flex max-w-screen-2xl flex-shrink-0 items-center justify-between px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Crafting
          </h1>
        </div>
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8">
          <div>
            <h2 className="my-2 text-lg font-semibold text-gray-900 dark:text-white">
              Achievements
            </h2>
            <InfoCard
              title={`${name} knows how to craft ${knownCount}/129 recipes and has crafted ${craftedCount}/129 recipes.`}
              Icon={InformationCircleIcon}
            />
            <div className="mt-4 grid grid-cols-2 gap-4 xl:grid-cols-3">
              {Object.values(achievements)
                .filter((achievement) => achievement.category === "crafting")
                .map((achievement) => (
                  <AchievementCard
                    id={achievement.id}
                    tag={"achievements"}
                    key={achievement.id}
                    title={achievement.name}
                    description={achievement.description}
                    additionalDescription={
                      craftedCount >= requirements[achievement.name]
                        ? ""
                        : ` - ${80 - craftedCount} left!`
                    }
                    sourceURL={achievement.iconURL}
                    initialChecked={
                      craftedCount >= requirements[achievement.name]
                    }
                  />
                ))}
            </div>
          </div>
          <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            {_filter === "off"
              ? "All Items to Craft"
              : {
                  "0": "Unknown Item",
                  "1": "Known Item",
                  "2": "Crafted Item",
                }[_filter]}
          </h2>

          {/* Filter Buttons */}
          <div className="mt-2 flex items-center space-x-4">
            <FilterBtn
              _filter={_filter}
              setFilter={setFilter}
              targetState="2"
              title="Crafted Item"
            />
            <FilterBtn
              _filter={_filter}
              setFilter={setFilter}
              targetState="1"
              title="Known Item"
            />
            <FilterBtn
              _filter={_filter}
              setFilter={setFilter}
              targetState="0"
              title="Unknown Item"
            />
          </div>
          {/* End Filter Buttons */}

          <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 xl:grid-cols-4">
            {isLoading || error
              ? Object.values(crafting_recipes).map((recipe: any) => (
                  <RecipeCard
                    key={recipe.itemID}
                    category={"crafting"}
                    recipe={recipe}
                    setSelectedRecipe={setSelectedRecipe}
                    setShowRecipe={setShowRecipe}
                    setKnownCount={setKnownCount}
                    setCompletedCount={setCraftedCount}
                  />
                ))
              : Object.keys(data)
                  .filter((key) => {
                    if (_filter === "off") {
                      return true;
                    } else {
                      return data[key] === JSON.parse(_filter);
                    }
                  })
                  .map((recipeID) => (
                    <RecipeCard
                      key={recipeID}
                      category={"crafting"}
                      recipe={
                        crafting_recipes[
                          recipeID as keyof typeof crafting_recipes
                        ]
                      }
                      setSelectedRecipe={setSelectedRecipe}
                      setShowRecipe={setShowRecipe}
                      setKnownCount={setKnownCount}
                      setCompletedCount={setCraftedCount}
                    />
                  ))}
          </div>
        </div>
      </SidebarLayout>

      <RecipeSlideOver
        isOpen={showRecipe}
        category={"crafting"}
        selected={selectedRecipe}
        setOpen={setShowRecipe}
        setCompletedCount={setCraftedCount}
        setKnownCount={setKnownCount}
      />
    </>
  );
};

export default Crafting;
