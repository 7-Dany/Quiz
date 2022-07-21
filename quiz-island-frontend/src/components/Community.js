import React from 'react'
import X from '../images/icon-xmark.svg'
import Post from "./Post";
import axios from "axios";

function Community(props) {
    const {currentUser, token, newPost} = props
    const [popUp, setPopUp] = React.useState(false)
    const [createNewPost, setCreateNewPost] = React.useState(false)
    const [newPostContent, setNewPostContent] = React.useState('')
    const [order, setOrder] = React.useState('')
    const [posts, setPosts] = React.useState([])
    const [newPostData, setNewPostData] = React.useState({
        postText: '',
        postId: ''
    })

    function showPopUp(event) {
        setPopUp(!popUp)
    }

    function handleOnChange(event) {
        const {name, value} = event.target
        setNewPostData(prevOldText => {
            return {
                ...prevOldText,
                [name]: value
            }
        })
    }

    function handleEditOrDelete(event, order, postId, postContent) {
        if(order === 'edit'){
            setPopUp(!popUp)
        }
        setNewPostData({
            postText: postContent,
            postId: postId
        })
        setOrder(order)
    }

    function handlePostSubmit(event, postText) {
        if (order === 'edit') {
            setNewPostContent(postText)
            setOrder('doneEdit')
            return
        }
        setNewPostContent(postText)
        setCreateNewPost(true)
    }

    React.useEffect(() => {
        if (token) {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            axios.get('/api/dashboard/post', config)
                .then(response => {
                    setPosts(oldPostsData => response.data.data)
                })
                .catch(err => {
                    console.log(err.response)
                })
        }
    }, [currentUser, createNewPost, order])

    React.useEffect(() => {
        if (createNewPost) {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            axios.post(`/api/post/${currentUser.id}`, {content: newPostContent}, config)
                .then(response => {
                    console.log(response.data)
                    newPost(response.data.message)
                    setNewPostContent('')
                    setCreateNewPost(false)
                })
                .catch(err => {
                    console.log(err.response)
                })

        }
    }, [createNewPost])

    React.useEffect(() => {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        if (order === 'doneEdit') {
            axios.patch(`/api/post/${newPostData.postId}`, {content: newPostContent}, config)
                .then(response => {
                    setOrder('')
                    setNewPostData({
                        postText: '',
                        postId: ''
                    })
                })
                .catch(err => {
                    console.log(err.response)
                })
        } else if (order === 'delete') {
            axios.delete(`/api/post/${newPostData.postId}`, config)
                .then(response => {
                    setOrder('')
                    setNewPostData({
                        postText: '',
                        postId: ''
                    })
                })
                .catch(err => {
                    console.log(err.response)
                })
        }
    }, [order])

    const allPosts = posts.map(post => {
        return (
            <Post
                key={post.id}
                post={post}
                token={token}
                currentUser={currentUser}
                handleEditOrDelete={handleEditOrDelete}
            />
        )
    })

    return (
        <section className='Post-Page'>
            <div className='Post-Header'>
                {!popUp && <div className='create'>
                    <img src={currentUser.image} alt="person" className='create__user-image'/>
                    <button className='create__button' onClick={showPopUp}>Do you want to share any news with us?
                    </button>
                </div>}
                {popUp && <div className='pop-up'>
                    <div className='pop-up__header'>
                        <p>Create Post</p>
                        <img src={X} alt="x mark" role='button' onClick={showPopUp}/>
                    </div>
                    <div className='pop-up__person-info'>
                        <img src={currentUser.image} alt="person"/>
                        <span>{currentUser.first_name} {currentUser.last_name}</span>
                    </div>
                    <textarea name="postText" id="postText" cols="70" rows="10"
                              placeholder='Do you want to share any news with us?'
                              className='pop-up__textarea'
                              value={newPostData.postText}
                              onChange={handleOnChange}
                    />
                    <button className='pop-up__post' onClick={(event) => {
                        showPopUp(event)
                        handlePostSubmit(event, newPostData.postText)
                    }}>Post
                    </button>
                </div>}
            </div>
            <div className='User-comment'>
                {allPosts}
            </div>
        </section>
    )
}

export default Community