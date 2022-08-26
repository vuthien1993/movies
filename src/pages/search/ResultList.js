import React from "react";
import DetailSearch from "./DetailSearch";
import useCarousel from "../../hook/use-carousel";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./ResultList.css";
import useHttp from "../../hook/use-http";

function ResultList(props) {
  const { isLoading, data } = useHttp({
    url: `https://api.themoviedb.org/3/search/movie?api_key=522dfba9d04a6622db8e00a4a63e9dfb&language=en-US&query=${props.query}&page=1&include_adult=false`,
  });
  const dataSearch = data.results;
  //su dung custom hook de dinh dang hien thi va xu ly su kien khi click
  const { dataClick, responsive, items } = useCarousel(dataSearch);
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
        {dataSearch[0].id === "" ? (
          <div></div>
        ) : (
          <AliceCarousel
            mouseTracking
            items={items}
            responsive={responsive}
            controlsStrategy="alternate"
            disableDotsControls
          />
        )}

        <DetailSearch dataDetailSearch={dataClick} />
      </div>
    </div>
  );
}

export default ResultList;
