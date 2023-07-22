const fs = require("fs");
const { XMLParser } = require("fast-xml-parser");

function findAllByKey(obj, keyToFind) {
    return Object.entries(obj)
      .reduce((acc, [key, value]) => (key === keyToFind)
        ? acc.concat(value)
        : (typeof value === 'object')
        ? acc.concat(findAllByKey(value, keyToFind))
        : acc
      , [])
  }
//https://stackoverflow.com/questions/54857222/find-all-values-by-specific-key-in-a-deep-nested-object
  
function findPlayerObjects(fileName) {
    const parser = new XMLParser({ ignoreAttributes: false });
    const jsonObj = parser.parse(fs.readFileSync(fileName));
    const playerObjects = [...findAllByKey(jsonObj, 'farmhand'), jsonObj.SaveGame.player]
    return playerObjects
}

// const playerObjects = findPlayerObjects("test")
// console.log(playerObjects)

// playerObjects.forEach((player)=> {
//     console.log(player.name)
// })






