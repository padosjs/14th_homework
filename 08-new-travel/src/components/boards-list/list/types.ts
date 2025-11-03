export interface IUseBoardsProps {
    deleteBoard: ({ variables }: { variables: { boardId: string } }) => Promise<any>;
    refetch: () => Promise<any>;
  }
  
  export interface IBoard {
    _id: string;
    title: string;
    writer: string;
    createdAt: string;
  }
  
  export interface IBoardsListProps {
    data: IBoard[];
    deleteBoard: IUseBoardsProps['deleteBoard'];
    refetch: IUseBoardsProps['refetch'];
  }