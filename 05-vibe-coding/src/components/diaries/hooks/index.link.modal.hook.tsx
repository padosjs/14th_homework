import { useModal } from "@/commons/providers/modal/modal.provider";
import DiariesNew from "@/components/diaries-new";
import { Modal } from "@/commons/components/modal";

export const useDiaryModal = () => {
  const { openModal, closeModal } = useModal();

  const handleOpenDiaryModal = () => {
    // dim 영역 클릭 시 실행될 함수
    const handleCloseWithConfirm = () => {
      // 계속작성: 등록취소 모달(자식)만 닫기
      const handleContinue = () => {
        closeModal();
      };

      // 등록취소: 등록취소 모달(자식)과 일기쓰기 모달(부모) 모두 닫기
      const handleCancel = () => {
        closeModal(); // 등록취소 모달 닫기
        closeModal(); // 일기쓰기 모달 닫기
      };

      // 등록취소 확인 모달 열기
      openModal(
        <Modal
          variant="info"
          actions="dual"
          theme="light"
          title="등록을 취소하시겠습니까?"
          description="작성 중인 내용은 저장되지 않습니다."
          confirmText="등록취소"
          cancelText="계속작성"
          onConfirm={handleCancel}
          onCancel={handleContinue}
        />
      );
    };

    // DiariesNew 모달을 열 때 onClose에 handleCloseWithConfirm 전달
    openModal(<DiariesNew />, { onClose: handleCloseWithConfirm });
  };

  return {
    openDiaryModal: handleOpenDiaryModal,
    closeDiaryModal: closeModal,
  };
};

