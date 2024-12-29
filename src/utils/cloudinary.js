import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

// process local path milega usko cloudinary pe rkho and delete from local 
// agar error hai to bhi delete from local

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY , 
    api_secret: process.env.API_SECRET
});

const uploadCloudinary = async (localPath)=> {
    try{
        if(!localPath) console.log("No local path found");
    const uploadResult = await cloudinary.uploader
       .upload( localPath ,{resource_type:'auto'} )
       .catch((error) => {
           console.log("Not able to upload on cloudinary");
       });
       fs.unlinkSync(localPath);
       return uploadResult.url ;
   

    }
    catch(err){
        fs.unlinkSync(localPath);
        console.log("error in uploading");
        return null;
    }      
};

export {uploadCloudinary};