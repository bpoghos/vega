import Modal from 'react-modal';

const ImageModal = ({ isOpen, onClose, imageUrl }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Image Modal"
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                content: {
                    maxWidth: '70%',
                    height: ' 100%',
                    margin: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: "#000"
                },
            }}
        >
            <img src={imageUrl} alt="LargePhoto" style={{ maxHeight: "90%" }} />
        </Modal>
    );
};

export default ImageModal;
