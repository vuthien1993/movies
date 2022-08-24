import React, { useEffect, useState } from "react";
import useHttpId from "../../hook/use-httpid";
import "./MovieDetail.css";
import YouTube from "react-youtube";
import "bootstrap/dist/css/bootstrap.css";

function MovieDetail(props) {
  console.log("test detail");

  // const [data, setData] = useState({
  //   results: [
  //     {
  //       iso_639_1: "",
  //       iso_3166_1: "",
  //       name: "",
  //       key: "",
  //       site: "",
  //       size: "",
  //       type: "",
  //       official: false,
  //       published_at: "",
  //       id: "",
  //     },
  //   ],
  // });
  // const [isLoading, setIsLoading] = useState(true);
  // const [httpError, setHttpError] = useState();
  // useEffect(() => {
  //   //khai bao ham dung async
  //   const fetchMovieDetail = async () => {
  //     //gui lenh lay data tu api
  //     const reponse = await fetch(
  //       `https://api.themoviedb.org/3/movie/${props.dataMoviesDetail.id}/videos?api_key=522dfba9d04a6622db8e00a4a63e9dfb&language=en-US`
  //     );
  //     //nen loi khi xu ly ko thanh cong
  //     if (!reponse.ok === true) {
  //       throw new Error("Something went wrong!");
  //     }
  //     const data = await reponse.json();
  //     //chuyen tu obj sang mang

  //     //set lai data vao state
  //     setData(data);

  //     setIsLoading(false);
  //   };
  //   //bao loi
  //   fetchMovieDetail().catch((error) => {
  //     setIsLoading(false);
  //     setHttpError(error.message);
  //   });
  // }, [props.dataMoviesDetail.id, props.dataMoviesDetail.display]);

  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };
  const { isLoading, httpError, data } = useHttpId({
    url: `https://api.themoviedb.org/3/movie/${props.dataMoviesDetail.id}/videos?api_key=522dfba9d04a6622db8e00a4a63e9dfb&language=en-US`,
  });
  const dataFilter = data.results.filter(
    (ele) =>
      ele.site === "YouTube" &&
      (ele.type === "Trailer" || ele.type === "Teaser")
  );
  const item = dataFilter[0];

  console.log(data);
  console.log(props);

  return (
    <div className="container-fluid">
      {props.dataMoviesDetail.display && (
        <div className="borderDetail row">
          <div className="col-md-6">
            {data.results.length !== 0 ? (
              <h3>{data.results[0].name}</h3>
            ) : (
              <h3>{props.dataMoviesDetail.name}</h3>
            )}
            {data.results.length === 1 ? <p></p> : <hr />}
            {data.results.length === 1 ? (
              <p></p>
            ) : (
              <p className="indam">
                Release_date: {props.dataMoviesDetail.date}
              </p>
            )}

            {data.results.length === 1 ? (
              <p></p>
            ) : (
              <p className="indam">
                Vote: {props.dataMoviesDetail.vote_average}/10
              </p>
            )}
            <p className="textAlign">{props.dataMoviesDetail.overview}</p>
          </div>
          <div className="col-md-6">
            {dataFilter.length === 0 ? (
              <div />
            ) : (
              <div key={item.id}>
                <YouTube videoId={item.key} opts={opts} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetail;
