import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props) {
    super(props); // whenever we want to call a constructor we need to call super()
    console.log("constructor here");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async updateNews(pageNo){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults});
    console.log(parsedData);
    this.props.setProgress(100);
  }

  async componentDidMount(){
    this.updateNews();
  // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pagesize=${this.props.pageSize}`;
  // let data = await fetch(url);
  // let parsedData = await data.json();
  // this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults});
  // console.log(parsedData);
}
handlePreviousClick = async ()=>{
  // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
  // this.setState({loading: true});
  // let data = await fetch(url);
  // let parsedData = await data.json();
  // this.setState({articles: parsedData.articles});
  // console.log(parsedData);
  // this.setState({
  //   page: this.state.page - 1,
  //   articles: parsedData.articles,
  //   loading: false
  // })
  this.setState({
    page: this.state.page - 1
  });
  console.log("previous");
  this.updateNews();
}
handleNextClick = async ()=>{
  // if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
  //   // do nothing
  // }
  // else{
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
  //   this.setState({loading: true});
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({articles: parsedData.articles});
  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parsedData.articles,
  //     loading: false
  //   })
  // }
  this.setState({
    page: this.state.page + 1
  });
  console.log("next");
  this.updateNews();
}

fetchMoreData = async () => {
  this.setState({page: this.state.page + 1})
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}`;
  let data = await fetch(url);
  let parsedData = await data.json();
  this.setState({articles: this.state.articles.concat(parsedData.articles), 
    totalResults: parsedData.totalResults
  });
  console.log(parsedData);
};


  render() {
    return (
      <>

          <h2 className="text-center">NewsMonkey - Top Headlines on {this.capitalizeFirstLetter(this.props.category)}</h2>
          {/* {this.state.loading && <Spinner/>} */}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading &&<Spinner/>}>
          <div className="container">
          <div className="row">
            {this.state.articles.map((element,index) => { // looping through the articles array and mapping each object values to the newsItem component
              return (
                <div className="col-md-3" key={index}>
                  <NewsItem
                    title={element.title !== null && element.title !== undefined ?  element.title.slice(0,40) : ""}
                    description={element.description !== null && element.description !== undefined ?  element.description.slice(0,88) : ""}
                    imageUrl={!element.urlToImage?"https://images.macrumors.com/t/6b8G5PxTlH6uYOEFaG0IPAF9hKU=/2250x/article-new/2023/06/General-iOS-17-Feature-Orange-Purple.jpg":element.urlToImage}
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
}

export default News;