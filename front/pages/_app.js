import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../public/style.css';

function App({Component, pageProps}){
	return(
	  <>
	  <header className="py-4 tex-center bg-dark">
	    <h1 className="text-white text-center">Search & Filter</h1>
	  </header>
	  <main className="py-5">
	     <div className="container">
		   <Component {...pageProps}/>
		 </div>
	  </main>
	  <footer className="py-4 bg-dark">
	    <p className="mb-0 text-white text-center">The Source Code is Available <a href="" className="text-warning">Here</a></p>
	  </footer>
	  </>
	)
}

export default App;