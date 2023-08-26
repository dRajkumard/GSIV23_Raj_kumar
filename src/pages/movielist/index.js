
import axios from "axios";
import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMoviesFailure,
  fetchMoviesStart,
  fetchMoviesSuccess,
  // getMovie,
} from "../../reduxStore/slices/movieSlice";
import HomeIcon from "@mui/icons-material/Home";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Pagination } from "@mui/material";
import "./index.css";
import { MoreHoriz } from "@mui/icons-material";
import { Link } from "react-router-dom";
// import Navbar from "../../components/navbar";
const token = process.env.REACT_APP_ACCESS_TOKEN;
const baseurl = process.env.REACT_APP_BASE_URL;
const imageurl = process.env.REACT_APP_IMAGE_URL;
const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const loading = useSelector((state) => state.movies.loading);
  const error = useSelector((state) => state.movies.error);
  const[totalpages,setTotalpages] =useState(1)
  const [currentPage,setCurrentPage] = useState(1)
  const [query,setQuery] = useState()

const Apiurl = `${baseurl}/movie/upcoming?language=en-US&page=`
const searchurl = `${baseurl}/search/movie?include_adult=false&language=en-US&query=${query}&page=`
  console.log("movie",movies)
  useEffect(() => {
    dispatch(fetchMoviesStart());
    // if(query){
      // getMovie(searchurl,currentPage)
    // }else{
      getMovie(Apiurl,currentPage);
    // }
    
  }, [dispatch,currentPage]);
  const getMovie = (Apiurl,page) => {
    axios
      .get(`${Apiurl}${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("res", response.data);
        setTotalpages(response.data.total_pages)
        dispatch(fetchMoviesSuccess(response.data.results));
      })
      .catch((error) => {
        dispatch(fetchMoviesFailure(error.message));
      });
  };
  const getcolor = (average) => {
    if (average >= 7) {
      return "green";
    } else if (average >= 5) {
      return "orange";
    } else {
      return "red";
    }
  };
  console.log("movie", getcolor());
  if (loading) {
    return <div>Loading....</div>;
  }
  if (error) {
    return <div>Error:{error}</div>;
  }
  const hanglePageChange =(e,newPage)=>{
  
    setCurrentPage(newPage)
  }
  const handlekeyEnter =(event) =>{
if(event.key == "Enter"){
  event.preventDefault(); 
  console.log("hellloeoeo");
  if(query){
    getMovie(searchurl,currentPage)
  }
  else{
    getMovie(Apiurl,currentPage)
  }
  
  
}
  }
  return (
    <div className="">
      {/* <Navbar/> */}
      <div className="navbar-container">
        <nav class="navbar navbar-expand-lg navbar-light">
          <div class="container-fluid">
            <form class="d-flex">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
               
                onChange={(e) =>setQuery(e.target.value)}
                onKeyDown={handlekeyEnter}
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>

            <HomeIcon style={{ color: "white" }} />
          </div>
        </nav>
      </div>
      <div className="main">
        {movies &&
          movies.map((movie,index) => (

            
            <Card sx={{ }} className="movie-card col-md-3">
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="300"
                  image={`${imageurl}${movie.poster_path}`}
                  alt={movie.title}
                />
                <CardContent>
                  <Link  key={movie.id} to={`/movie_detail/${movie.id}`} style={{ textDecoration: "none" }} >
                  <Typography gutterBottom variant="h5" component="div">
                    <div className="movie-info">
                      <h3>{movie.title}</h3>
                      
                      <span className={getcolor(movie.vote_average)}>
                        {movie.vote_average}
                      </span>
                    </div>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Description <MoreHoriz className="more-icon" />(2 Lines)
                  </Typography>
                  </Link>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
      </div>
      <div className="pagination-container">
        <Pagination
        count={totalpages}  
        page={currentPage}
        onChange={hanglePageChange}
        />
      </div>
    </div>
  );
};

export default MovieList;
