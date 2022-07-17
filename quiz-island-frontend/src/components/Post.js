import React from "react";
import plusIcon from '../images/icon-plus.svg'
import minusIcon from '../images/icon-minus.svg'
import replyIcon from '../images/icon-reply.svg'
import editIcon from '../images/icon-edit.svg'
import deleteIcon from '../images/icon-delete.svg'
import Comment from "./Comment";

function Post(props) {
    const {post, currentUser} = props
    const [makeComment, setMakeComment] = React.useState(false)
    const [makeReply, setMakeReply] = React.useState(false)
    const [comments, setComments] = React.useState(post.comments || [])
    const [commentText, setCommentText] = React.useState({
        userComment: '',
        isEditing: false,
        commentId: -1,
        userToReply: ''
    })
    React.useEffect(() => {
        setCommentText(prevState => {
            return {
                userComment: '',
                isEditing: false,
                commentId: -1,
                userToReply: ''
            }
        })
    }, [comments])

    function activeComment(event) {
        setMakeReply(false)
        setMakeComment(prevMakeComment => !prevMakeComment)
    }

    function activeReply(event, commentUser) {
        setMakeComment(false)
        setMakeReply(prevMakeReply => !prevMakeReply)
        setCommentText(oldCommentText => {
            return {...oldCommentText, userToReply: commentUser, userComment: `@${commentUser} `}
        })
    }

    function createComment(event) {
        const date = new Date().getDate()
        const comment = {
            id: 99,
            content: commentText.userComment,
            createdAt: date,
            score: 0,
            replyingTo: post.user.username,
            user: {
                image: {
                    png: currentUser.image.png,
                    webp: currentUser.image.webp
                }, username: currentUser.username
            }
        }
        if (makeReply) {
            setComments(prevComments => {
                return [...prevComments, comment]
            })
        }
    }

    function deleteComment(event, commentId) {
        console.log(commentId)
    }

    function editComment(event, commentId) {
        setMakeComment(prevState => !prevState)
        const comment = post.comments.filter(comment => {
            return comment.id === commentId
        })[0]
        setCommentText(oldCommentText => {
            return {
                userComment: comment.content, isEditing: true, commentId: commentId
            }
        })
    }

    function handleOnChange(event) {
        const {name, value} = event.target
        setCommentText(oldCommentText => {
            return {
                ...oldCommentText, [name]: value
            }
        })
    }

    function controlComment(event) {
        setComments(oldComments => {
            return oldComments.map(comment => {
                if (comment.id === commentText.commentId) {
                    return {...comment, content: commentText.userComment}
                } else {
                    return comment
                }
            })
        })
    }

    const allComments = comments.map(comment => {
        return (
            <Comment
                key={comment.id}
                comment={comment}
                currentUser={currentUser}
                activeReply={activeReply}
                deleteComment={deleteComment}
                editComment={editComment}
                userToReplt={commentText.userToReply}
            />
        )
    })

    return (
        <section className='Post__section'>
            <div className='Post'>
                <div className='Post__count'>
                    <img src={plusIcon} alt="plus" role='button'/>
                    <span>{post['score']}</span>
                    <img src={minusIcon} alt="minus" role='button'/>
                </div>
                <div className='Post__person-info'>
                    <div className='person'>
                        <img src={post.user.image['png']} alt="person"/>
                        <span className='person__name'>{post.user.username}</span>
                        {currentUser.username === post.user.username ? <span className='person__user'>You</span> : ''}
                        <span className='person__date'>{post['createdAt']}</span>
                    </div>
                    <div className='features'>
                        {currentUser.username !== post.user.username &&
                            <div
                                onClick={activeComment}
                            >
                                <img src={replyIcon} alt="reply" role='button'/>
                                <span>Comment</span>
                            </div>}
                        {currentUser.username === post.user.username && <div>
                            <img src={deleteIcon} alt="delete" role='button'/>
                            <span className='delete'>Delete</span>
                        </div>}
                        {currentUser.username === post.user.username && <div>
                            <img src={editIcon} alt="edit" role='button'/>
                            <span>Edit</span>
                        </div>}
                    </div>
                </div>
                <div className='Post__text'>
                    <p>{post.content}</p>
                </div>
            </div>
            <div className='Post__comments'>
                {allComments}
            </div>
            {(makeComment || makeReply) && <div className='Create-comment'>
                <img src={currentUser.image['png']} alt="person" className='Create-comment__image'/>
                <textarea cols="55" rows="6"
                          name='userComment'
                          className='Create-comment__textarea'
                          value={commentText.userComment}
                          onChange={handleOnChange}
                          placeholder='Add Comment'/>
                <button
                    className='Create-comment__send'
                    onClick={commentText.isEditing ? controlComment : (event) => createComment(event, post.id)}
                >Send
                </button>
            </div>}
        </section>
    )
}

export default Post