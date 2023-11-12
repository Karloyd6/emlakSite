const httpStatus = require("http-status");
const path = require("path")
const { insert, listAds, add_images, deleteAds, updateAds } = require("../services/adverts");
const {fileMaker,deleteFile} = require("../utils/scripts/manageFile");

//! LİST ADVERTS 'ALL & İD'//////
const index = (req,res)=>{
    listAds(req.params._id).then((list_response)=>{
        res.status(httpStatus.OK).send(list_response)
    }).catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err))
}


//! CREATE ADVERT////////////////////
const create = (req,res)=>{
    insert(req.body).then((create_res)=>{
       fileMaker(create_res._id.toString())
        res.status(httpStatus.CREATED).send(create_res)

    }).catch(err => console.log(err))
};

//! İMAGE UPLOAD WITH ID ///////////////////
const image_uploads = (req,res) => {

    console.log(req.params)
    console.log(req.files)

    const advertId = req.params._id;
    const imageData = req.files

    if(req.files){
        add_images(advertId,imageData)
        res.status(httpStatus.CREATED).send("Resim yükleme işlemi başarılıdır")
    }else{
        res.status(httpStatus.BAD_REQUEST).send("Yüklenecek resim dosyası bulunamadı")
    }


}

//! DELETE ADVERT BY ID ////////////////
const deleteAdvert = (req,res)=>{
    deleteFile(req.params._id)
    deleteAds(req.params._id).then((delete_req)=>{
        res.status(httpStatus.OK).send(delete_req)
        
    }).catch(err => res.status(httpStatus.BAD_REQUEST).send(err))
}

//! UPDATE ADVERT BY ID AND REQ.BODY //////////
const updateAdvert = (req,res) => {

    updateAds(req.params,req.body).then((update_res)=>{
        if(update_res._id){
           return res.status(httpStatus.CREATED).send(update_res)
        }
        res.status(httpStatus.NOT_FOUND).send({error : "kayıt bulunamadı"})
    }).catch((err)=>{
        res.status(httpStatus.BAD_REQUEST).send(err)
    })
}

module.exports = {
    index,
    create,
    image_uploads,
    deleteAdvert,
    updateAdvert
}