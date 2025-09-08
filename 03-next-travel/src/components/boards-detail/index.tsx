"use client";

import Button from '@/components/button/button';
import styles from './styles.module.css';
import useBoardsDetail from './hook';

export default function BoardsDetail() {
    const {
        onClickList,
        onClickEdit,
        data
    } = useBoardsDetail()

    return (
        <div className={styles['main-content']}>
            <div className={styles['page-container']}>
                <h1 className={styles['page-title']}>{data?.fetchBoard?.title}</h1>
                <div className={styles['boards-detail-info']}>
                    <div className={styles['boards-detail-profile-date']}>
                        <div className={styles['boards-detail-profile']}>
                            <img src="/assets/images/profileimg.png" className={styles['profile-image-small']} />{data?.fetchBoard?.writer}
                        </div>
                        <div>{new Date(data?.fetchBoard?.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div className={styles['divider']}></div>
                    <div className={styles['boards-deatil-button-group1']}>
                        <Button className="simple-button" icon="/assets/icons/outline/link.svg" />
                        <Button className="simple-button" icon="/assets/icons/outline/location.svg" />
                    </div>
                </div>
                <div className={styles['detail-container']}>
                    {data?.fetchBoard?.contents}
                </div>
                <div className={styles['boards-detail-action']}>
                    <div className={styles['boards-deatil-button-group2']}>
                        <Button className="simple-vertical-button" icon="/assets/icons/outline/bad.svg" text="24" />
                        <Button className="simple-vertical-red-button" icon="/assets/icons/outline/good.svg" text="12" />
                    </div>
                    <div className={styles['boards-deatil-button-group2']}>
                        <Button className="white-button" icon="/assets/icons/outline/menu.svg" text="목록으로" onClick={onClickList} />
                        <Button className="white-button" icon="/assets/icons/outline/edit.svg" text="수정하기" onClick={onClickEdit} />
                    </div>
                </div>
            </div>
        </div>
    );
}