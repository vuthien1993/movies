import React from "react";

import useHttp from "../../hook/use-http";
import useCarousel from "../../hook/use-carousel";

import MovieDetail from "../MovieDetail/MovieDetail";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "./Original.css";

function Original(prpos) {
  const { isLoading, httpError, data } = useHttp({
    url: `https://api.themoviedb.org/3${prpos.dataApi.fetchNetflixOriginals}`,
  });
  const dataOriginal = data.results;
  //su dung custom hook de dinh dang hien thi va xu ly su kien khi click
  const { dataClick, responsive, items } = useCarousel(dataOriginal);
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

  return (
    <div className="borderOriginal">
      <p>Original</p>
      <div className="container-fluid">
        <AliceCarousel
          mouseTracking
          items={items}
          responsive={responsive}
          controlsStrategy="alternate"
          disableDotsControls
        />
        <MovieDetail dataMoviesDetail={dataClick} />
      </div>
    </div>
  );
}

export default Original;
