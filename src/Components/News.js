import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  // document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;



  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async (pageNo) => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false)
    console.log(parsedData);
    props.setProgress(100);
  }
  useEffect(() => {
    updateNews();
  }, [])


  const fetchMoreData = async () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    console.log(parsedData);
  };


  return (
    <>

      <h2 className="text-center">NewsMonkey - Top Headlines on {capitalizeFirstLetter(props.category)}</h2>
      {/* {loading && <Spinner/>} */}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={loading && <Spinner />}>
        <div className="container">
          <div className="row">
            {articles.map((element, index) => { // looping through the articles array and mapping each object values to the newsItem component
              return (
                <div className="col-md-3" key={index}>
                  <NewsItem
                    title={element.title !== null && element.title !== undefined ? element.title.slice(0, 40) : ""}
                    description={element.description !== null && element.description !== undefined ? element.description.slice(0, 88) : ""}
                    imageUrl={!element.urlToImage ? "https://images.macrumors.com/t/6b8G5PxTlH6uYOEFaG0IPAF9hKU=/2250x/article-new/2023/06/General-iOS-17-Feature-Orange-Purple.jpg" : element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );

}


News.defaultProps = {
  country: 'us',
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News;