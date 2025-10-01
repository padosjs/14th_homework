import InputField from "."

export default {
    component: InputField
}

export const Primary = {
    render: () => {
        return <InputField
            placeholderText="이메일을 입력해주세요."
        />

    }
}