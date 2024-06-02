import axios from 'axios';

class MoviesDataService {
  login(data) {
    return axios.post("https://favmovie-backend.onrender.com/api/auth/login", data);
  }

  signup(data) {
    return axios.post("https://favmovie-backend.onrender.com/api/auth/register", data);
  }

  addFavorite(movie, xsToken) {
    return axios.post("https://favmovie-backend.onrender.com/api/movies/favorite", { movie: movie }, {
      headers: {
        'x-auth-token': xsToken
      }
    });
  }

  getFavorites(xsToken) {
    return axios.get("https://favmovie-backend.onrender.com/api/movies/favorites", {
      headers: {
        'x-auth-token': xsToken
      }
    });
  }
}

export default new MoviesDataService();
