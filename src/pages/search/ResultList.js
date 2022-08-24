import React from "react";
import "./ResultList.css";
import useHttp from "../../hook/use-http";
function ResultList(props) {
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

  return (
    <div className="borderResults">
      <h4>Search Result</h4>
      <div>
        {dataSearch.length > 1 &&
          dataSearch.map((ele) => (
            <img
              key={ele.id}
              src={`https://image.tmdb.org/t/p/w500/${ele.poster_path}`}
              alt="no data"
            />
          ))}
      </div>
    </div>
  );
}

export default ResultList;
