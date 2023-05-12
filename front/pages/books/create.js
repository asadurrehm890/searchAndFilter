import {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

function Create(){
	
	const router=useRouter();
	
	const [img, setImg]=useState('');
	const [title, setTitle]=useState('');
	const [author, setAuthor]=useState('');
	const [date, setDate]=useState(new Date());
	const [rating, setRating]=useState(0);
	
	const handleSubmit=async(event)=>{
		event.preventDefault();
		
		await fetch('http://localhost:8000/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        author,
        img,
        date,
        rating,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        // handle success response here
		router.push('/');
      })
      .catch((error) => {
        console.error('Error:', error);
        // handle error response here
      });
		
	}
	
	return(
	  <>
	    <Link href="/" className="btn btn-light">Go Back</Link>
	    <form onSubmit={handleSubmit}>
		   <div className="mt-4">
				<label className="form-label" htmlFor="img">Image URL:</label>
				<input className="form-control" type="text" id="img" value={img} onChange={(e) => setImg(e.target.value)} />
		   </div>
		   <div className="mt-4">
				<label className="form-label" htmlFor="title">Title:</label>
				<input className="form-control" type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
		   </div>
		   <div className="mt-4">
				<label className="form-label" htmlFor="author">Author:</label>
				<input className="form-control" type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
		   </div>
		   <div className="mt-4">
				<label className="form-label" htmlFor="date">Date:</label>
				<input className="form-control" type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
		   </div>
		   <div className="mt-4">
				<label className="form-label" htmlFor="rating">Rating:</label>
				<input className="form-control" type="number" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} />
		   </div>
		   <button className="mt-4 btn btn-dark">Create</button>
		</form>
	  </>
	)
}
export default Create;