// https://github.com/MouseyPounds/stardew-checkup/blob/master/stardew-checkup.js#L2122
import shipping_items from "../../research/processors/data/shipment.json";
import crops from "../../research/processors/data/crops.json";

type itemID = string;

interface ReturnType {
  allItems: Record<string, number>;
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
  let polyculture = false;
  const allItems: Record<itemID, number> = {};
  for (const key in shipping_items) {
    allItems[key] = 0;
  }

  // check to see if ANY items have been shipped
  if (json.SaveGame.player.basicShipped === "")
    return { allItems, uniqueShipments: 0, monoculture, polyculture };

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
        // TODO: EDIT CROPS.JSON TO HAVE MONOCULTURE FLAG INSTEAD OF POLYCULTURE
        // TODO: check if monoculture is false, if so, check the count and make
        //       sure it is over 15 for each crop that is !monoculture.
        // TODO: for each crop, we want to check if at least one has a count
        //       of 300 or more. If so, set monoculture to true.
      }
    }
  } else {
    // only one type of item shipped
    // TODO: duplicate the above code with minor modifications
    let item = json.SaveGame.player.basicShipped.item;
    let item_id = item.key.int.toString() as itemID;

    if (!allItems.hasOwnProperty(item_id))
      return { allItems, uniqueShipments, monoculture, polyculture };
    allItems[item_id] = item.value.int;
    if (item.value.int > 0) uniqueShipments++;
  }

  return { allItems, uniqueShipments, monoculture, polyculture };
}
