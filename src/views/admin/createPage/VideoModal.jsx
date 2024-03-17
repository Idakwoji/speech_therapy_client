import { Modal } from "antd";
import VideoPlayer from "react-player";

const VideoModal = ({ url, isOpen, handleClose }) => {
  return (
    <Modal
      centered
      title=""
      open={isOpen}
      onCancel={handleClose}
      className="flex items-center justify-center"
      footer={<></>}
    >
      <div className="mt-10">
        <VideoPlayer
          controls
          url={url || "https://youtu.be/3L-8UKhwJ04?si=_i0RnTe0FxyJd33u"}
          width="29.5rem"
          height="16rem"
        />
      </div>
    </Modal>
  );
};

export default VideoModal;
