import { parseShipping } from "../utils";
import year3 from "./SaveFiles/year3.json";
import new_file from "./SaveFiles/new.json";
import max_file from "./SaveFiles/max.json";

describe("Parse Full Shipment", () => {
  it("Returns an object with all items from the Collections tab and how many they've shipped", () => {
    const { allItems, uniqueShipments } = parseShipping(year3);
    expect(Object.keys(allItems).length).toBe(145);
    expect(uniqueShipments).toBe(137);

    const { allItems: is2, uniqueShipments: ni2 } = parseShipping(new_file);
    expect(Object.keys(is2).length).toBe(145);
    expect(ni2).toBe(0);

    const { allItems: is3, uniqueShipments: ni3 } = parseShipping(max_file);
    expect(Object.keys(is3).length).toBe(145);
    expect(ni3).toBe(145);
  });
});
