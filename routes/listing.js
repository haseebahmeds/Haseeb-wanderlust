const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listings.js");

// Route for displaying all listings and adding a new one
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// New Route - define this before any route that uses :id
router.get("/new", isLoggedIn, listingController.renderNewForm);

// ✅ FIXED: Move the search route **above** the dynamic `/:id` route
router.get("/search", async (req, res) => {
  try {
    let query = req.query.query;
    let regex = new RegExp(query, "i"); // Case-insensitive search
    let listings = await Listing.find({ title: regex });
    res.render("index", { listings }); // Render index with search results
  } catch (err) {
    console.log(err);
    res.redirect("/listings");
  }
});

// ✅ Now the dynamic `/:id` route comes **after** the search route
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
