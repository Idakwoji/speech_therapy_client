import { useState } from "react";
import AudioPlayer from "../../views/admin/editTheme/firstPane/AudioPlayer";
import { Image, Checkbox } from "antd";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import VideoModal from "../../views/admin/createPage/VideoModal";
import { generateUrlForMedia } from '../../utils'
import { useRecoilState } from 'recoil'
import { blockForDeleteState } from "../../state";

const MediaBlock = ({
  name,
  image,
  audio,
  video,
  id,
  isBlockEdited
}) => {
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [blobkIds, setBlockIds] = useRecoilState(blockForDeleteState);
  const [checked, setChecked] = useState(blobkIds.includes(id))

  const handleChagnge = () => {
    setChecked(!checked)

    if (checked) {     
      setBlockIds(blobkIds.filter((blockId) => blockId !== id))
    } else {
      setBlockIds([...new Set([...blobkIds, id])])
    }
  }

  return (
    <div className="h-fit w-full rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 py-8">
      {isBlockEdited && (
        <div className="w-full px-5">
          <Checkbox onChange={() => handleChagnge(!checked)} checked={blobkIds.includes(id)}>Delete block</Checkbox>
        </div>
      )}
      <h3 className="mb-3 w-full text-center text-2xl font-semibold">{name}</h3>
      <div className="flex flex-row justify-between px-12">
        {image && (
          <div className="flex flex-col justify-center gap-4">
            <Image
              width="4rem"
              height="4rem"
              src={generateUrlForMedia(image || '')}
              fallback="../../../../assets/broken-image.jpg"
            />
          </div>
        )}
        {audio && (
          <div className="flex flex-col justify-center gap-4">
            <AudioPlayer audioSrc={generateUrlForMedia(audio || '')} />
          </div>
        )}
        {video && (
          <div className="flex flex-col justify-center gap-4">
            <button
              type="button"
              title="view video"
              onClick={() => setShowVideoModal(true)}
              className="flex h-16 w-16 items-center justify-center rounded-md bg-[#ADB5BD] bg-opacity-50"
            >
              <MdOutlineSlowMotionVideo size={40} color="white" />
            </button>
          </div>
        )}
      </div>
      <VideoModal
        isOpen={showVideoModal}
        handleClose={() => setShowVideoModal(false)}
        url={generateUrlForMedia(video || '')}
      />
    </div>
  );
};

export default MediaBlock;
