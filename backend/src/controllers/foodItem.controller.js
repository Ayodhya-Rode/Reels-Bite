import foodItemModel from "../model/foodItem.model.js";
import * as storageService from "../services/storage.service.js";
import { v4 as uuidv4 } from "uuid";
import likeModel from "../model/like.model.js";
import savedItemModel from "../model/savedItem.model.js";

export async function createFood(req, res) {
  try {
        if (!req.file) {
        return res.status(400).json({
        error: true,
        type: "VALIDATION_ERROR",
        message: "File is required"
      });

        }
        if (!req.body.name) {
        return res.status(400).json({
        error: true,
        type: "VALIDATION_ERROR",
        message: "Name is required"
         });
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

         return res.status(201).json({
      success: true,
      type: "FOOD_ITEM_CREATED",
      message: "Food item created successfully",
      food: foodItem,
    });

  } catch (error) {
        console.error("Error creating food item:", error);
        return res.status(500).json({
      error: true,
      type: "SERVER_ERROR",
      message: "Failed to create food item"
    });

  }
}

export async function getAllFoodItems(req, res) {
  try {
    const foodItems = await foodItemModel.find({});
    return res.status(200).json({
      success: true,
      type: "FOOD_ITEMS_FETCHED",
      message: "Food items fetched successfully",
      foodItems,
    });
  } catch (error) {
    console.error("Error fetching food items:", error);
    return res.status(500).json({
      error: true,
      type: "SERVER_ERROR",
      message: "Failed to fetch food items"
    });
  }
}

export async function likeFoodItem(req, res) {
  try {
    const { foodId } = req.body;
    const user = req.user;

    if (!foodId) {
      return res.status(400).json({
        success: false,
        message: "foodId is required"
      });
    }

    let isLiked = false;

    // 🔍 check existing like
    const existingLike = await likeModel.findOne({
      user: user._id,
      food: foodId
    });

    if (existingLike) {
      // ❌ UNLIKE
      await likeModel.deleteOne({
        user: user._id,
        food: foodId
      });

      await foodItemModel.findByIdAndUpdate(
        foodId,
        { $inc: { likeCount: -1 } }
      );

      isLiked = false;

    } else {
      // ✅ LIKE (handle duplicate safely)
      try {
        await likeModel.create({
          user: user._id,
          food: foodId
        });

        await foodItemModel.findByIdAndUpdate(
          foodId,
          { $inc: { likeCount: 1 } }
        );

        isLiked = true;

      } catch (err) {
        // 🔥 duplicate key error (user clicked too fast)
        if (err.code === 11000) {
          isLiked = true; // already liked
        } else {
          throw err;
        }
      }
    }

    // 🔥 ALWAYS RETURN LATEST COUNT
    const updatedFood = await foodItemModel
      .findById(foodId)
      .select("likeCount");

    return res.status(200).json({
      success: true,
      isLiked,
      likeCount: Math.max(0, updatedFood?.likeCount || 0)
    });

  } catch (error) {
    console.error("Error liking food item:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to like food item"
    });
  }
}

export async function saveFoodItem(req, res) {
  try {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await savedItemModel.findOne({
      user: user._id,
      food: foodId
    });

    let isSaved;

    if (isAlreadySaved) {
      await savedItemModel.deleteOne({
        user: user._id,
        food: foodId
      });

      await foodItemModel.findByIdAndUpdate(
        foodId,
        { $inc: { saveCount: -1 } }
      );

      isSaved = false;
    } else {
      await savedItemModel.create({
        user: user._id,
        food: foodId
      });

      await foodItemModel.findByIdAndUpdate(
        foodId,
        { $inc: { saveCount: 1 } }
      );

      isSaved = true;
    }

    // 🔥 return updated count
    const updatedFood = await foodItemModel
      .findById(foodId)
      .select("saveCount");

    return res.status(200).json({
      success: true,
      isSaved,
      saveCount: updatedFood.saveCount
    });

  } catch (error) {
    console.error("Error saving food item:", error);

    return res.status(500).json({
      error: true,
      message: "Failed to save food item"
    });
  }
}

// import savedItemModel from "../models/savedItemModel.js";
// import foodItemModel from "../models/foodItemModel.js";

// export async function saveFoodItem(req, res) {
//   try {
//     const { foodId } = req.body;
//     const user = req.user;

//     if (!foodId) {
//       return res.status(400).json({
//         success: false,
//         message: "foodId is required"
//       });
//     }

//     let isSaved = false;

//     // 🔍 check existing save
//     const existingSave = await savedItemModel.findOne({
//       user: user._id,
//       food: foodId
//     });

//     if (existingSave) {
//       // ❌ UNSAVE
//       await savedItemModel.deleteOne({
//         user: user._id,
//         food: foodId
//       });

//       await foodItemModel.findByIdAndUpdate(
//         foodId,
//         { $inc: { saveCount: -1 } }
//       );

//       isSaved = false;

//     } else {
//       // ✅ SAVE (handle duplicate safely)
//       try {
//         await savedItemModel.create({
//           user: user._id,
//           food: foodId
//         });

//         await foodItemModel.findByIdAndUpdate(
//           foodId,
//           { $inc: { saveCount: 1 } }
//         );

//         isSaved = true;

//       } catch (err) {
//         // 🔥 duplicate click protection
//         if (err.code === 11000) {
//           isSaved = true;
//         } else {
//           throw err;
//         }
//       }
//     }

//     // 🔥 ALWAYS RETURN UPDATED COUNT
//     const updatedFood = await foodItemModel
//       .findById(foodId)
//       .select("saveCount");

//     return res.status(200).json({
//       success: true,
//       isSaved,
//       saveCount: Math.max(0, updatedFood?.saveCount || 0)
//     });

//   } catch (error) {
//     console.error("Error saving food item:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to save food item"
//     });
//   }
// }