import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-ads/dist/videojs.ads.css';
import 'videojs-contrib-ads';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  let player;

  useEffect(() => {
    // Initialize video.js player
    player = videojs(videoRef.current, {
      controls: true,
      autoplay: false,
      preload: 'auto',
      fluid: true,
      sources: [{
        src: 'https://live-hls-abr-cdn.livepush.io/live/bigbuckbunnyclip/index.m3u8',
        type: 'application/x-mpegURL'
      }]
    });

    // Register the ad plugin
    player.ads(); // This enables the contrib-ads plugin

    // Setup preroll
    player.on('readyforpreroll', () => {
        console.log("adsreadyforprerollll")
      player.ads.startLinearAdMode();

      // Simulate an ad (replace with your actual ad integration)
      player.src({
        src: 'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpreonly&ciu_szs=300x250%2C728x90&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator=',
        type: 'application/x-mpegURL'
      });

      // After the ad ends, play the main content
      player.on('adended', () => {
        console.log("adsendddddd")

        player.ads.endLinearAdMode(); // End the ad mode
        player.src({
            src: 'https://live-hls-abr-cdn.livepush.io/live/bigbuckbunnyclip/index.m3u8',
            type: 'application/x-mpegURL'
          });
        player.play();
      });
    });

    player.on('error', () => {
        console.error('An error occurred during ad or live stream playback.');
      });

    // Trigger the preroll ad before playback starts
    player.trigger('adsready');

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, []);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js" />
    </div>
  );
};

export default VideoPlayer;