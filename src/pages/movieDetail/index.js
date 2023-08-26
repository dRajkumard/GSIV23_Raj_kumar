import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import HomeIcon from "@mui/icons-material/Home";
const token = process.env.REACT_APP_ACCESS_TOKEN;
const baseurl = process.env.REACT_APP_BASE_URL;
const imageurl = process.env.REACT_APP_IMAGE_URL;
const MovieDetail = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  console.log("");
  useEffect(() => {
    axios
      .get(`${baseurl}/movie/${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMovieDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });

    axios
      .get(`${baseurl}/movie/${movieId}/credits`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCast(response.data.cast);
        setCrew(response.data.crew);
      })
      .catch((error) => {
        console.error("Error fetching movie credits:", error);
      });
  }, [movieId]);
  const totalMinutes = movieDetails?.runtime || 0;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const getcolor = (average) => {
    if (average >= 7) {
      return "green";
    } else if (average >= 5) {
      return "orange";
    } else {
      return "red";
    }
  };
  return (
    <div>
      <div>
        <div className="navbar-container">
          <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid">
              <h3 class="navbar-brand text-white">MovieDetail</h3>
              <Link to="/" >
                <HomeIcon style={{ color: "white" }} />
              </Link>
            </div>
          </nav>
        </div>
      </div>
      {movieDetails && (
        <div>
          <div class="card mb-3" style={{ width: " 100%", height: "100vh" }}>
            <div class="row g-0">
              <div class="col-md-4">
                <img
                  src={`${imageurl}${movieDetails.poster_path}`}
                  class="img-fluid rounded-start movie_detail_image"
                  alt="..."
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <div className="movie-info">
                    <h3>{movieDetails.title}</h3>
                    <span className={getcolor(movieDetails.vote_average)}>
                      {movieDetails.vote_average}
                    </span>
                  </div>
                  <div className="description_details">
                    <p>Year of Release: {movieDetails.release_date}</p>
                    <p>
                      Length: {formattedHours}:{formattedMinutes}
                    </p>
                    <p>
                      Director:{" "}
                      {
                        crew.find((person) => person.department === "Directing")
                          ?.name
                      }
                    </p>
                    <div className="cast-section">
                      <p>Cast: {cast.map((actor) => actor.name).join(", ")}</p>
                    </div>
                    <p>Description: {movieDetails.overview}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
