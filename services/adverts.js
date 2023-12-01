const Adverts = require("../models/adverts")
const path = require("path");
const fs = require("fs")

const insert = (advertData) => {
    
    const adverts = new Adverts(advertData);

    return adverts.save();
};



const add_images = async (folder,imageData) => {
    const savedImageArray = [];
    const folderPath = path.join(__dirname,"../",`uploads/adverts/${folder}`)

    //! HAVE CURRENT IMAGES ?///////////
    await Adverts.findOne({_id : folder}).then((find_response)=>{
        find_response.advert_images.forEach((value)=>{
            savedImageArray.push(value);
        })
    }).catch(err => console.log("findResponseError",err))
    //! MULTİPLE OR SİNGLE /////////////
    if(imageData.advert_images.length > 1){
        imageData.advert_images.forEach((image)=>{
            const extension = path.extname(image.name);
            const imgName = `${Math.random()}${extension}`;
            const imgUrl = {
                name : imgName,
                url: `uploads/adverts/${folder}/${imgName}`
            }

            savedImageArray.push(imgUrl);

            //! ADD TO FOLDER //////////
            const imgLocation = path.join(folderPath,imgName);
            image.mv(imgLocation,(err)=>{
                if(err) console.log("err =>",err)
                console.log('işlem başarılı :>> ' );
            })
        })
    }else{
        const extension = path.extname(imageData.advert_images.name);
        const imgName = `${Math.random()}${extension}`;
        const imgUrl = {
            name : imgName,
            url : `uploads/adverts/${folder}/${imgName}`
        }

        savedImageArray.push(imgUrl)

        //! ADD TO FOLDER //////////
        const imgLocation = path.join(folderPath,imgName);
        imageData.advert_images.mv(imgLocation,(err)=>{
            if(err) console.log("err =>",err)
            console.log('işlem başarılı :>> ' );
        })

    }
    

    //! SAVE DATABASE //////////////////
    const dbResponse =await Adverts.findByIdAndUpdate({_id : folder}, {advert_images : savedImageArray}).exec()

    console.log("dbResponse",dbResponse)
    return dbResponse;

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


    return Adverts.findOneAndUpdate({_id : id},{advert_images : updated_images});

}

module.exports={
    insert,
    listAds,
    add_images,
    deleteAds,
    updateAds,
    updateImages
}