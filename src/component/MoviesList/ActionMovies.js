import React from "react";

import useHttp from "../../hook/use-http";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "./Original.css";

function ActionMovies(prpos) {
  const { isLoading, httpError, data } = useHttp({
    url: `https://api.themoviedb.org/3${prpos.dataActionMovies.fetchActionMovies}`,
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
  const dataAction = data.results;

  return (
    <div className="borderOriginal">
      <p>Hành động</p>
      <div className="container-fluid">
        <OwlCarousel items={10} className="owl-theme" loop nav margin={12}>
          {dataAction.map((ele, i) => {
            return (
              <img
                key={i}
                src={`https://image.tmdb.org/t/p/w500/${ele.backdrop_path}`}
                alt="Error Img"
              />
            );
          })}
        </OwlCarousel>
      </div>
    </div>
  );
}
export default ActionMovies;
