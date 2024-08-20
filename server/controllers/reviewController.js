
import Review from "../models/Review.js"
import Product from "../models/ProductDetail.js";
import User from "../models/User.js";



export const review = async (req, res, next) => {
    const { content, rating, productId } = req.body;
    const userId = req.user._id;

    try {
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Rating must be between 1 and 5' });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { fullName, country, accountType } = user;

        const newReview = new Review({ 
            content, 
            rating, 
            product: productId, 
            user: userId,
            fullName, 
            country, 
            accountType, 
            createdAt: Date.now() // Set createdAt field to current date
        });

        const savedReview = await newReview.save();

        const starRating = calculateStarRating(rating);
        savedReview.starRating = starRating;

        const existingReviews = await Review.find({ product: productId });
        const totalRating = existingReviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = Math.round((totalRating + rating) / (existingReviews.length + 1));

        product.averageRating = averageRating; 
        await product.save(); 

        const responseReview = {
            _id: savedReview._id,
            content: savedReview.content,
            rating: savedReview.rating,
            starRating: savedReview.starRating,
            calculatedRating: averageRating, 
            product: savedReview.product,
            user: {
                _id: savedReview.user, 
                fullName, 
                country, 
                accountType, 
            },
            createdAt: savedReview.createdAt // Include createdAt field in the response
        };

        res.status(201).json(responseReview);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};



function calculateStarRating(rating) {
  const maxRating = 5;
  const starPercentage = (rating / maxRating) * 100;
  const roundedStarPercentage = Math.round(starPercentage / 10) * 10;
  const starRating = (roundedStarPercentage / 100) * maxRating;
  return starRating;
}

//thus us new commit

export const getProductReviews = async (req, res, next) => {
    const productId = req.params.productId;

    try {
      
        const reviews = await Review.find({ product: productId });

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ error: 'No reviews found for this product' });
        }

    
        const uniqueReviews = [];
        const seenUsers = new Set();

        for (const review of reviews) {
            if (!seenUsers.has(review.user.toString())) {
                uniqueReviews.push(review);
                seenUsers.add(review.user.toString());
            }
        }

        res.status(200).json(uniqueReviews);
    } catch (error) {
        next(error);
    }
}

  

