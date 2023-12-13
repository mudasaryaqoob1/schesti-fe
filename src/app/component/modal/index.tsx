import { Modal } from 'antd';
interface Props {
  children: React.ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  width?: string;
}
const ModalComponent = ({
  setOpen,
  open,
  children,
  width = '600px',
}: Props) => {
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      closable={false}
      footer={null}
      centered={true}
      onCancel={handleCancel}
      width={width}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;
