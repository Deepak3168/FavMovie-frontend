
import MovieTiles from './tiles';
import Searchbar from './searchbar';
import AutoSlide from '../slides';

import NavBar from './navbar';


function Home({logout,searchMovie,searchResults}) {

  return (
    <>
    <NavBar logout={logout}/>
    <Searchbar searchMovie={searchMovie}/>
    <MovieTiles searchResults={searchResults} />
    <AutoSlide/>
    </>
  );
}

export default Home;