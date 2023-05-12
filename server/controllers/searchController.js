const asyncHandler=require("express-async-handler");
const Book=require("../models/Book");

const getBooks=asyncHandler(async(req,res)=>{
	const books=await Book.find();
	res.status(200).json(books);
});

const getSingleBook=asyncHandler(async(req,res)=>{
	const book=await Book.findById(req.params.id);
	res.status(200).json(book);
});

const createBook=asyncHandler(async(req,res)=>{
	const {title, author, img, date, rating}=req.body;
	if(title==null || author==null || img==null || date==null || rating==null){
		res.status(400);
		throw new Error("All Fields Are Mandatory");
	}
	
	const newBook=await Book.create({
		title, author, img, date, rating
	});
	
	res.status(200).json(newBook);
});

const updateBook=asyncHandler(async(req,res)=>{
    const book=await Book.findById(req.params.id);
    if(!book){
		res.status(400);
		throw new Error("Book Not Found");
	}
	
	const changeBook=await Book.findByIdAndUpdate(
	   req.params.id,
	   req.body,
	   {new:true}
	);
   
     res.status(200).json(changeBook);
});


const delBook=asyncHandler(async(req,res)=>{
    const book=await Book.findById(req.params.id);
     if(!book){
		 res.status(400);
		 throw new Error("Book Not Found");	 
	 }	
	  await Book.deleteOne({_id:req.params.id});
	  res.status(200).json(book);
});


const getDescSort=asyncHandler(async(req,res)=>{
	const books=await Book.find().sort({createdAt:-1});
	res.status(200).json(books);
});
const getAescSort=asyncHandler(async(req,res)=>{
	const books=await Book.find().sort({createdAt:1});
	res.status(200).json(books);
});
const getHighRating=asyncHandler(async(req,res)=>{
	const books=await Book.find().sort({rating:-1});
	res.status(200).json(books);
});
const getLowestRating=asyncHandler(async(req,res)=>{
	const books=await Book.find().sort({rating:1});
	res.status(200).json(books);
});

const getLowestDate=asyncHandler(async(req,res)=>{
	const books=await Book.find().sort({date:1});
	res.status(200).json(books);
});

const getHighDate=asyncHandler(async(req,res)=>{
	const books=await Book.find().sort({date:-1});
	res.status(200).json(books);
});


const getAsad=asyncHandler(async(req,res)=>{
	const books=await Book.find({author:"asad"});
	res.status(200).json(books);
});

const getPakistan=asyncHandler(async(req,res)=>{
	const books=await Book.find({title:"Pakistan"});
	res.status(200).json(books);
});

const searchBooks=asyncHandler(async(req,res)=>{
	const {query}=req.query;
	console.log(req.query);
	const results=await Book.find(
	{"title": {$regex:".*"+query+".*", $options:'i'} }
	);
	res.status(200).json(results);
});

module.exports={
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
	getPakistan,
	searchBooks
}