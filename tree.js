const fs = require('fs');
const path = require('path');


function treeFn(dirPath) {
    if (dirPath == undefined) {
        console.log("Enter directory path");
        return;
    }
    let doesExist = fs.existsSync(dirPath)

    if (doesExist) {
        treeHelper(dirPath,"")
    }
    else {
        console.log("Directory path not exist ");
        return;
    }
}

function treeHelper(dirPath, indent){
    let isFile = fs.lstatSync(dirPath).isFile();

    if(isFile){
        let fileName= path.basename(dirPath);
        console.log(indent+"|___"+fileName)
    }
    else{
        let dirName=path.basename(dirPath);
        console.log(indent+"---->"+dirName);

        let childrens=fs.readdirSync(dirPath);
        for(let i=0; i<childrens.length; i++){
            let childrenPath=path.join(dirPath,childrens[i]);
            treeHelper(childrenPath,indent+"\t");
        }
    }
}

module.exports={
    treeKey:treeFn
}