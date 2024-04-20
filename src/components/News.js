import React, { useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {
  const [articles , setArticles] = useState([])
  const [loading , setLoading] = useState(true)
  const [page , setPage] = useState(1)
  const [totalResults , setTotalResults] = useState(0)
  // document.title = `${props.category} - DigiNews`

  const updateNews = async () => {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    setLoading(true)
    let data = await fetch(url)
    let parseData = await data.json()
    console.log(parseData);
    setArticles(parseData.articles)
    setLoading(false)
    setTotalResults(parseData.setTotalResults)
    props.setProgress(100)
  }

  useEffect(() => {
    updateNews()
  },[])

 
  // const handlePrevClick = async () => {
  //   setPage(page-1)
  //   updateNews()
  // }

  // const handleNextClick = async () => {
  //   setPage(page+1)
  //   updateNews()
  // }

  const fetchMoreData = async () => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
    setPage(page+1)
    let data = await fetch(url)
    let parseData = await data.json()
    setArticles(articles.concat(parseData.articles))
    setTotalResults(parseData.totalResults)
  };

    return (
      <>
        <h1 className="text-center" style={{ margin: '30px 0px' }}>DigiNews - Top {props.category} Headlines</h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
          </div>
        </InfiniteScroll>
        </>
    )

}
News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: "General"
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News
