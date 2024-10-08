import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import {  LiveStream } from 'videojs-ima';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-ads';
import 'videojs-ima';

const useVideoJS = (options, daiKey) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      // Initialize Video.js player
          playerRef.current = videojs(videoRef.current, options, function onPlayerReady() {
              // Integrate IMA plugin with DAI key
            //   this.ima({
            //     adTagUrl: `https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpreonly&ciu_szs=300x250%2C728x90&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator=`,
            //     debug: true, // optional, for debugging
            //   });
            const imaOptions = {
                fallbackStreamUrl: ' https://dai.google.com/linear/hls/pb/event/c-rArva4ShKVIAkNfy6HUQ/stream/6834a69d-6896-496f-b860-fd6935adff23:SIN2/master.m3u8',
            };
              let stream;
              const streamFormat = 'hls';
              stream = new LiveStream(streamFormat, daiKey);
              // console.log(stream)
              playerRef.current.on('stream-manager', (response) => {
                  const streamRequest = response.StreamRequest;
                  // console.log(response)
                  response.StreamManager.addEventListener(
                      [
                          google.ima.dai.api.StreamEvent.Type.LOADED,
                          google.ima.dai.api.StreamEvent.Type.ERROR,
                          google.ima.dai.api.StreamEvent.Type.AD_BREAK_STARTED,
                          google.ima.dai.api.StreamEvent.Type.AD_BREAK_ENDED,
                      ],
                      onStreamEvent,
                      false
                  );
              });
              function onStreamEvent(e) {
                  switch (e.type) {
                      case (e.type, google.ima.dai.api.StreamEvent.Type.LOADED):
                          console.log('Ad Event:', e.type);
                          break;
                      case google.ima.dai.api.StreamEvent.Type.AD_BREAK_STARTED:
                          console.log('Ad Event:', e.type);
                          setAdsOn(true);
                          break;
                      case google.ima.dai.api.StreamEvent.Type.AD_BREAK_ENDED:
                          console.log('Ad Event:', e.type);
                          setAdsOn(false);
                          break;
                  }
              }
              playerRef.current.imaDai(stream,imaOptions);
          });
      }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [options, daiKey]);

  return { videoRef };
};

export default useVideoJS;