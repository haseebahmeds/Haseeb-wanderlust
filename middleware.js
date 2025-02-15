const Listing = require("./models/listing");
const Review = require("./models/review");
const {listingSchema,reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl; // This must match in saveRedirectUrl
    req.flash("error", "You must be signed in first!");
    return res.redirect("/login");
  }
  next();
};


module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.redirectUrl = req.session.returnTo;
    delete req.session.returnTo; // Clear it after storing
  }
  next();
};


module.exports.isOwner =async(req, res, next) => {
  let { id } = req.params;
  let listing =await Listing.findById(id);
  if(!listing.owner._id.equals(res.locals.currUser._id)){
    req.flash("error", "You do not have permission to do that !");
    return res.redirect(`/listings/${id}`);

  }
next();
};


module.exports.validateListing = (req, res, next) => {
  let {error} = listingSchema.validate(req.body);
  
  if(error){
    let errMsg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(errMsg, 400);
  }else{

    next();
  }
}

module.exports.validateReview = (req, res, next) => {
  let {error} = reviewSchema.validate(req.body);
  
  if(error){
    let errMsg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(errMsg, 400);
  }else{

    next();
  }
}

module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review || !review.author.equals(req.user._id)) {
      req.flash("error", "You do not have permission to delete this review!");
      return res.redirect(`/listings/${id}`);
  }
  next();
};
