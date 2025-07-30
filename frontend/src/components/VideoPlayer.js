import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VideoPlayer = () => {
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const playerRef = useRef(null);
  const [watchedTime, setWatchedTime] = useState(0);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/video', {
      headers: { Authorization: token }
    }).then(res => {
      const v = res.data.find(item => item._id === id);
      setVideoUrl(v.url);
      setVideoTitle(v.title);
    });
  }, [id]);

  useEffect(() => {
    if (!videoUrl) return;

    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      const videoId = new URLSearchParams(new URL(videoUrl).search).get("v");

      playerRef.current = new window.YT.Player('ytplayer', {
        height: '360',
        width: '640',
        videoId: videoId,
        events: {
          'onStateChange': onPlayerStateChange
        }
      });
    };
  }, [videoUrl]);

  function onPlayerStateChange(event) {
    if (event.data === window.YT.PlayerState.PLAYING) {
      const interval = setInterval(() => {
        if (playerRef.current && playerRef.current.getCurrentTime) {
          const current = Math.floor(playerRef.current.getCurrentTime());

          if (current % 30 === 0 && current !== watchedTime) {
            setWatchedTime(current);
            axios.post('http://localhost:5000/api/video/watch', {
              videoId: id,
              watchTime: current
            }, {
              headers: { Authorization: token }
            });
          }
        }
      }, 1000);

      playerRef.current.interval = interval;
    } else {
      clearInterval(playerRef.current?.interval);
    }
  }

  return (

    <div className="container">
        <h3>{videoTitle}</h3>
      <div id="ytplayer"></div>
    </div>
  );
};

export default VideoPlayer;
