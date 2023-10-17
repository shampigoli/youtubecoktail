import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import SideBar from "./sidebar";
import SignIn from "./SignIn";

function Test() {
  function signInn(){
    
  }
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState([]); // State to store video data
  const [currentVideo, setCurrentvideo] = useState(null);

  const apiKey = `AIzaSyBC9sB3xIt8PgbXD1eipBdVNndfIW0A7e4`;
  // searchQuery = "gaming";
  // const currentVideo = "https://youtu.be/r_SXopvKTvo?si=TPlBQMaFLOqcr03-";
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${apiKey}&maxResults=500`;
  function handleVideoClick(videoId) {
    setCurrentvideo(videoId);
  }
  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch(apiUrl);
        // console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setVideos(data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchVideos();
  }, []);
  const handleClick = async (e) => {
    e.preventDefault();
    const url2 = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}`;

    try {
      const res = await fetch(url2);
      const data = await res.json();
      console.log(data);
      setVideos(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <nav className="flex justify-between items-center h-24 w-full p-[40px] pt-[20px]  text-white">
        <img src="public/yt-logos.png" alt="" className="h-[70px] w-[170px]" />
        <div className="md:w-[550px] flex justify-between items-center">
          <div
            className="flex justify-between items-center h-[44px] m-[12px] border-[1px]  md:w-[500px] rounded-[20px] border-gray-500 pt-3 pb-3"
            onClick={handleClick}
          >
            <input
              className="h-[30px] m-[12px] md:w-[500px] border-none p-5 pl-0 outline-none bg-transparent  text-gray-500"
              type="text"
              maxLength={50}
              placeholder="Search"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <button className="bg-gray-300 text-gray-400 p-[9px] btn">
              <i className="bi bi-search"></i>
            </button>
          </div>
          <button className="mic bg-gray-300 h-[20px] w-[20px]">
            <i className="bi bi-mic-fill"></i>
          </button>
        </div>
        {/* {/ create logo /} */}
        <div className="w-[150px] flex justify-between items-center text-black">
          <div className="flex flex-col mt-5">
            <i className="bi bi-camera-video text-2xl"></i>
            <small>Create</small>
          </div>
          <i className="bi bi-bell text-2xl"></i>
          <div className="signin" onClick={{SignIn}}>A</div>
        </div>
      </nav>
      <div className="polo">
        {/* {/ sidebar hide show /} */}

        {/* {/ sidebar /} */}
        <div className='w-10 flex flex-col mt-24 ml-[30px]'>
        <Link to='/sidebar'>
    <i className="bi bi-list text-2xl font-light mt-2"></i>
        </Link>
    <i className="bi bi-house-fill text-2xl mt-8"></i>
    <small className='ml-[-5px]'>Home</small>
    <i className="bi bi-caret-right-square text-2xl mt-10"></i>
    <small className='ml-[-5px]'>Shorts</small>
    <i className="bi bi-collection-play-fill text-2xl mt-8"></i>
    <small className='ml-[-20px]'>Supscriptions</small>
    <i className="bi bi-youtube text-2xl mt-8"></i>
    <small className='ml-[-7px]'>Library</small>
    </div>
{/* <Sidebar/> */}
        <div className="flex flex-wrap justify-between gap-0 mt-20">
          {videos?.map((item) => {
            return (
              <>
                <div className="flex flex-col items-center justify-center mt-10">
                  <div
                    className=" rounded-lg"
                    onClick={() => handleVideoClick(item.id.videoId)}
                  >
                    <img
                      src={item.snippet.thumbnails.high.url}
                      alt=""
                      className="h-56 rounded-lg"
                    />
                  </div>

                  <h1 className="w-80 text-center h-[20px] overflow-hidden font-bold">
                    {item.snippet.title}
                  </h1>
                  <div className="flex w-72 mt-2 justify-center items-center">
                    <i className="bi bi-person-circle text-xl"></i>
                    <h3 className="w-80 text-center">
                      {item.snippet.channelTitle}
                    </h3>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        {currentVideo && (
          <div className="fixed inset-0 bg-gray-700 z-50">
            <div className="absolute inset-0 flex justify-center items-center">
              <iframe
                className="rounded"
                title="YouTube Video"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1&rel=0`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
            <button
              className="absolute top-4 right-4 text-white bg-red-500 px-1 py-1 rounded cursor-pointer"
              onClick={() => setCurrentvideo(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        {/* {/ nav /} */}
        <div className="flex justify-center items-center"></div>
      </div>
    </div>
  );
}

export default Test;
