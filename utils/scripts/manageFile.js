const fs = require("fs")
const path = require("path")



const fileMaker =(fileName)=>{
    const filePath = path.join(__dirname,"../../uploads/adverts",fileName)
    fs.mkdir(filePath,(err)=>{
        if(err){
            console.log('mkdir_err :>> ', err);
        }
    })
}   

const deleteFile = (fileName)=> {
    const filePath = path.join(__dirname,"../../uploads/adverts",fileName)
    fs.rm(filePath,{ recursive: true },(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log(`deleted file : ${filePath}`)
        }
    })
    
}




module.exports={
    fileMaker,
    deleteFile,
}