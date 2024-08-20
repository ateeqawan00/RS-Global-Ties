import { uploadImages } from "../utils/cloudinaryConfig.js";
import Product from "../models/ProductDetail.js";
import Subscription from "../models/Subscription.js";
import User from "../models/User.js";
import CompanyProfile from "../models/CompanyProfile.js";


export const createProduct = async (req, res, next) => {
  try {
    const { productName, productCategory, productSubcategory, price, description } = req.body;
    const userId = req.user._id;

    if (!productName || !productCategory || !price || !userId || !description) {
      const error = new Error(
        "Product name, category, price, and userId are required"
      );
      error.status = 400;
      throw error;
    }

    if (!req.files || req.files.length === 0) {
      const error = new Error("At least one product image is required");
      error.status = 400;
      throw error;
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found.",
      });
    }

    const companyProfile = await CompanyProfile.findOne({ userId });
    if (!companyProfile) {
      return res.status(403).json({
        error: "Users without a company profile cannot add products.",
      });
    }

    const imageUrls = await uploadImages(req.files);
   
    const subscriptionPlan = Subscription.planKey;

    const newProduct = await Product.create({
      userId,
      productName,
      productCategory,
      productSubcategory, 
      price,
      description,
      productImages: imageUrls.map(image => image.url), 
      subscriptionPlan, 
    });

    const populatedProduct = await Product.findById(newProduct._id)
      .populate({
        path: "userId",
        select: "fullName accountType",
      })
      .exec();

    res.status(201).json(populatedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    next(error);
  }
};



export const getUserProducts = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const userProducts = await Product.find(
      { userId: userId },
      { price: 0, __v: 0 }
    ).exec();

    const subscription = await Subscription.findOne(
      { userId },
      { _id: 0, __v: 0 }
    ).exec();

    const userWithProducts = {
      products: userProducts,
      subscription: subscription || null,
    };

    res.status(200).json(userWithProducts);
  } catch (error) {
    console.error("Error while fetching user products:", error);
    next(error);
  }
};


export const getSingluserProduct = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log("UserID:", userId);

    const user = await User.findById(userId).select('-password').exec(); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userProducts = await Product.find({ userId: userId }).exec();
    const userWithProducts = {
      user: user,
      products: userProducts,
    };

    res.status(200).json(userWithProducts);
  } catch (error) {
    console.error("Error while fetching user products:", error);
    next(error);
  }
};



