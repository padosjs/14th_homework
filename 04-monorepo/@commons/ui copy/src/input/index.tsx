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
    /** <input>의 타입을 지정합니다. 기본값은 'text'입니다. */
    type?: string;
}

const InputField = (props: InputFieldProps) => {
    // hasError prop의 값에 따라 'error' 클래스를 포함할지 결정하는 변수
    const errorClass = props.hasError ? styles.error : '';

    const field = props.isTextArea ? (
        <textarea
            className={`${styles['input-text']} ${props.disabled ? styles.disabled : ''} ${errorClass}`}
            placeholder={props.placeholderText}
            rows={props.rows || 5}
            value={props.value}
            onChange={props.onChange}
            disabled={props.disabled}
        />
    ) : (
        <input
            className={`${styles['input-text']} ${props.disabled ? styles.disabled : ''} ${errorClass}`}
            // props.type이 있을 경우 해당 값을, 그렇지 않을 경우 'text'를 사용합니다.
            type={props.type || "text"}
            placeholder={props.placeholderText}
            value={props.value}
            onChange={props.onChange}
            disabled={props.disabled}
        />
    );

    return (
        <div className={styles['input-container']}>
            <div className={styles['input-title-container']}>
                <h4 className={styles['input-title']}>{props.title}</h4>
                {props.isRequired && <h4 className={styles['input-title-asterisk']}>*</h4>}
            </div>
            {field}
            {props.hasError && <div className={styles['input-error-message']}>{props.errorMessage}</div>}
        </div>
    );
};

export default InputField;