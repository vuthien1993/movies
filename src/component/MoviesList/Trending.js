import React from "react";

import useHttp from "../../hook/use-http";
import useCarousel from "../../hook/use-carousel";
import MovieDetail from "../MovieDetail/MovieDetail";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "./Original.css";

function Trending(prpos) {
  // su dung custom hook de call api
  const { isLoading, httpError, data } = useHttp({
    url: `https://api.themoviedb.org/3${prpos.dataTrending.fetchTrending}`,
  });
  //bao loading khi đang call api
  const dataTrending = data.results;
  //su dung custom hook de dinh dang hien thi va xu ly su kien khi click
  const { dataClick, responsive, items } = useCarousel(dataTrending);
  if (isLoading) {
    return (
      <section>
        <p className="bannerLoading">Loading .....</p>
      </section>
    );
  }
  //báo lổi
  if (httpError) {
    return (
      <section className="bannerError">
        <p>{httpError}</p>
      </section>
    );
  }
  return (
    <div className="borderOriginal">
      <p>Xu Hướng</p>
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

export default Trending;
