function helpFn() {
    let helpMe = `List all commands:
    1. Fo.js tree dirPath
    2. Fo.js organize dirPath
    3. Fo.js help
    `;
    console.log(helpMe)
}

module.exports={
    helpKey:helpFn
}