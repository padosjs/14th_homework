"use client";

import Button from '@/components/button';
import styles from './styles.module.css';
import { gql, useQuery } from "@apollo/client"
import { useParams } from "next/navigation"

const FETCH_BOARD = gql`
    query fetchBoard($boardId: ID!){
        fetchBoard(boardId: $boardId){
            writer
            title
            contents
    }
}
`
export default function BoardsDetail() {

    const addressparams = useParams()

    const { data } = useQuery(FETCH_BOARD, {
        variables: {
            boardId: addressparams.boardId,
        }
    });

    return (
        <div className={styles['main-content']}>
            <div className={styles['page-container']}>
                <h1 className={styles['page-title']}>{data?.fetchBoard?.title}</h1>
                <div className={styles['boards-detail-info']}>
                    <div className={styles['boards-detail-profile-date']}>
                        <div className={styles['boards-detail-profile']}>
                            <img src="/assets/images/profileimg.png" className={styles['profile-image-small']} />{data?.fetchBoard?.writer}
                        </div>
                        <div>2024.11.11</div>
                    </div>
                    <div className={styles['divider']}></div>
                    <div className={styles['boards-deatil-button-group1']}>
                        <Button className="simple-button" icon="/assets/icons/outline/link.svg" />
                        <Button className="simple-button" icon="/assets/icons/outline/location.svg" />
                    </div>
                </div>
                <div className={styles['detail-container']}>
                    <img src="/assets/images/detailbeach.jpg" className={styles['detail-image1']} />
                    {data?.fetchBoard?.contents}
                    <img src="/assets/images/detailvideoimage.png" className={styles['detail-image2']} />
                </div>
                <div className={styles['boards-detail-action']}>
                    <div className={styles['boards-deatil-button-group2']}>
                        <Button className="simple-vertical-button" icon="/assets/icons/outline/bad.svg" text="24" />
                        <Button className="simple-vertical-button red-button" icon="/assets/icons/outline/good.svg" text="12" />
                    </div>
                    <div className={styles['boards-deatil-button-group2']}>
                        <Button className="white-button" icon="/assets/icons/outline/menu.svg" text="목록으로" />
                        <Button className="white-button" icon="/assets/icons/outline/edit.svg" text="수정하기" />
                    </div>
                </div>
            </div>
        </div>
    );
}