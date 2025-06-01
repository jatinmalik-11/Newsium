import React, { useEffect, useState } from "react";

const SimpleNewsApp = () => {
  
  const [userLocation, setUserLocation] = useState(null);  
  const [newsArticles, setNewsArticles] = useState([]);    
  const [message, setMessage] = useState("Finding your location...");  

  useEffect(() => {
    getUserLocationAndNews();
  }, []);

  const getUserLocationAndNews = () => {
    if (!navigator.geolocation) {
      setMessage("Your browser doesn't support GPS. Using Delhi, India.");
      useDefaultLocation();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        setUserLocation([latitude, longitude]);
        
        getNewsForLocation(latitude, longitude);
      },
      
      (error) => {
        setMessage("Couldn't find your location. Using Delhi, India.");
        useDefaultLocation();
      }
    );
  };

  const useDefaultLocation = () => {
    const delhiCoords = [28.6139, 77.2090]; // Delhi's coordinates
    setUserLocation(delhiCoords);
    getNewsForLocation(delhiCoords[0], delhiCoords[1]);
  };
  const getNewsForLocation = async (lat, lon) => {
    setMessage("Getting news for your area...");
    
    try {
      const countryResponse = await fetch(
        https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json
      );
      const countryData = await countryResponse.json();
      
      // ('us', 'in', 'uk')
      const countryCode = countryData?.address?.country_code || "in";
      
      const newsResponse = await fetch(
        https://backendnewsium.onrender.com/?country=${countryCode}
      );
      const newsData = await newsResponse.json();
      
      setNewsArticles(newsData.articles || []);
      setMessage(Found ${newsData.articles?.length || 0} news articles for your area);
      
    } catch (error) {
      setMessage("Sorry, couldn't get news right now. Please try again later.");
      setNewsArticles([]);
    }
  };

  return (
  <section id="map">
    <div className="page-container"> 
    <h1 class="headingArea">In Your Area</h1> 

      {location ? (
        <div className="location-feature-container">
          <div className="map-container">
            <Map location={location} />
          </div>
          <div className="location-news-list">
            <h3 className="news-list-title">Headlines Nearby</h3>
            {loading ? ( 
              <p className="loading-text">Loading news...</p>
            ) : articles.length === 0 ? (
              <p className="empty-text">No news found for this region.</p>
            ) : (
              <ul className="article-list">
                {articles.map((article, idx) => (
                  <li key={idx} className="news-article">
                    <h4 className="article-title">{article.title}</h4>
                    {article.description && (
                      <p className="article-description">{article.description}</p>
                    )}
                    {article.url && ( 
                        <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="article-link"
                        >
                            Read More {article.source?.name ? `at ${article.source.name}` : ''}
                        </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
         loading && <p className="loading-text large">Determining location and fetching news...</p>
      )}
    </div>
    </section>  
  );
};

export default SimpleNewsApp;
