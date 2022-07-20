import React from "react";
import plusIcon from '../images/icon-plus.svg'
import minusIcon from '../images/icon-minus.svg'
import replyIcon from '../images/icon-reply.svg'
import editIcon from '../images/icon-edit.svg'
import deleteIcon from '../images/icon-delete.svg'
import Comment from "./Comment";
import axios from "axios";

function Post(props) {
    const {post, currentUser, token, handleEditOrDelete} = props
    const [makeComment, setMakeComment] = React.useState(false)
    const [updateCommentState, setUpdateCommentState] = React.useState(null)
    const [deletePost, setDeletePost] = React.useState(false)
    const [order, setOrder] = React.useState('')
    const [allPostComments, setAllPostComments] = React.useState([])
    const [newCommentData, setNewCommentData] = React.useState({})
    const [commentToGetUpdated, setCommentToGetUpdated] = React.useState({})
    const [comment, setComment] = React.useState({
        userComment: "",
        postId: post.id,
        userToReplyId: '',
        userToReplyName: '',
        commentToDelete: ''
    })

    function handleOnChange(event) {
        const {name, value} = event.target
        setComment(prevComment => {
            return {...prevComment, [name]: value}
        })
    }

    function handleDeletingPost(event) {
        setDeletePost(!deletePost)
    }

    function activeComment(event) {
        setMakeComment(prevMakeComment => !prevMakeComment)
    }

    function addNewCommentToPost(event, comment) {
        if (updateCommentState === false) {
            setOrder('update')
            setCommentToGetUpdated(prevState => {
                return {
                    ...prevState,
                    content: comment.userComment
                }
            })
            return
        }
        setNewCommentData({
            content: comment.userToReplyId ?
                comment.userComment.replace(`${comment.userToReplyName} `, '') :
                comment.userComment,
            replyTo: comment.userToReplyId,
            postId: comment.postId,
            userId: currentUser.id
        })
        setOrder('create')
        setComment({
            userComment: "",
            postId: post.id,
            userToReplyId: '',
            userToReplyName: '',
            commentToDelete: ''
        })

    }

    function createReply(event, userId, replyFirstName, replyLastName) {
        setComment(prevComment => {
            return {
                ...prevComment,
                userToReplyId: userId,
                userToReplyName: `@${replyFirstName} ${replyLastName}`,
                userComment: `@${replyFirstName} ${replyLastName}`
            }
        })
    }

    function updateComment(event, commentReceived) {
        setComment(prevComment => {
            return {
                ...prevComment,
                userComment: commentReceived.content
            }
        })
        setCommentToGetUpdated({
            id: commentReceived.comment_id,
        })
        setUpdateCommentState(false)
    }

    function deleteComment(event, comment) {
        setComment(prevComment => {
            return {
                ...prevComment,
                commentToDelete: comment.id
            }
        })
        setOrder('delete')
    }

    React.useEffect(() => {
        const header = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        axios.get(`/api/dashboard/post/${post.id}`, header)
            .then(response => {
                setAllPostComments(response.data.data.comments)
            })
            .catch(err => {
            })
        if (order === 'create') {
            axios.post(`/api/comment/${currentUser.id}`, {content: newCommentData.content}, header)
                .then(response => {
                    return response.data.data
                })
                .then(data => {
                    return axios.post(`api/post-comment/${newCommentData.postId}`, {
                        comment_id: data.id,
                        replying_to: newCommentData.replyTo ? newCommentData.replyTo : null
                    }, header)
                })
                .then(response => {
                    setOrder('')
                })
                .catch(err => {
                })
        } else if (order === 'update') {
            axios.patch(`/api/comment/${commentToGetUpdated.id}`, {content: commentToGetUpdated.content}, header)
                .then(response => {
                    setUpdateCommentState(null)
                    setOrder('')
                    setComment({
                        userComment: "",
                        postId: post.id,
                        userToReplyId: '',
                        userToReplyName: '',
                        commentToDelete: ''
                    })
                })
                .catch(err => {
                })
        } else if (order === 'delete') {
            axios.delete(`/api/post-comment/${comment.commentToDelete}`, header)
                .then(response => {
                    const commentId = response.data.data.comment_id
                    return axios.delete(`/api/comment/${commentId}`, header)
                })
                .then(response => {
                    setOrder('')
                })
                .catch(err => {
                })
        }
    }, [makeComment, order])

    const postComments = allPostComments.map(comment => {
        return <Comment
            key={comment.id}
            comment={comment}
            createReply={createReply}
            currentUser={currentUser}
            updateComment={updateComment}
            deleteComment={deleteComment}
        />
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
                        <img src={post.image} alt="person"/>
                        <span className='person__name'>{post.first_name} {post.last_name}</span>
                        {currentUser.email === post.email ? <span className='person__user'>You</span> : ''}
                        <span className='person__date'>{post['createdAt']}</span>
                    </div>
                    <div className='features'>
                        {currentUser.email !== post.email &&
                            <div
                                onClick={(event) => {
                                    activeComment(event)
                                }}
                            >
                                <img src={replyIcon} alt="reply" role='button'/>
                                <span>Comment</span>
                            </div>}
                        {currentUser.email === post.email &&
                            <div onClick={handleDeletingPost}
                            >
                                <img src={deleteIcon} alt="delete" role='button'/>
                                <span className='delete'>Delete</span>
                            </div>}
                        {currentUser.email === post.email &&
                            <div
                                onClick={(event) => {
                                    handleEditOrDelete(event, 'edit', post.id, post.content)
                                }}
                            >
                                <img src={editIcon} alt="edit" role='button'/>
                                <span>Edit</span>
                            </div>}
                    </div>
                </div>
                <div className='Post__text'>
                    <p>{post.content}</p>
                </div>
            </div>
            {makeComment && <div className='Post__comments'>
                {postComments}
            </div>}
            {makeComment && <div className='Create-comment'>
                <img src={currentUser.image} alt="person" className='Create-comment__image'/>
                <textarea cols="70" rows="6"
                          name='userComment'
                          className='Create-comment__textarea'
                          value={comment.userComment}
                          onChange={(event) => handleOnChange(event, post.id)}
                          placeholder='Add Comment'/>
                <button
                    className='Create-comment__send'
                    onClick={(event) => {
                        addNewCommentToPost(event, comment)
                    }}
                >Send
                </button>
            </div>}
            {deletePost &&
                <div className='delete-confirm-section'>
                    <div className='delete-confirm'>
                        <h2>Are you sure you want to delete post</h2>
                        <button onClick={handleDeletingPost}>
                            Cancel
                        </button>
                        <button onClick={(event) => handleEditOrDelete(event, 'delete', post.id)}>
                            Delete
                        </button>
                    </div>
                </div>}
        </section>
    )
}

export default Post