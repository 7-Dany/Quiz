import React from "react";
import {useNavigate} from "react-router-dom";

function Home(props) {
    const {logOut} = props
    const navigate = useNavigate()
    return (
        <section className='home'>
            <div className='home__title'>
                <h1>Quiz island</h1>
                <p>Enjoy your time in quiz island with powerful community in your side</p>
                <button
                    onClick={(event) => logOut ? navigate('/quiz') : navigate('/login')}
                >Get Started
                </button>
            </div>
        </section>
    )
}

export default Home