export const fetchPremiumProducts = async (req, res, next) => {
  try {
      let premiumProducts;

      // Check if category is provided in the query parameters
      const { category } = req.query;

      if (category) {
          // Fetch premium products based on the provided category
          premiumProducts = await Product.aggregate([
              // Aggregation pipeline to filter premium products by category
              {
                  $group: {
                      _id: "$userId",
                      latestProduct: { $last: "$$ROOT" },
                  },
              },
              {
                  $lookup: {
                      from: "subscriptions",
                      localField: "latestProduct.userId",
                      foreignField: "userId",
                      as: "subscription",
                  },
              },
              {
                  $match: {
                      "subscription.planKey": "platinum",
                      "latestProduct.productCategory": category // Filter by product category
                  },
              },
              {
                  $lookup: {
                      from: "users",
                      localField: "_id",
                      foreignField: "_id",
                      as: "user",
                  },
              },
              {
                  $lookup: {
                      from: "subcategories",
                      localField: "latestProduct.productSubcategory",
                      foreignField: "_id",
                      as: "subcategory",
                  },
              },
              {
                  $addFields: {
                      "latestProduct.productSubcategory": { $arrayElemAt: ["$subcategory", 0] },
                  },
              },
              {
                  $project: {
                      _id: "$latestProduct._id",
                      productName: "$latestProduct.productName",
                      productCategory: "$latestProduct.productCategory",
                      productSubcategory: "$latestProduct.productSubcategory",
                      price: "$latestProduct.price",
                      description: "$latestProduct.description",
                      productImages: "$latestProduct.productImages",
                      userId: "$latestProduct.userId",
                      subscriptionPlan: { $arrayElemAt: ["$subscription.planKey", 0] },
                      user: { $arrayElemAt: ["$user", 0] },
                  },
              },
          ]);
      } else {
       
          premiumProducts = await Product.aggregate([
              
              {
                  $group: {
                      _id: "$userId",
                      latestProduct: { $last: "$$ROOT" },
                  },
              },
              {
                  $lookup: {
                      from: "subscriptions",
                      localField: "latestProduct.userId",
                      foreignField: "userId",
                      as: "subscription",
                  },
              },
              {
                  $match: {
                      "subscription.planKey": "platinum"
                  },
              },
              {
                  $lookup: {
                      from: "users",
                      localField: "_id",
                      foreignField: "_id",
                      as: "user",
                  },
              },
              {
                  $lookup: {
                      from: "subcategories",
                      localField: "latestProduct.productSubcategory",
                      foreignField: "_id",
                      as: "subcategory",
                  },
              },
              {
                  $addFields: {
                      "latestProduct.productSubcategory": { $arrayElemAt: ["$subcategory", 0] },
                  },
              },
              {
                  $project: {
                      _id: "$latestProduct._id",
                      productName: "$latestProduct.productName",
                      productCategory: "$latestProduct.productCategory",
                      productSubcategory: "$latestProduct.productSubcategory",
                      price: "$latestProduct.price",
                      description: "$latestProduct.description",
                      productImages: "$latestProduct.productImages",
                      userId: "$latestProduct.userId",
                      subscriptionPlan: { $arrayElemAt: ["$subscription.planKey", 0] },
                      user: { $arrayElemAt: ["$user", 0] },
                  },
              },
          ]).limit(10); 
      }

      res.status(200).json(premiumProducts);
  } catch (error) {
      console.error("Error fetching products by category:", error);
      next(error);
  }
};

export const fetchGoldAndSilverProducts = async (req, res, next) => {
  try {
      let goldAndSilverProducts;

      const { category } = req.query;

      if (category) {
         
          goldAndSilverProducts = await Product.aggregate([
             
              {
                  $group: {
                      _id: "$userId",
                      latestProduct: { $last: "$$ROOT" },
                  },
              },
              {
                  $lookup: {
                      from: "subscriptions",
                      localField: "latestProduct.userId",
                      foreignField: "userId",
                      as: "subscription",
                  },
              },
              {
                  $match: {
                      "subscription.planKey": { $in: ["gold", "silver"] }, 
                      "latestProduct.productCategory": category 
                  },
              },
              {
                  $lookup: {
                      from: "users",
                      localField: "_id",
                      foreignField: "_id",
                      as: "user",
                  },
              },
              {
                  $project: {
                      _id: "$latestProduct._id",
                      productName: "$latestProduct.productName",
                      productCategory: "$latestProduct.productCategory",
                      productSubcategory: { $arrayElemAt: ["$subcategories.name", 0] },
                      price: "$latestProduct.price",
                      description: "$latestProduct.description",
                      productImages: "$latestProduct.productImages",
                      userId: "$latestProduct.userId",
                      subscriptionPlan: { $arrayElemAt: ["$subscription.planKey", 0] }, // Adjusted to use planKey
                      user: { $arrayElemAt: ["$user", 0] },
                  },
              },
          ]);
      } else {
         
          goldAndSilverProducts = await Product.aggregate([
             
              {
                  $group: {
                      _id: "$userId",
                      latestProduct: { $last: "$$ROOT" },
                  },
              },
              {
                  $lookup: {
                      from: "subscriptions",
                      localField: "latestProduct.userId",
                      foreignField: "userId",
                      as: "subscription",
                  },
              },
              {
                  $match: {
                      "subscription.planKey": { $in: ["gold", "silver"] } 
                  },
              },
              {
                  $lookup: {
                      from: "users",
                      localField: "_id",
                      foreignField: "_id",
                      as: "user",
                  },
              },
              {
                  $project: {
                      _id: "$latestProduct._id",
                      productName: "$latestProduct.productName",
                      productCategory: "$latestProduct.productCategory",
                      productSubcategory: { $arrayElemAt: ["$subcategories.name", 0] },
                      price: "$latestProduct.price",
                      description: "$latestProduct.description",
                      productImages: "$latestProduct.productImages",
                      userId: "$latestProduct.userId",
                      subscriptionPlan: { $arrayElemAt: ["$subscription.planKey", 0] }, 
                      user: { $arrayElemAt: ["$user", 0] },
                  },
              },
          ]).limit(10); 
      }

      res.status(200).json(goldAndSilverProducts);
  } catch (error) {
      console.error("Error fetching gold and silver products:", error);
      next(error);
  }
};



