import React from 'react'
import X from '../images/icon-xmark.svg'
import Post from "./Post";

function Community(props) {
    const [popUp, setPopUp] = React.useState(false)
    const [posts, setPosts] = React.useState(props.postsData['posts'] || {})
    const {currentUser} = props.postsData

    function showPopUp(event) {
        setPopUp(!popUp)
    }

    const allPosts = posts.map(post => {
        return (
            <Post
                key={post.id}
                post={post}
                currentUser={currentUser}
            />
        )
    })

    return (
        <section>
            <div className='Post-Header' style={popUp ? {height: '100vh'} : {height: 'unset'}}>
                {!popUp && <div className='create'>
                    <img src={currentUser.image['png']} alt="person" className='create__user-image'/>
                    <button className='create__button' onClick={showPopUp}>Do you want to share any news with us?
                    </button>
                </div>}
                {popUp && <div className='pop-up'>
                    <div className='pop-up__header'>
                        <p>Create Post</p>
                        <img src={X} alt="x mark" role='button' onClick={showPopUp}/>
                    </div>
                    <div className='pop-up__person-info'>
                        <img src={currentUser.image['png']} alt="person"/>
                        <span>{currentUser.username}</span>
                    </div>
                    <textarea name="postText" id="postText" cols="50" rows="10"
                              placeholder='Do you want to share any news with us?'
                              className='pop-up__textarea'
                    />
                    <button className='pop-up__post' onClick={showPopUp}>Post</button>
                </div>}
            </div>
            <div className='User-comment'>
                {allPosts}
            </div>
        </section>
    )
}

export default Community