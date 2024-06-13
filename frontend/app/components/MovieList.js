import { useState, useEffect } from "react";
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MovieList() {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovieList = async () => {
    try {
      const response = await axios.get('http://localhost:3001/movieList');
      setMovieList(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error getting the movie: ', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieList();
  }, []);

  // Slick carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 9, // Default for large screens
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Medium screens
        settings: {
          slidesToShow: 6,
        }
      },
      {
        breakpoint: 640, // Mobile screens
        settings: {
          slidesToShow: 4,
        }
      }
    ]
  };

  if (loading) {
    return <p>Loading movies...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Slider {...settings}>
        {movieList.map((movie, index) => (
          <div key={index} className="p-2">
            <div className="rounded-lg shadow-lg justify-center items-center overflow-hidden">
              <img src={movie.thumbnailUrl} alt={movie.title} className="w-5/6 h-30 object-contain bg-gray-950" />
              <div className="p-4">
                <h3 className="text-lg font-bold">{movie.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
