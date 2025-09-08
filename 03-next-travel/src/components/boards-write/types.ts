export interface Board {
    _id: string;
    writer: string;
    title: string;
    contents: string;
    createdAt: string;
}

export interface IBoardsWriteProps {
    isEdit: boolean;
}