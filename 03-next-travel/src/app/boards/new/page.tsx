"use client";

import { withAuth } from "@/commons/hocs/withAuth";
import BoardsWrite from "@/components/boards-write";

function BoardNewPage() {
    return (
        <BoardsWrite isEdit={false} />
    );
}

export default withAuth(BoardNewPage)