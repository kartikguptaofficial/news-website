import React, { useEffect, useState } from 'react'
import '../Styles/Home.css';

const Home = () => {

    const [news, setNews] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [searchVal, setSearchVal] = useState("country=in");

    async function prevBtnHandler() {
        const res = await fetch(`https://newsapi.org/v2/top-headlines?${searchVal}&apiKey=c005ea6e3e7c44b8ba7c134608256f82&pageSize=5&page=${pageNo}`);
        const data = await res.json();
        if(pageNo < 1){
            window.alert("This is the first page")
        } else{
            setPageNo(pageNo - 1);
            // if(pageNo <= 1){setPageNo(1)}
            console.log(pageNo)
            // console.log(data.articles)
            setNews(data.articles)
        }
    }

    async function nextBtnHandler() {
        const res = await fetch(`https://newsapi.org/v2/top-headlines?${searchVal}&apiKey=c005ea6e3e7c44b8ba7c134608256f82&pageSize=5&page=${pageNo}`);
        const data = await res.json();
        if(pageNo > Math.ceil(data.totalResults/5)){
            window.alert("That's it for today's news")
        } else{
            setPageNo(pageNo + 1)
            // console.log(pageNo)
            // console.log(data.totalResults)
            // console.log(data.articles)
            setNews(data.articles)
        }
    }

    async function inputSearchHandler(e) {
        setSearchVal("q="+e.target.value);
        // console.log(searchVal);
        const res = await fetch(`https://newsapi.org/v2/top-headlines?${searchVal}&apiKey=c005ea6e3e7c44b8ba7c134608256f82&pageSize=5&page=${pageNo}`);
        const data = await res.json();
        setNews(data.articles);
    }

    async function getNews() {
        const res = await fetch(`https://newsapi.org/v2/top-headlines?${searchVal}&apiKey=c005ea6e3e7c44b8ba7c134608256f82&pageSize=5&page=${pageNo}`);
        const data = await res.json();
        // console.log(data.articles);
        setNews(data.articles);
    }

    useEffect(() => {
        getNews()
    }, [])

    return (
        <div className='whole-page'>

            <section className="main-div">
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="2000">
                            <img src="https://images.pexels.com/photos/3944386/pexels-photo-3944386.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" alt="..."/>
                        </div>
                        <div className="carousel-item" data-bs-interval="1000">
                            <img src="https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100" alt="..."/>
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                            <img src="https://images.pexels.com/photos/3944454/pexels-photo-3944454.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" alt="..."/>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

                <nav>
                    <h2>News Website <span>- React JS</span></h2>
                </nav>

                <div className="main-content">
                    <h1>View top headlines </h1>
                </div>

            </section>

            <section className='news-section'>
            
                <input type="text" className='search-input' onChange={inputSearchHandler} placeholder="Topic of your news"/>
                <h2>We are showing you latest news of {searchVal === "country=in" ? <span>"India"</span>: <span>"{searchVal.slice(2)}"</span> }</h2>

                {
                    news.map((item) => {
                        return (
                            <div className="card mb-3" key={item.urlToImage}>
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={item.urlToImage} className="img-fluid rounded-start" alt="..."/>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{item.title}</h5>
                                            <p className="card-text">{item.content}</p>
                                            <p className="card-text"><small className="text-muted">{item.publishedAt}</small></p>
                                            <a className="btn btn-primary" href={item.url} target="_blank" rel="noreferrer">Explore</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </section>

            <div className="bottom-btns">
                <button className="btn btn-outline-dark" onClick={prevBtnHandler}>Previous</button>
                <button className="btn btn-dark nextBtn" onClick={nextBtnHandler}>Next</button>
            </div>

        </div>
    )
}

export default Home