// export const getLatestPremiumProducts = async (req, res, next) => {
//   try {
//     // Find users with premium subscriptions
//     const premiumUsers = await Subscription.find({ plan: 'premium' }, 'userId').exec();

//     // Extract user IDs from premiumUsers
//     const premiumUserIds = premiumUsers.map((user) => user.userId);

//     // Find the latest products created by users with premium subscriptions
//     const latestPremiumProducts = await Product.find({ userID: { $in: premiumUserIds } })
//       .sort({ createdAt: -1 })
//       .limit(10) // Adjust the limit as needed
//       .populate({
//         path: 'userID',
//         select: 'fullName phoneNumber', // Fields to include in the populated user
//       })
//       .exec();

//     // Fetch subscription details for each premium user
//     const subscriptionDetails = await Subscription.find({ userId: { $in: premiumUserIds } });

//     // Map user IDs to their respective subscriptions
//     const userSubscriptions = {};
//     subscriptionDetails.forEach((subscription) => {
//       userSubscriptions[subscription.userId.toString()] = subscription;
//     });

//     // Prepare the response
//     const response = latestPremiumProducts.map((product) => {
//       const userId = product.userID._id.toString();
//       const subscription = userSubscriptions[userId];

//       return {
//         product: {
//           _id: product._id,
//           productName: product.productName,
//           productCategory: product.productCategory,
//           price: product.price,
//           description: product.description,
//           productAvatar: product.productAvatar,
//           createdAt: product.createdAt,
//         },
//         user: {
//           _id: product.userID._id,
//           fullName: product.userID.fullName,
//           phoneNumber: product.userID.phoneNumber,
//         },
//         subscription: {
//           plan: subscription.plan,
//           price: subscription.price,
//         },
//       };
//     });

//     res.status(200).json(response);
//   } catch (error) {
//     console.error('Error getting latest premium products:', error);
//     next(error); // Pass the error to the next middleware
//   }
// };

export const getLatestPremiumProducts = async (req, res, next) => {
  try {
    const premiumUsers = await Subscription.find(
      { plan: "premium" },
      "userId"
    ).exec();

    const premiumUserIds = premiumUsers.map((user) => user.userId);

    const latestPremiumProduct = await Product.aggregate([
      {
        $match: { userID: { $in: premiumUserIds } },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: "$userID",
          latestProduct: { $first: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "subscriptions",
          localField: "latestProduct.userID",
          foreignField: "userId",
          as: "subscription",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "latestProduct.userID",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          "latestProduct.userID": 0,
          "latestProduct.__v": 0,
          "user.password": 0,
          "user.__v": 0,
          "subscription.__v": 0,
        },
      },
      {
        $limit: 1, // Retrieve only one latest product
      },
    ]);

    if (latestPremiumProduct.length === 0) {
      return res
        .status(404)
        .json({ message: "No latest premium product found" });
    }

    res.status(200).json(latestPremiumProduct[0]);
  } catch (error) {
    console.error("Error getting latest premium product:", error);
    next(error); // Pass the error to the next middleware
  }
};

export const getSingleProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findById(productId).exec();

    if (!product) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error while fetching product by ID:", error);
    next(error);
  }
};



