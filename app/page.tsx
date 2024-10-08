"use client"
import { useEffect } from "react";
import LiveVideoPlayerWithPreRollAndDAI from "../components/player"
import VideoPlayer from "../components/videoplayer"

export default function Home() {


  useEffect(() => {
		
	}, []);
  const preRollAdUrl = 'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpreonly&ciu_szs=300x250%2C728x90&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&impl=s&correlator=';
  const liveStreamUrlWithDAIKey = 'https://dai.google.com/linear/hls/pb/event/c-rArva4ShKVIAkNfy6HUQ/stream/8ac4cf77-7558-40fe-bf56-e58c7002837e:TPE/master.m3u8?dai_key=c-rArva4ShKVIAkNfy6HUQ';
  const daiKey = 'c-rArva4ShKVIAkNfy6HUQ'
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    sources: [
      {
        src: "https://path-to-your-live-stream.m3u8",
        type: "application/x-mpegURL",
      },
    ],
  };
  return (
    <div>
      <h1 style={{ color: "red" }}>Player Live Stream</h1>
      {/* <div style={{ display: 'flex', justifyContent: 'center', border: '2px solid black', height: '50vh' }}>

        <LiveVideoPlayerWithPreRollAndDAI
          preRollAdUrl={preRollAdUrl}
          liveStreamUrlWithDAIKey={liveStreamUrlWithDAIKey}
        />
      </div> */}
       {/* <h1>Live Stream with DAI Key</h1>
      <VideoPlayer daiKey={daiKey} /> */}
        <VideoPlayer />
    </div>
  );
}
