import React, { useState } from "react";
import useHttp from "../../hook/use-http";
import OwlCarousel from "react-owl-carousel";

//import MovieDetail from "../MovieDetail/MovieDetail";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "./Original.css";

function TopRated(prpos) {
  const [id, setId] = useState("");
  const { isLoading, httpError, data } = useHttp({
    url: `https://api.themoviedb.org/3${prpos.dataTopRated.fetchTopRated}`,
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
  // const dataClick = { id: id };
  const dataTopRated = data.results;
  return (
    <div className="borderOriginal">
      <p>Xếp hạng cao</p>
      <div className="container-fluid">
        <OwlCarousel items={10} className="owl-theme" loop nav margin={12}>
          {dataTopRated.map((ele, i) => {
            return (
              <img
                onClick={() => {
                  setId(ele.id);
                }}
                key={i}
                src={`https://image.tmdb.org/t/p/w500/${ele.backdrop_path}`}
                alt="Error Img"
              />
            );
          })}
        </OwlCarousel>
        {/* <MovieDetail dataMoviesDetail={dataClick} /> */}
      </div>
    </div>
  );
}

export default TopRated;
