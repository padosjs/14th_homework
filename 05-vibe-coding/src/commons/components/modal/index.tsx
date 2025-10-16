import Button from '../button';
import styles from './styles.module.css';

export interface ModalProps {
  /** 모달의 변형 타입 */
  variant?: 'info' | 'danger';
  /** 버튼 액션 타입 */
  actions?: 'single' | 'dual';
  /** 테마 설정 */
  theme?: 'light' | 'dark';
  /** 모달 제목 */
  title: string;
  /** 모달 설명 */
  description?: string;
  /** 확인 버튼 텍스트 */
  confirmText?: string;
  /** 취소 버튼 텍스트 */
  cancelText?: string;
  /** 확인 버튼 클릭 핸들러 */
  onConfirm?: () => void;
  /** 취소 버튼 클릭 핸들러 */
  onCancel?: () => void;
}

export const Modal = ({
  variant = 'info',
  actions = 'single',
  theme = 'light',
  title,
  description,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
}: ModalProps) => {
  const modalClassNames = [
    styles.modal,
    styles[`variant-${variant}`],
    styles[`theme-${theme}`],
  ]
    .filter(Boolean)
    .join(' ');

  const buttonWrapperClassNames = [
    styles.buttonWrapper,
    styles[`actions-${actions}`],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={modalClassNames} data-testid="modal">
      <div className={styles.content}>
        <h2 className={styles.title} data-testid="modal-title">
          {title}
        </h2>
        {description && (
          <p className={styles.description} data-testid="modal-description">
            {description}
          </p>
        )}
      </div>

      <div className={buttonWrapperClassNames} data-testid="modal-buttons">
        {actions === 'dual' && (
          <Button
            variant="secondary"
            theme="light"
            size="large"
            onClick={onCancel}
            className={styles.dualButton}
            data-testid="modal-cancel-button"
          >
            {cancelText}
          </Button>
        )}
        <Button
          variant="primary"
          theme="light"
          size="large"
          onClick={onConfirm}
          className={actions === 'single' ? styles.singleButton : styles.dualButton}
          data-testid="modal-confirm-button"
        >
          {confirmText}
        </Button>
      </div>
    </div>
  );
};

export default Modal;

