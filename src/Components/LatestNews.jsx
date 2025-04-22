import {useState, useEffect } from 'react'
import axios from 'axios'

const LatestNews = () => { 
    const  [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
        .get("https://backendnewsium.onrender.com")
        .then((res) => {
            setNews(res.data.articles);
            setLoading(false);
        })
        .catch((err) => {
            console.log("Error fetching news:", err);
            setLoading(false); 
          });
    }, []);
    if(loading){
        return(
                <h1>Please wait, news is coming your way...</h1>
        )
    }

    return(
        <>
        <div className="latestNews">
        <h1 class= "heading">Top Headlines</h1>
            {news.map((newz) => (
                <div className="newz-a" key={newz.id}>
                    <ul>
                        <li  className="news-article-home">
                        <h4 className="article-title-home">{newz.title}</h4>
                        {newz.description && (
                      <p className="article-description-home">{newz.description}</p>
                    )}
                        <a
                            href={newz.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="article-link-home"
                        >Read More {newz.source?.name ? `at ${newz.source.name}` : ''}</a>
                        </li>
                    </ul>
                </div>
            ))}
        </div>
        </>
    )
}
export default LatestNews