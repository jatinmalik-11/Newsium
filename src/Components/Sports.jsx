import { useState , useEffect} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const  [news, setNews] = useState([]);
      const [loading, setLoading] = useState(true);
  
      useEffect(() => {
          axios
          .get("https://backendnewsium.onrender.com/")
          .then((res) => {
              setNews(res.data.articles);
              setLoading(false);
          })
          .catch((err) => {
              console.log("Error fetching news:", err);
              setLoading(false); 
            });
      }, []);

  return (
    <>
    <section id = "categories">
    <div class= "carousel">
    <Carousel activeIndex={index} onSelect={handleSelect}>
    
      <Carousel.Item>
        <h1 class = "Entertainment">Entertainment</h1>
      <a href="https://newsapi.org/v2/top-headlines/sources?category=business&apiKey=8bdda7bb58b744918b61dfd642ac7a3c">
      <img class = "image1" src="https://i.postimg.cc/wxQHNhtK/Group-1-5.png" alt="" />
      </a>
      </Carousel.Item>
      <Carousel.Item>
      <h1 class = "Entertainment">Sports</h1>
      <a href="https://newsapi.org/v2/top-headlines/sources?category=entertainment&apiKey=8bdda7bb58b744918b61dfd642ac7a3c">
      <img  class = "image2" src="https://i.postimg.cc/x88kkYv8/Group-2.png" alt="" />
      </a>
      </Carousel.Item>
      <Carousel.Item>
      <h1 class = "Entertainment">Tech</h1>

      <a href="https://newsapi.org/v2/top-headlines/sources?category=sports&apiKey=8bdda7bb58b744918b61dfd642ac7a3c">
        <img  class = "image3" src="https://i.postimg.cc/HLf7GhRR/Group-3.png" alt="" />
      </a>
      </Carousel.Item>
    </Carousel>
    </div>
    </section>
    </>
  );
}

export default ControlledCarousel;