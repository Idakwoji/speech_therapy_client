/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const Recorder = ({setRecordedAudio, sendAudio }) => {
  const prevAudioBlobRef = useRef();
  // Button State controls what is displayed on the button
  const [buttonState, setButtonState] = useState('not speaking')
  const [hovered, setHovered] = useState(false)

  const [recording, setRecording] = useState(null)
  const [recorderMedia, setRecorderMedia] = useState(null)
  const [audioBlob, setAudioBlob] = useState()

  //  fix not sending audio on first try
  // var using recorderMedia, Recording, and AudioBlob
  // recording - is the stream of audio being listened to, it has no audio format
  // RecorderMedia - is the stream of audio that is actually being recorded, it has no audio format, it is the same format as recording
  // AudioBlob - is the blob version of recordermedia, it is in a .wav audio format

  const [stopped, setStopped] = useState()
  // recently added configuration for third-party polyfill library
  useEffect(() => {
    if (!window.MediaRecorder) {
      import('../../../polyfill.js').then(({ default: polyfill }) => {
        // Optionally, you can execute any code related to the polyfill here
        console.log('Polyfill loaded:', polyfill);
      });
    }
  }, []);

  // set button display design
  useEffect(() => {
    buttonState === "not speaking" ? setHovered(false) : setHovered(true)
  }, [buttonState])

  // request for mic acccess on page load
  useEffect(() => {
    const constraints = { 'audio': true }
    const grantMic = () => {
      if (navigator.mediaDevices)
        navigator.mediaDevices.getUserMedia(constraints)
          .then((stream) => {
            const audioStream = new MediaStream(stream)
            setRecording(audioStream)
          })
          .catch(error => {
            console.error('Error accessing media devices.', error);
            alert('App does not have mic access')
          });
    }
    // call grant mic function
    grantMic()
  }, [])

  // // start recording when the record button is clicked
  // const startRecording = async () => {
  //   return new Promise((resolve) => {
  //     const mediaRecorder = new MediaRecorder(recording);
  //     setRecorderMedia(mediaRecorder);

  //     mediaRecorder.addEventListener('dataavailable', event => {
  //       const blob = new Blob([event.data], { type: 'audio/wav; codecs=opus' });
  //       setAudioBlob(blob);
  //     });

  //     mediaRecorder.addEventListener('start', () => {
  //       resolve(); // Resolve the Promise once recording starts
  //     });

  //     mediaRecorder.start();
  //   });
  // }

  // // stop recording when the check button is clicked
  // const stopRecording = () => {
  //   if (recorderMedia !== null) {
  //     recorderMedia.stop();
  //     setStopped(true)
  //     setRecordedAudio(audioBlob);
  //   }
  //   else {
  //     console.log('Recorder media is returning null')
  //   }
  // }

  // start recording when the record button is clicked
const startRecording = async () => {
  return new Promise((resolve) => {
    const mediaRecorder = new MediaRecorder(recording);
    setRecorderMedia(mediaRecorder);

    const chunks = [];

    mediaRecorder.addEventListener('dataavailable', event => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    });

    mediaRecorder.addEventListener('start', () => {
      resolve(); // Resolve the Promise once recording starts
    });

    mediaRecorder.addEventListener('stop', () => {
      const blob = new Blob(chunks, { type: 'audio/wav; codecs=opus' });
      setAudioBlob(blob);
    });

    mediaRecorder.start();
  });
}

// stop recording when the check button is clicked
const stopRecording = async () => {
  if (recorderMedia !== null) {
    recorderMedia.stop();
    await startRecording(); // Wait for startRecording to complete
    setStopped(true);
    setRecordedAudio(audioBlob);
  } else {
    console.log('Recorder media is returning null');
  }
}

  useEffect(() => {
    prevAudioBlobRef.current = audioBlob;
    if (audioBlob && stopped) {
      // sendAudio(audioBlob)
      sendAudio(audioBlob)
      setStopped(!stopped)
      // console.log("this is the recorded audio blob"); console.log(audioBlob)
    } else console.log("Previous audioBlob:", prevAudioBlobRef.current);
  }, [stopped, audioBlob, sendAudio, setRecordedAudio])

  // discard the recording when the discard button is clicked
  const discardRecording = () => {
    if (recorderMedia !== null) {
      recorderMedia.stop()
    }
    else
      console.log('error deleting media')
  }

  const handleClick = async () => {
    if (buttonState === 'not speaking') {
      setButtonState('speaking');
      await startRecording();
      setButtonState('finished speaking');
    } else {
      console.log('A user should be speaking, wait for them to finish');
    }
  };

  return (
    <div className="flex flex-col content-center justify-center w-full ">
      <div className='relative flex flex-row justify-center w-full pt-16'>
        <div className="absolute z-5 w-72 h-72 -bottom-4 bg-[#86A7FC] border-4 border-[#6366F1] rounded-full">
          {/* Outer Circle Ring */}
        </div>
        {/* recorder button */}
        <motion.div
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          draggable={false}
          className='rounded-full z-20 w-64 h-64 bg-[#6366F1] flex flex-row justify-center content-center select-none'>
          <p className={`text-white m-auto text-5xl w-9/12 text-center`}>
            {buttonState === 'not speaking' ? 'Tik om te spreken' : "Jij bent aan het woord"}
          </p>
          {/* <p className='w-9/12 m-auto text-5xl text-center text-white'>Tik om te spreken</p> */}
        </motion.div>

        <motion.div
          initial={{ x: 0, y: 50 }}
          animate={{ x: hovered ? 190 : 0 }}
          onClick={() => { setHovered(false), setButtonState('not speaking'), discardRecording() }}
          draggable={false}
          className='absolute z-10 bottom-[6rem] rounded-full w-fit h-fit text-white select-none'>
          <img alt="cancel button" srcSet="/cancel-icon.svg" />
        </motion.div>
        <motion.div
          initial={{ x: 0, y: -50 }}
          animate={{ x: hovered ? 190 : 0 }}
          onClick={() => { setHovered(false), setButtonState('not speaking'), stopRecording() }}
          draggable={false}
          className='absolute z-10 bottom-[6rem] rounded-full w-fit h-fit text-white select-none'>
          <img alt="accept button" srcSet="/accept-icon.svg" />
        </motion.div>
      </div>
    </div>
  )

}

export default Recorder
