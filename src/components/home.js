
import MovieTiles from './tiles';
import Searchbar from './searchbar';
import AutoSlide from '../slides';

import NavBar from './navbar';


function Home({logout,searchMovie,searchResults,movies}) {

  return (
    <>
    <NavBar logout={logout}/>
    <Searchbar searchMovie={searchMovie}/>
    {movies ? <MovieTiles searchResults={searchResults} /> : <h3 className='text-center'>No Movies or TV shows Found </h3> }
    <AutoSlide/>
    </>
  );
}

export default Home;