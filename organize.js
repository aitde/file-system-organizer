const fs = require('fs');
const path = require('path');

let types = {
    media: ["mp4", "mkv", "mp3", "jpg", "jpeg"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: ["docx","doc","pdf","xlsx","xls","odt","ods","odp","odg","odf","txt","ps","tex",],
    apps: ["exe", "dmg", "pkg", "deb"],
};

function organizeFn(dirPath) {
    if (dirPath == undefined) {
        console.log("Enter directory path");
        return;
    }
    let doesExist = fs.existsSync(dirPath)

    if (doesExist) {
        let destPath = path.join(dirPath, "organized_files");

        if (fs.existsSync(destPath) == false) {
            fs.mkdirSync(destPath);
        }

        organizerHelper(dirPath, destPath)
    }
    else {
        console.log("Directory path not exist ");
        return;
    }

}

function organizerHelper(src, dest) {
    let childNames = fs.readdirSync(src);

    for (let i = 0; i < childNames.length; i++) {
        let childPath = path.join(src, childNames[i])

        let checkForFile = fs.lstatSync(childPath).isFile();
        if(checkForFile){
            let category=getCategory(childNames[i]);
            sendFile(childPath,dest,category);
        }
    }
}

function getCategory(name){
    let ext=path.extname(name)
    ext=ext.slice(1)
    
    for(let type in types){
        let crntTypeArr=types[type];
        for(let i=0; i<crntTypeArr.length; i++){
            if(ext==crntTypeArr[i]){
                return type;
            }
        }
    }
    return 'others';
}

function sendFile(srcFilePath,destination, category){
    let destPath=path.join(destination,category);
    if(fs.existsSync(destPath)==false){
        fs.mkdirSync(destPath);
    }

    let fileName= path.basename(srcFilePath);
    let destFilePath= path.join(destPath,fileName);

    fs.copyFileSync(srcFilePath,destFilePath);
    fs.unlinkSync(srcFilePath);
}

module.exports={
    organizeKey:organizeFn
}