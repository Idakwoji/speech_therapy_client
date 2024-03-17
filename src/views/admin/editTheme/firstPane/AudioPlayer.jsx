// import {  useRef } from "react";
import { AiOutlineAudio } from "react-icons/ai";
function AudioPlayer({ audioSrc }) {
  //   const [isPlaying, setIsPlaying] = useState(false);
  //   const audioRef = useRef(null);

  //   const togglePlay = () => {
  //     if (isPlaying) {
  //       audioRef.current.pause();
  //     } else {
  //       audioRef.current.play();
  //     }
  //     setIsPlaying(!isPlaying);
  //   };

  //   const handleAudioEnded = () => {
  //     setIsPlaying(false);
  //   };
  //   console.log({ audioSrc });
  const playAudio = () => {
    const audioUrl = new Audio(audioSrc);
    console.log({ audioUrl });
    if (audioUrl.paused) audioUrl.play();
    else audioUrl.pause();
  };
  return (
    <button
      className="focus:outline-none"
      //   onClick={togglePlay}
      onClick={playAudio}
      title="Play audio"
      type="button"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ADB5BD] bg-opacity-50">
        <AiOutlineAudio size={36} color="white" />
        {/* <audio
          autoPlay
          ref={audioRef}
          src={
            "https://soundcloud.com/octobersveryown/drake-idgaf-feat-yeat?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
          }
          onEnded={handleAudioEnded}
        ></audio> */}
      </div>
    </button>
  );
}

export default AudioPlayer;