export const searchPlatinumProducts = async (req, res, next) => {
  try {
      const { category } = req.query;

      // Define the match condition based on the provided category
      const matchCondition = {
          "subscription.planKey": "platinum" // Match subscription plan key
      };

      // Check if category is provided in the query parameters
      if (category) {
          matchCondition["latestProduct.productCategory"] = category; // Filter by product category
      }

      // Fetch platinum products based on the provided category
      const platinumProducts = await Product.aggregate([
          {
              $group: {
                  _id: "$userId",
                  latestProduct: { $last: "$$ROOT" },
              },
          },
          {
              $lookup: {
                  from: "subscriptions",
                  localField: "latestProduct.userId",
                  foreignField: "userId",
                  as: "subscription",
              },
          },
          {
              $match: matchCondition, // Apply the match condition
          },
          {
              $lookup: {
                  from: "users",
                  localField: "_id",
                  foreignField: "_id",
                  as: "user",
              },
          },
          {
              $project: {
                  _id: "$latestProduct._id",
                  productName: "$latestProduct.productName",
                  productCategory: "$latestProduct.productCategory",
                  productSubcategory: { $arrayElemAt: ["$subcategories.name", 0] },
                  price: "$latestProduct.price",
                  description: "$latestProduct.description",
                  productImages: "$latestProduct.productImages",
                  userId: "$latestProduct.userId",
                  subscriptionPlan: { $arrayElemAt: ["$subscription.planKey", 0] },
                  user: { $arrayElemAt: ["$user", 0] },
              },
          },
      ]);

      res.status(200).json(platinumProducts);
  } catch (error) {
      console.error("Error fetching platinum products:", error);
      next(error);
  }
};

//new changes


export const getProducts = async (req, res, next) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: '$userId',
          product: { $first: '$$ROOT' }
        }
      },
      {
        $replaceRoot: { newRoot: '$product' }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $addFields: {
          user: { $arrayElemAt: ['$user', 0] } 
        }
      },
      {
        $lookup: {
          from: 'subcategories',
          localField: 'productSubcategory',
          foreignField: '_id',
          as: 'subcategory'
        }
      },
      {
        $addFields: {
          subcategory: { $arrayElemAt: ['$subcategory', 0] } 
        }
      },
      {
        $project: {
          'user._id': 0 
        }
      }
    ];

    const products = await Product.aggregate(pipeline);

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    next(error);
  }
};



export const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const { productName, productCategory, productSubcategory, price, description } = req.body;

    if (!productName || !productCategory || !price || !description) {
      const error = new Error("Product name, category, price, and description are required");
      error.status = 400;
      throw error;
    }


    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }



    
  
    existingProduct.productName = productName;
    existingProduct.productCategory = productCategory;
    existingProduct.productSubcategory = productSubcategory;
    existingProduct.price = price;
    existingProduct.description = description;

  
    if (req.files && req.files.length > 0) {
      const imageUrls = await uploadImages(req.files);
      existingProduct.productImages = imageUrls.map(image => image.url);
    }

    
    const updatedProduct = await existingProduct.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    next(error);
  }
};





export const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;


    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }

  
    await existingProduct.remove();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    next(error);
  }
};




export const getProductsBySubscription = async (req, res, next) => {
  try {
    const { planKey } = req.body;

   
    if (!planKey) {
      const error = new Error("Plan key is required in the request body");
      error.status = 400;
      throw error;
    }


    const usersWithSubscription = await Subscription.find({ planKey }, 'userId');

    const userIds = usersWithSubscription.map(subscription => subscription.userId);

    
    const products = await Product.aggregate([
      { $match: { userId: { $in: userIds }, subscriptionPlan: planKey } },
      { $group: { _id: "$userId", product: { $first: "$$ROOT" } } },
      { $replaceRoot: { newRoot: "$product" } }
    ]);

    // Return the products
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by subscription:", error);
    next(error);
  }
};