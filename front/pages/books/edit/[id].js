import {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

function Edit(props){
	const router=useRouter();
	
	const [img, setImg]=useState(props.data.img);
	const [title, setTitle]=useState(props.data.title);
	const [author, setAuthor]=useState(props.data.author);
	const [date, setDate]=useState(props.data.date);
	const [rating, setRating]=useState(props.data.rating);
	
	const handleSubmit=async(event)=>{
		event.preventDefault();
		
		
		 try {
      const res = await fetch(`http://localhost:8000/api/books/${props.data._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        title,
        author,
        img,
        date,
        rating,
      }),
      })

      if (!res.ok) {
        throw new Error('Something went wrong')
      }

      router.push('/');
    } catch (error) {
      console.error(error)
      alert('Failed to update profile')
    }
	}
	
	return (
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
		   <button className="mt-4 btn btn-dark">Update</button>
		</form>
	  
	  
	  
	  </>
	)
}

export default Edit;

export async function getStaticPaths() {
  const response = await fetch(`http://localhost:8000/api/books`);
  const data = await response.json();

  const thePaths = data.map((books) => {
    return { params: { id: books._id } }
  })

  return {
    paths: thePaths,
    fallback: false
  }
}


export async function getStaticProps(context) {
  const response = await fetch(`http://localhost:8000/api/books/${context.params.id}`);
  const data = await response.json();
  console.log(data);

  return {
    props: {
      data,
    }
  }
}