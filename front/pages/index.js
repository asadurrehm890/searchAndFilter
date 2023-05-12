import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState} from 'react';

function HomePage(props) {
	
  const router=useRouter();
  
  const [query, setQuery]=useState('');
  
  const [list, setList]=useState(props.data);
  
  
	
  const handleDel=async(id)=>{
	  try {
      const response = await fetch(`http://localhost:8000/api/books/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        console.log(`Item with ID ${id} deleted successfully`)
		router.push('/');
		
      } else {
        console.log(`Failed to delete item with ID ${id}`)
      }
    } catch (error) {
      console.error(error)
    }
  }


  const latest=async()=>{
		 const response=await fetch('http://localhost:8000/api/books/latest');
		 const data = await response.json();
		 console.log(data);
		 setList(data);   
  } 
  const oldest=async()=>{
		 const response=await fetch('http://localhost:8000/api/books/oldest');
		 const data = await response.json();
		 console.log(data);
		 setList(data);   
  } 
  const lowrate=async()=>{
		 const response=await fetch('http://localhost:8000/api/books/lowrating');
		 const data = await response.json();
		 console.log(data);
		 setList(data);   
  } 
 const highrate=async()=>{
		 const response=await fetch('http://localhost:8000/api/books/highrating');
		 const data = await response.json();
		 console.log(data);
		 setList(data);   
  } 
const lowdate=async()=>{
		 const response=await fetch('http://localhost:8000/api/books/lowdate');
		 const data = await response.json();
		 console.log(data);
		 setList(data);   
  }
const highdate=async()=>{
		 const response=await fetch('http://localhost:8000/api/books/highdate');
		 const data = await response.json();
		 console.log(data);
		 setList(data);   
  }  

const asad=async()=>{
		 const response=await fetch('http://localhost:8000/api/books/asad');
		 const data = await response.json();
		 console.log(data);
		 setList(data);   
  }  
  
  const pakistan=async()=>{
		 const response=await fetch('http://localhost:8000/api/books/pakistan');
		 const data = await response.json();
		 console.log(data);
		 setList(data);   
  } 
  
  const handleQuery=async(event)=>{
	  event.preventDefault();
	  const response=await fetch(`http://localhost:8000/api/books/search?query=${query}`);
		 const data = await response.json();
		 console.log(data);
		 setList(data);   
	  
  }
  
  return (
     <> 
	 
	 <form className="my-3 d-flex align-items-center" onSubmit={handleQuery}>
	      <label className="mb-4 form-label">Search
		   <input type="text" value={query} className="form-control" onChange={(e)=>setQuery(e.target.value)}/>
		  </label>
		  <button className="btn btn-dark">Search</button>
	 </form>
	 
  <Link href="/books/create" className="btn btn-dark mb-4">Create New Book</Link>
  <button onClick={latest} className="ms-2 btn btn-dark mb-4">Latest</button>
  <button onClick={oldest} className="ms-2 btn btn-dark mb-4">Oldest</button>
  <button onClick={lowrate} className="ms-2 btn btn-dark mb-4">Low Rating</button>
  <button onClick={highrate} className="ms-2 btn btn-dark mb-4">High Rating</button>
  <button onClick={lowdate} className="ms-2 btn btn-dark mb-4">Low Date</button>
  <button onClick={highdate} className="ms-2 btn btn-dark mb-4">High Date</button>
  <button onClick={asad} className="ms-2 btn btn-dark mb-4">Author Asad</button>
  <button onClick={pakistan} className="ms-2 btn btn-dark mb-4">Pakistan</button>
  
  
  <table className="table align-middle">
  <thead>
    <tr>
      <th scope="col">img</th>
      <th scope="col">title</th>
      <th scope="col">author</th>
      <th scope="col">date</th>
      <th scope="col">rating</th>
      <th scope="col">action</th>
    </tr>
  </thead>
  <tbody>
   {list.map((item)=>{
		   return(
	   <tr key={item._id}>
      
      <td><img src={item.img} className="img890"/></td>
      <td>{item.title}</td>
      <td>{item.author}</td>
	  <td>{item.date}</td>
      <td>{item.rating}</td>
      <td>
	     <Link href={`/books/edit/${item._id}`} className="btn btn-warning"><i className="bi bi-pencil-square"></i></Link>
		 <button onClick={()=>handleDel(item._id)} className="ms-2 btn btn-danger"><i className="bi bi-trash"></i></button>
	  </td>
    </tr>
	   )
		  })} 
  </tbody>
</table>
		  
	 </>
  )
}

export default HomePage;


export async function getStaticProps() {
  const response = await fetch("http://localhost:8000/api/books")
  
  const data = await response.json();
  
  return {
    props: {
      data
    }
  }
}

