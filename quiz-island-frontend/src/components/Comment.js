import React from "react";
import plusIcon from "../images/icon-plus.svg";
import minusIcon from "../images/icon-minus.svg";
import replyIcon from "../images/icon-reply.svg";
import deleteIcon from "../images/icon-delete.svg";
import editIcon from "../images/icon-edit.svg";

function Comment(props) {
    const {comment, currentUser, createReply, updateComment, deleteComment} = props
    const [deleteConfirm, setDeleteConfirm] = React.useState(false)

    function showDeleteConfirm() {
        setDeleteConfirm(prevDeleteComfirm => !prevDeleteComfirm)
    }

    return (
        <div className='Comment'>
            <div className='Comment__count'>
                <img src={plusIcon} alt="plus" role='button'/>
                <span>{comment.score}</span>
                <img src={minusIcon} alt="minus" role='button'/>
            </div>
            <div className='Comment__person-info'>
                <div className='person'>
                    <img src={comment.image} alt="person"/>
                    <span className='person__name'>{comment.first_name} {comment.last_name}</span>
                    {currentUser.email === comment.email && <span className='person__user'>You</span>}
                    <span className='person__date'>{comment['createdAt']}</span>
                </div>
                <div className='features'>
                    {currentUser.email !== comment.email &&
                        <div onClick={(event) => {
                            createReply(event, comment.user_id, comment.first_name, comment.last_name)
                        }}>
                            <img src={replyIcon} alt="reply" role='button'/>
                            <span>Reply</span>
                        </div>}
                    {currentUser.email === comment.email &&
                        <div onClick={showDeleteConfirm}>
                            <img src={deleteIcon} alt="delete" role='button'/>
                            <span className='delete'>Delete</span>
                        </div>}
                    {currentUser.email === comment.email &&
                        <div onClick={(event) => updateComment(event, comment)}>
                            <img src={editIcon} alt="edit" role='button'/>
                            <span>Edit</span>
                        </div>}
                </div>
            </div>
            <div className='Comment__text'>
                <p>
                    {comment.reply_first_name &&
                        <span className='replied-person'>@{comment.reply_first_name} {comment.reply_last_name} </span>}
                    {comment.content}
                </p>
            </div>
            {deleteConfirm && <div className='delete-confirm-section'>
                <div className='delete-confirm'>
                    <h2>Are you sure you want to delete comment</h2>
                    <button onClick={showDeleteConfirm}
                    >Cancel
                    </button>
                    <button onClick={(event) => deleteComment(event, comment)}
                    >Delete
                    </button>
                </div>
            </div>}
        </div>
    )
}

export default Comment