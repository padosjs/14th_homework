import Button from "."

export default {
    component: Button
}

export const Primary = {
    render: () => {
        return <Button className="white-button" text="회원가입" />

    }
}