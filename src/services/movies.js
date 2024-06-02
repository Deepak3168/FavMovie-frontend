import axios from 'axios';

class MoviesDataService {
  login(data) {
    return axios.post("http://localhost:3001/api/auth/login", data);
  }

  signup(data) {
    return axios.post("http://localhost:3001/api/auth/register", data);
  }

  addFavorite(movie, xsToken) {
    return axios.post("http://localhost:3001/api/movies/favorite", { movie: movie }, {
      headers: {
        'x-auth-token': xsToken
      }
    });
  }

  getFavorites(xsToken) {
    return axios.get("http://localhost:3001/api/movies/favorites", {
      headers: {
        'x-auth-token': xsToken
      }
    });
  }
}

export default new MoviesDataService();
