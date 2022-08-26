import React, { useState } from "react";

import useHttp from "../../hook/use-http";
import OwlCarousel from "react-owl-carousel";

import MovieDetail from "../MovieDetail/MovieDetail";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "./Original.css";

function Trending(prpos) {
  //khai báo các state và gán giá trị ban đầu
  const [display, setDisplay] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [overview, setOverview] = useState("");
  const [vote_average, setVote_average] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [backdrop_path, setBackdrop_path] = useState("");
  //sử dụng custom hook để call api
  const { isLoading, httpError, data } = useHttp({
    url: `https://api.themoviedb.org/3${prpos.dataTrending.fetchTrending}`,
  });
  console.log(data);
  if (isLoading) {
    return (
      <section>
        <p className="bannerLoading">Loading .....</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className="bannerError">
        <p>{httpError}</p>
      </section>
    );
  }
  //khai báo biến để truyền qua props
  const dataClick = {
    id: id,
    display: display,
    name: name,
    date: date,
    overview: overview,
    vote_average,
    backdrop_path,
  };

  const dataTrending = data.results;
  const clickHandler = (ele) => {
    setId(ele.id);
    setName(ele.name);
    setOverview(ele.overview);
    setDate(ele.release_date);
    setVote_average(ele.vote_average);
    setDisplay(true);
    setBackdrop_path(ele.backdrop_path);
    if (currentId === ele.id) {
      setDisplay(false);
    }
    setCurrentId(ele.id);
  };

  return (
    <div className="borderOriginal">
      <p>Xu Hướng</p>
      <div className="container-fluid">
        {/* <OwlCarousel items={10} className="owl-theme" loop nav margin={12}> */}
        {dataTrending.map((ele, i) => {
          return (
            <React.Fragment>
              <img
                // bắt sự kiện onclick
                onClick={() => clickHandler(ele)}
                key={i}
                src={`https://image.tmdb.org/t/p/w500/${ele.backdrop_path}`}
                alt="Error Img"
              />
            </React.Fragment>
          );
        })}
        {/* </OwlCarousel> */}
        <MovieDetail dataMoviesDetail={dataClick} />
      </div>
    </div>
  );
}

export default Trending;
