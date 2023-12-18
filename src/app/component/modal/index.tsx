import { Modal } from 'antd';
import styled from 'styled-components';
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
    <Wrapper>
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
    </Wrapper>
  );
};

export default ModalComponent;

const Wrapper = styled.div`
.ant-modal-content{
  height: 94vh;
    background: transparent;
    box-shadow: none;
    padding: 0px;
}
`;