import foodItemModel from "../model/foodItem.model.js";
import * as storageService from "../services/storage.service.js";
import { v4 as uuidv4 } from "uuid";

export async function createFood(req, res) {
  try {
        if (!req.file) {
        return res.status(400).json({ message: "File is required" });
        }
        if (!req.body.name) {
        return res.status(400).json({ message: "Name is required" });
        }

        // Upload file to ImageKit
        const fileUploadResult = await storageService.uploadFile(
        req.file.buffer,
        uuidv4()
        );

        // Create food item in DB
        const foodItem = await foodItemModel.create({
            name: req.body.name,
            video: fileUploadResult.url, // Store the URL returned by ImageKit
            description: req.body.description,
            foodPartner: req.foodPartner._id,
        });

        res.status(201).json({
            message: "Food item created successfully",
            food:  foodItem,
        });
  } catch (error) {
        console.error("Error creating food item:", error);
        res.status(500).json({
            message: "Failed to create food item",
            error: error.message,
        });
  }
}

export async function getAllFoodItems(req, res) {
    try{
        const foodItems = await foodItemModel.find({})
        res.status(200).json({
            message: "Food items fetched successfully",
            foodItems: foodItems,
        });
    }catch(error){
        console.error("Error fetching food items:", error);
        res.status(500).json({
            message: "Failed to fetch food items",
            error: error.message,
        });
    }
}