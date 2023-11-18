const Adverts = require("../models/adverts")
const path = require("path");
const fs = require("fs")

const insert = (advertData) => {
    const adverts = new Adverts(advertData);

    return adverts.save();
};

const add_images = (folder,imageData)=>{

    const imageArray = [];
    const folderPath = path.join(__dirname,"../",`uploads/adverts/${folder}`)

    if(imageData.advert_images.length > 1){
        imageData.advert_images.forEach((image,index) => {

            const extension = path.extname(image.name)
            const imageName = `${Math.random()}${extension}`
            const imageSave = path.join(folderPath,imageName)
            const imageURL = {
                name : `${imageName}`,
                url :`uploads/adverts/${folder}/${imageName}`}
            imageArray.push(imageURL);

            const updatedImages = imageArray

            //! BURALAR İNCELENECEK ////
            // let advertImages = []
            // Adverts.findOne({_id : folder}).then((result)=>{
            //     console.log("result",result.advert_images)
            //     advertImages=result.advert_images
                
            // }).catch(err => console.log("erorr",err))
            
            // updatedImages.concat(advertImages)

            //! buraya kadar//////////////
            

            const sonuc =Adverts.findByIdAndUpdate(folder,{advert_images : updatedImages}).exec()

            console.log(sonuc)

            image.mv(imageSave,(err)=>{
                if(err) console.log("err =>",err)
                console.log('işlem başarılı :>> ' );
            })
        });
    }else{
        console.log("ananı avradını",imageData.advert_images)
            const imageName = imageData.advert_images.name
            const imageSave = path.join(folderPath,imageName)

            
    
            imageData.advert_images.mv(imageSave,(err)=>{
                if(err) console.log("err =>",err)
                console.log('işlem başarılı :>> ' );
            })
    }
  return "işlem başarılı"
}

const listAds = (id)=>{
    if(id){
        return Adverts.find({_id : id})
    }
    return Adverts.find({})
    
}

const deleteAds = (id)=>{
    return Adverts.findByIdAndDelete(id)
}

const updateAds = (id,updated) => {

    return Adverts.findOneAndUpdate(id,updated)
}

const updateImages = (id,updated_images) => {
    let advertImages = []
    Adverts.findOne({_id : id}).then((result)=>{
        console.log("result",result.advert_images)
        advertImages=result.advert_images
        
    }).catch(err => console.log("erorr",err))
    
    advertImages.push(updated_images)

    return Adverts.findOneAndUpdate({_id : id},{advert_images : advertImages});

}

module.exports={
    insert,
    listAds,
    add_images,
    deleteAds,
    updateAds,
    updateImages
}