
const helpObj=require("./help");
const treeObj=require("./tree")
const organizeObj=require("./organize")

let cmdInput = process.argv.slice(2);
let command = cmdInput[0];



switch (command) {
    case "tree":
        treeObj.treeKey(cmdInput[1]);
        break;

    case "organize":
        organizeObj.organizeKey(cmdInput[1]);
        break;

    case "help":
        helpObj.helpKey()
        break;

    default:
        console.log("Please enter valid command");
        break;
}





