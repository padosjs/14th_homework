import { useModal } from "@/commons/providers/modal/modal.provider";
import DiariesNew from "@/components/diaries-new";

export const useDiaryModal = () => {
  const { openModal, closeModal } = useModal();

  const handleOpenDiaryModal = () => {
    openModal(<DiariesNew />);
  };

  return {
    openDiaryModal: handleOpenDiaryModal,
    closeDiaryModal: closeModal,
  };
};

