import styles from './styles.module.css';

interface InputFieldProps {
    
    placeholderText: string;
    /** 'true'인 경우 <textarea>를, 그렇지 않은 경우 <input>을 렌더링합니다. */
    isTextArea?: boolean;
    /** isTextArea가 'true'일 때 렌더링될 행의 수입니다. 기본값은 5입니다. */
    rows?: number;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    title?: string;
    /** 'true'인 경우 제목 옆에 필수 항목임을 나타내는 별표(*)를 표시합니다. */
    isRequired?: boolean;
    /** 'true'인 경우 오류 메시지를 표시합니다. */
    hasError?: boolean;
    errorMessage?: string;
    /** 'true'인 경우 입력 필드를 비활성화합니다. */
    disabled?: boolean;
}

const InputField = (props: InputFieldProps) => {
    // isTextArea props에 따라 <textarea> 또는 <input> 컴포넌트를 선택적으로 렌더링합니다.
    const field = props.isTextArea ? (
        <textarea
            className={`${styles['input-text']} ${props.disabled ? styles.disabled : ''}`}
            placeholder={props.placeholderText}
            rows={props.rows || 5} // props가 제공되지 않으면 기본값으로 5를 사용합니다.
            value={props.value}
            onChange={props.onChange}
            disabled={props.disabled}
        />
    ) : (
        <input
            className={`${styles['input-text']} ${props.disabled ? styles.disabled : ''}`}
            type="text"
            placeholder={props.placeholderText}
            value={props.value}
            onChange={props.onChange}
            disabled={props.disabled}
        />
    );

    return (
        <div className={styles['input-container']}>
            <div className={styles['input-title-container']}>
                {/* 입력 필드의 제목을 렌더링합니다. */}
                <h4 className={styles['input-title']}>{props.title}</h4>
                {/* isRequired가 'true'일 때만 필수 항목 별표(*)를 렌더링합니다. */}
                {props.isRequired && <h4 className={styles['input-title-asterisk']}>*</h4>}
            </div>
            {/* 위에서 정의한 입력 필드(<input> 또는 <textarea>)를 렌더링합니다. */}
            {field}
            {/* hasError가 'true'일 때만 오류 메시지를 렌더링합니다. */}
            {props.hasError && <div className={styles['input-error-message']}>{props.errorMessage}</div>}
        </div>
    );
};

export default InputField;