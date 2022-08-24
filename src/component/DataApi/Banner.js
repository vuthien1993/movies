import React from "react";
import useHttp from "../../hook/use-http";
import Original from "../MoviesList/Original";
import Trending from "../MoviesList/Trending";
import TopRated from "../MoviesList/TopRated";
import ActionMovies from "../MoviesList/ActionMovies";
import ComedyMovies from "../MoviesList/ComedyMovies";
import HorrorMovies from "../MoviesList/HorrorMovies";
import RomanceMovies from "../MoviesList/RomanceMovies";
import Documentaries from "../MoviesList/Documentaries";
import NavBar from "../Layout/NavBar";

import "./Banner.css";

function Banner() {
  const requests = {
    fetchTrending: `/trending/all/week?api_key=522dfba9d04a6622db8e00a4a63e9dfb&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=522dfba9d04a6622db8e00a4a63e9dfb&with_network=123`,
    fetchTopRated: `/movie/top_rated?api_key=522dfba9d04a6622db8e00a4a63e9dfb&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=522dfba9d04a6622db8e00a4a63e9dfb&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=522dfba9d04a6622db8e00a4a63e9dfb&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=522dfba9d04a6622db8e00a4a63e9dfb&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=522dfba9d04a6622db8e00a4a63e9dfb&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=522dfba9d04a6622db8e00a4a63e9dfb&with_genres=99`,
    fetchSearch: `/search/movie?api_key=522dfba9d04a6622db8e00a4a63e9dfb&language=en-US`,
  };

  const { isLoading, httpError, data } = useHttp({
    url: `https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`,
  });
  if (isLoading) {
    return (
      <section>
        <p className="bannerLoading">Loading .....</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section>
        <p className="bannerError">{httpError}</p>
      </section>
    );
  }
  const index = Math.floor(Math.random() * data.results.length);

  return (
    <React.Fragment>
      <NavBar />
      <div>
        <div className="borderBanner">
          <h1 className="h1">{data.results[index].name}</h1>
          <div>
            <button className="button1">Play</button>
            <button className="button2">Mylist</button>
          </div>
          <p className="p1Banner">{data.results[index].overview}</p>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${data.results[index].backdrop_path}`}
              alt="loi roi ban oi"
            />
          </div>
        </div>
        <Original dataApi={requests} />
        <Trending dataTrending={requests} />
        <TopRated dataTopRated={requests} />
        <ActionMovies dataActionMovies={requests} />
        <ComedyMovies dataComedyMovies={requests} />
        <HorrorMovies dataHorrorMovies={requests} />
        <RomanceMovies dataRomanceMovies={requests} />
        <Documentaries dataDocumentaries={requests} />
      </div>
    </React.Fragment>
  );
}

export default Banner;
