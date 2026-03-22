import foodItemModel from "../model/foodItem.model.js";
import * as storageSevice from "../services/storage.service.js"     //used imagekit to store file
import { v4 as uuidv4 } from "uuid";            // for generating unique file name
import config from "../config/config.js";

export async function createFood(req,res) {
    console.log(req.foodPartner);
    console.log(req.body);
    console.log(req.file);

    const fileUploadResult = await storageSevice.uploadFile(
        req.file.buffer,
        uuidv4()
    )
    
    
    
    console.log(fileUploadResult);
    res.send("created")
    
}