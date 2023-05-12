const mongoose=require("mongoose");

const booksSchema=new mongoose.Schema({
	title:{type:String, required:true},
	author:{type:String, required:true},
	img:{type:String, required:true},
	date:{type:Date, required:true},
	rating:{type:Number, required:true},
},{timestamps:true});

const Book=mongoose.model('Book', booksSchema);

module.exports=Book;