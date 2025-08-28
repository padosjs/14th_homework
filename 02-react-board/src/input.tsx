interface InputFieldProps {
    placeholderText: string;
    isTextArea?: boolean;
    rows?: number;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    title?: string;
    isRequired?: boolean;
    hasError?: boolean;
    errorMessage?: string;
}

const InputField = (props: InputFieldProps) => {
    const field = props.isTextArea ? (
        <textarea
            className="input-text"
            placeholder={props.placeholderText}
            rows={props.rows || 5}
            value={props.value}
            onChange={props.onChange}
        />
    ) : (
        <input
            className="input-text"
            type="text"
            placeholder={props.placeholderText}
            value={props.value}
            onChange={props.onChange}
        />
    );

    return (
        <div className="input-container">
            <div className="input-title-container">
                <h4 className="input-title">{props.title}</h4>
                {props.isRequired && <h4 className="input-title-asterisk">*</h4>}
            </div>
            {field}
            {props.hasError && <div className="input-error-message">{props.errorMessage}</div>}
        </div>
    );
};

export default InputField;