"use client";

import Button from '@/components/button/button';
import styles from './styles.module.css';
import useBoardsDetail from './hook';
import { HandThumbDownIcon, HandThumbUpIcon, LinkIcon, ListBulletIcon, MapPinIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const extractYouTubeId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

export default function BoardsDetail() {
    const {
        onClickList,
        onClickEdit,
        data
    } = useBoardsDetail()

    const youtubeId = data?.fetchBoard?.youtubeUrl
        ? extractYouTubeId(data.fetchBoard.youtubeUrl)
        : null;

    return (
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
                    <Button className="simple-button-small" icon={LinkIcon} />
                    <TooltipProvider>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger>
                                <Button className="simple-button-small" icon={MapPinIcon} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>
                                    {data?.fetchBoard?.boardAddress?.address ? data.fetchBoard.boardAddress.address : '주소 없음'}
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
            <div className={styles['detail-container']}>
                {data?.fetchBoard?.images && data.fetchBoard.images.length > 0 && (
                    <div className={styles['image-container']}>
                        {data.fetchBoard.images.map((url, index) => (
                            <img
                                key={index}
                                src={`https://storage.googleapis.com/${url}`}
                                alt={`첨부 이미지 ${index + 1}`}
                                className={styles['uploaded-image']}
                            />
                        ))}
                    </div>
                )}
                {data?.fetchBoard?.contents}
                {youtubeId && (
                    <div className={styles['youtube-container']}>
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${youtubeId}`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
            </div>
            <div className={styles['boards-detail-action']}>
                <div className={styles['boards-deatil-button-group2']}>
                    <Button className="simple-vertical-button" icon={HandThumbDownIcon} text="24" />
                    <Button className="simple-vertical-red-button" icon={HandThumbUpIcon} text="12" />
                </div>
                <div className={styles['boards-deatil-button-group2']}>
                    <Button className="white-button" icon={ListBulletIcon} text="목록으로" onClick={onClickList} />
                    <Button className="white-button" icon={PencilIcon} text="수정하기" onClick={onClickEdit} />
                </div>
            </div>
        </div >
    );
}