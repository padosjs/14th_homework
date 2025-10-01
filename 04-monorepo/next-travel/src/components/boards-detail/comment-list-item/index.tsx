import styles from './styles.module.css';
import { Button } from '@commons/ui';
import { PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';

interface CommentItemProps {
    comment: {
        _id: string;
        writer: string;
        rating: number;
        contents: string;
        createdAt: string;
    }
    onEdit: () => void;
}

export default function CommentItem({ comment, onEdit }: CommentItemProps) {
    return (
        <li key={comment._id} className={styles.commentItem}>
            <div className={styles.commentWriter}>
                <img src="/assets/images/profileimg.png" className={styles.profileImage} />
                {comment.writer}
                <Rating value={comment.rating} readOnly>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <RatingButton key={index} size={12} className="text-yellow-500" />
                    ))}
                </Rating>
                <div className={styles.buttonGroup}>
                    <Button className="simple-button-small" icon={PencilIcon} onClick={onEdit} />
                    <Button className="simple-button-small" icon={XMarkIcon} />
                </div>
            </div>
            <span className={styles.commentContents}>{comment.contents}</span>
            <span className={styles.commentDate}> {new Date(comment.createdAt).toLocaleDateString()}</span>
        </li>
    );
}