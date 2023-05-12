const express=require("express");

const {
	searchBooks,
	getBooks, 
    getSingleBook, 
	createBook, 
	updateBook, 
	delBook, 
	getDescSort,
	getAescSort,
	getHighRating,
	getLowestRating,
	getLowestDate,
	getHighDate,
	getAsad,
	getPakistan
	}=require("../controllers/searchController");

const router=express.Router();


router.route("/latest").get(getDescSort);
router.route("/oldest").get(getAescSort);
router.route("/highrating").get(getHighRating);
router.route("/lowrating").get(getLowestRating);
router.route("/lowdate").get(getLowestDate);
router.route("/highdate").get(getHighDate);
router.route("/asad").get(getAsad);
router.route("/pakistan").get(getPakistan);
router.route("/search").get(searchBooks);
router.route("/").get(getBooks).post(createBook);
router.route("/:id").get(getSingleBook).put(updateBook).delete(delBook);



module.exports=router;