export interface IBoard {
    _id: string;
    writer: string;
    title: string;
    createdAt: string;
}

export interface IQuery {
    fetchBoards: IBoard[];
}