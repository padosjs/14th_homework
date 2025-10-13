import Button from "."

export default {
    component: Button
}

export const Primary = {
    render: () => {
        return <Button className="blue-button" text="버튼 텍스트는 여기에 표시됨" />

    }
}