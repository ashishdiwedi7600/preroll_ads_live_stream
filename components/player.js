import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-ads'; // Ads plugin

const LiveVideoPlayerWithPreRollAndDAI = ({ preRollAdUrl, liveStreamUrlWithDAIKey }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const player = videojs(videoRef.current, {
      autoplay: true,
      controls: true,
      fluid: true, // Responsive player
      sources: [
        {
          src: preRollAdUrl, // Start with pre-roll ad source
          type: 'application/x-mpegURL' // Assuming the pre-roll ad is an MP4
        }
      ]
    });
    playerRef.current = player;

    // Initialize the Video.js ads plugin
    player.ready(() => {
      player.ads(); // Initialize ads

      player.on('adsready', () => {
        // Trigger the pre-roll ad
        console.log("adsreadyyyyyyy")
        player.trigger('adsrequest');
      });

      // After the ad finishes, switch to the live stream with DAI
      player.on('adend', () => {
        player.src({
          src: liveStreamUrlWithDAIKey, // Switch to the live stream with DAI key
          type: 'application/x-mpegURL' // Assuming it's an HLS stream
        });
        player.play(); // Play the live stream
      });

      // Handle error scenarios if needed
      player.on('error', () => {
        console.error('An error occurred during ad or live stream playback.');
      });
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose(); // Cleanup on component unmount
      }
    };
  }, [preRollAdUrl, liveStreamUrlWithDAIKey]);

  return (
    <div>
      <div data-vjs-player>
        <video ref={videoRef} className="video-js vjs-big-play-centered" />
      </div>
    </div>
  );
};

export default LiveVideoPlayerWithPreRollAndDAI;