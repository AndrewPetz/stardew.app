import json

with open("../raw_data/Crops.json", "r") as file:
    crop_data = json.load(file)
    crop_data = crop_data["content"]

with open("./data/objects.json", "r") as file:
    objects = json.load(file)


def uppercase(s: str) -> str:
    return s[0].upper() + s[1:]


polyCrops = set(
    [
        "Amaranth",
        "Artichoke",
        "Beet",
        "Blueberry",
        "Bok Choy",
        "Cauliflower",
        "Coffee Bean",
        "Corn",
        "Cranberries",
        "Eggplant",
        "Garlic",
        "Grape",
        "Green Bean",
        "Hops",
        "Hot Pepper",
        "Kale",
        "Melon",
        "Parsnip",
        "Potato",
        "Pumpkin",
        "Radish",
        "Red Cabbage",
        "Rhubarb",
        "Starfruit",
        "Strawberry",
        "Tomato",
        "Wheat",
        "Yam",
    ]
)

monoCrops = set(["Ancient Fruit", "Blue Jazz", "Fairy Rose", "Summer Spangle", "Tulip"])

crops = {}
for k, v in crop_data.items():
    fields = v.split("/")

    yieldID = fields[3]

    phases = [int(stage) for stage in fields[0].split(" ")]
    growthTime = sum(phases)
    regrowthTime = int(fields[4])

    seasons = [uppercase(season) for season in fields[1].split(" ")]

    harvestMethod = "Scythe" if fields[5] == "1" else "Hand"

    crops[yieldID] = {
        "itemID": int(yieldID),
        "name": objects[yieldID]["name"],
        "iconURL": objects[yieldID]["iconURL"],
        "description": objects[yieldID]["description"],
        "growthTime": growthTime,
        "regrowthTime": regrowthTime,
        "seasons": seasons,
        "harvestMethod": harvestMethod,
        "monoCrop": (objects[yieldID]["name"] in monoCrops)
        or (objects[yieldID]["name"] in polyCrops),
        "polyCrop": objects[yieldID]["name"] in polyCrops,
    }

with open("./data/crops.json", "w") as file:
    json.dump(crops, file, indent=4)
