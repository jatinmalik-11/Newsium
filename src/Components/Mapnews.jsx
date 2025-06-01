//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; 

const PageTwo = () => {
  const [location, setLocation] = useState(null); 
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationStatus, setLocationStatus] = useState("Fetching location..."); 

  useEffect(() => {
    let isMounted = true;

    const fetchLocationAndNews = async () => {
      if (!navigator.geolocation) {
        setLocationStatus("Geolocation is not supported by this browser.");
        const defaultLocation = [28.6139, 77.2090]; 
        setLocation(defaultLocation);
        setLocationStatus(prev => `${prev} Showing news for Delhi.`);
        await fetchNews(defaultLocation); 
        if (isMounted) setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          if (!isMounted) return; 

          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const currentLoc = [lat, lng];

          setLocation(currentLoc); 
          setLocationStatus(`Location: ${lat.toFixed(3)}, ${lng.toFixed(3)}`);

          await fetchNews(currentLoc); 
          if (isMounted) setLoading(false); 
        },
        async (err) => { 
          if (!isMounted) return;
          console.error("Geolocation error:", err);
          setLocationStatus("Unable to fetch location.");
          const defaultLocation = [28.6139, 77.2090];
          setLocation(defaultLocation);
          setLocationStatus(prev => `${prev} Showing news for Delhi.`);
          await fetchNews(defaultLocation); 
          if (isMounted) setLoading(false);
        }
      );
    };

    const fetchNews = async (locToFetch) => {
        if (!locToFetch) return; 

        try {
            const geoRes = await fetch(
                 `https://nominatim.openstreetmap.org/reverse?lat=${locToFetch[0]}&lon=${locToFetch[1]}&format=json`
            );
            if (!geoRes.ok) throw new Error(`Geocoding failed: ${geoRes.statusText}`);

            const geoData = await geoRes.json();
            const country = geoData?.address?.country_code || "in"; // Default to India
            console.log("Detected Country Code:", country);

             const newsRes = await fetch(
                 `https://backendnewsium.onrender.com/?country=${country}`
             );
             if (!newsRes.ok) throw new Error(`News fetch failed: ${newsRes.statusText}`);

             const newsData = await newsRes.json();

             if (isMounted) {
                 setArticles(newsData.articles || []);
             }
         } catch (err) {
             console.error("Error fetching data:", err);
             if (isMounted) {
                setLocationStatus(prev => `${prev} Error fetching news.`);
                setArticles([]); 
             }
         } 
    };


    fetchLocationAndNews();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
<>
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
  </>
  );
};


const Map = ({ location }) => {
    const mapRef = React.useRef(null); 
    const mapContainerRef = React.useRef(null); 

    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) {
            return;
        }

        mapRef.current = L.map(mapContainerRef.current).setView(location, 13); 

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapRef.current);

        const marker = L.marker(location).addTo(mapRef.current);
        marker.bindPopup('Your approximate location').openPopup();

        const mapInstance = mapRef.current;
        const resizeObserver = new ResizeObserver(() => {
           mapInstance.invalidateSize(); 
        });
        resizeObserver.observe(mapContainerRef.current);


        return () => {
            resizeObserver.disconnect(); 
            if (mapInstance) {
                mapInstance.remove(); 
                mapRef.current = null; 
            }
        };
    }, []); 

    useEffect(() => {
        if (mapRef.current && location) {
            mapRef.current.setView(location, 13); 
             const markerLayer = mapRef.current.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    layer.setLatLng(location); 
                    return;
                }
            });
            let markerExists = false;
            mapRef.current.eachLayer(layer => { if (layer instanceof L.Marker) markerExists = true; });
            if (!markerExists) {
                 L.marker(location).addTo(mapRef.current).bindPopup('Your approximate location').openPopup();
            }

        }
    }, [location]); 

    return <div id="map" ref={mapContainerRef} style={{ height: "100%", width: "100%" }}></div>;
};

export default PageTwo;
