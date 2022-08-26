import React, { useState } from "react";
import DetailSearch from "./DetailSearch";

import "./ResultList.css";
import useHttp from "../../hook/use-http";
function ResultList(props) {
  const [display, setDisplay] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [overview, setOverview] = useState("");
  const [vote_average, setVote_average] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [backdrop_path, setBackdrop_path] = useState("");
  const { isLoading, httpError, data } = useHttp({
    url: `https://api.themoviedb.org/3/search/movie?api_key=522dfba9d04a6622db8e00a4a63e9dfb&language=en-US&query=${props.query}&page=1&include_adult=false`,
  });
  const dataSearch = data.results;

  if (isLoading) {
    return (
      <section>
        <p className="bannerLoading">Loading .....</p>
      </section>
    );
  }
  //ham bat sk click
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
  console.log(data);
  return (
    <div className="borderResults">
      <h4>Search Result</h4>
      <div>
        {dataSearch.length > 1 &&
          dataSearch.map((ele) => (
            <img
              key={ele.id}
              src={`https://image.tmdb.org/t/p/w500/${ele.poster_path}`}
              alt="no Img"
              onClick={() => clickHandler(ele)}
            />
          ))}
        <DetailSearch dataDetailSearch={dataClick} />
      </div>
    </div>
  );
}

export default ResultList;
