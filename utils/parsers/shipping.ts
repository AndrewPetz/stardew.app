// https://github.com/MouseyPounds/stardew-checkup/blob/master/stardew-checkup.js#L2122
import shipping_items from "../../research/processors/data/shipment.json";
import crops from "../../research/processors/data/crops.json";

type itemID = string;

interface ReturnType {
  allItems: Record<string, number>;
  polyCrops?: Record<string, number>;
  uniqueShipments: number;
  monoculture: boolean;
  polyculture: boolean;
}

export function parseShipping(json: any): ReturnType {
  /*
    Achievements Relevant:
      - Full Shipment (ship every item).
      - Monoculture (ship 300 of one crop).
      - Polyculture (ship 15 of each crop).
  */

  let monoculture = false;
  let polyCnt = 0;
  let polyCrops: Record<itemID, number> = {};

  const allItems: Record<itemID, number> = {};
  for (const key in shipping_items) {
    allItems[key] = 0;
  }

  // check to see if ANY items have been shipped
  if (json.SaveGame.player.basicShipped === "")
    return {
      allItems,
      uniqueShipments: 0,
      monoculture,
      polyculture: polyCnt === 28,
    };

  let uniqueShipments = 0;
  // check to see if there are multiple types of items shipped
  if (typeof json.SaveGame.player.basicShipped.item.key === "undefined") {
    // multiple types of items shipped
    for (const idx in json.SaveGame.player.basicShipped.item) {
      let item = json.SaveGame.player.basicShipped.item[idx];
      let item_id = item.key.int.toString() as itemID;

      // some things you can ship but aren't items or don't count towards the achievement
      // like the items you ship on Mr. Qi's quest
      if (!allItems.hasOwnProperty(item_id)) continue;
      allItems[item_id] = item.value.int;
      if (item.value.int > 0) uniqueShipments++;

      // check for crops
      if (crops.hasOwnProperty(item_id)) {
        if (crops[item_id as keyof typeof crops].polyCrop) {
          // this counts towards polyculture so check if it's >= 15
          if (item.value.int >= 15) polyCnt++;
          else polyCrops[item_id] = item.value.int;
        }
        // only need one crop to be over 300 to get monoculture
        if (crops[item_id as keyof typeof crops].monoCrop) {
          if (item.value.int >= 300) monoculture = true;
        }
      }
    }
  } else {
    // TODO: duplicate the above code with minor modifications
    let item = json.SaveGame.player.basicShipped.item;
    let item_id = item.key.int.toString() as itemID;

    // some things you can ship but aren't items or don't count towards the achievement
    // like the items you ship on Mr. Qi's quest
    if (allItems.hasOwnProperty(item_id)) {
      allItems[item_id] = item.value.int;
      if (item.value.int > 0) uniqueShipments++;

      // check for crops
      if (crops.hasOwnProperty(item_id)) {
        if (!crops[item_id as keyof typeof crops].monoCrop) {
          // this counts towards polyculture so check if it's >= 15
          if (item.value.int >= 15) polyCnt++;
        }
        // only need one crop to be over 300 to get monoculture
        if (item.value.int >= 300) monoculture = true;
      }
    }
  }
  console.log(polyCnt);

  return {
    allItems,
    uniqueShipments,
    monoculture,
    polyculture: polyCnt === 28,
    polyCrops,
  };
}
