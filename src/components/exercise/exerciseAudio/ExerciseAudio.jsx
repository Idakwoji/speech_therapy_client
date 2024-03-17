/* eslint-disable react/prop-types */
const ExerciseAudio = ({ demoAudio }) => {
    return (
        <div>
            <h3 className="pb-2 mx-auto text-2xl">Speel trainingsaudio af</h3>
            <audio className="m-auto" src={demoAudio} controls></audio>
        </div>
    )
}

export default ExerciseAudio