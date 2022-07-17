import React from "react";
import plusIcon from "../images/icon-plus.svg";
import minusIcon from "../images/icon-minus.svg";
import replyIcon from "../images/icon-reply.svg";
import deleteIcon from "../images/icon-delete.svg";
import editIcon from "../images/icon-edit.svg";

function Comment(props) {
    const {comment, currentUser, activeReply, deleteComment, editComment, userToReply} = props

    return (
        <div className='Comment'>
            <div className='Comment__count'>
                <img src={plusIcon} alt="plus" role='button'/>
                <span>{comment['score']}</span>
                <img src={minusIcon} alt="minus" role='button'/>
            </div>
            <div className='Comment__person-info'>
                <div className='person'>
                    <img src={comment.user.image['png']} alt="person"/>
                    <span className='person__name'>{comment.user.username}</span>
                    {currentUser.username === comment.user.username && <span className='person__user'>You</span>}
                    <span className='person__date'>{comment['createdAt']}</span>
                </div>
                <div className='features'>
                    {currentUser.username !== comment.user.username &&
                        <div onClick={(event) => activeReply(event, comment.user.username)}>
                            <img src={replyIcon} alt="reply" role='button'/>
                            <span>Reply</span>
                        </div>}
                    {currentUser.username === comment.user.username &&
                        <div onClick={(event) => deleteComment(event, comment.id)}>
                            <img src={deleteIcon} alt="delete" role='button'/>
                            <span className='delete'>Delete</span>
                        </div>}
                    {currentUser.username === comment.user.username &&
                        <div onClick={(event) => editComment(event, comment.id)}>
                            <img src={editIcon} alt="edit" role='button'/>
                            <span>Edit</span>
                        </div>}
                </div>
            </div>
            <div className='Comment__text'>
                <p>
                    <span className='replied-person'>{comment.userToReply}</span>
                    {comment.content}
                </p>
            </div>
        </div>
    )
}

export default Comment