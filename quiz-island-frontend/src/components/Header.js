import React from "react";
import {Link} from "react-router-dom";

function Header(props) {
    const {handleLogOut, logOut, handleLogin, setErrorMessage} = props
    const [showLinks, setShowLinks] = React.useState(true)
    const styles = {
        position: showLinks ? 'absolute' : 'fixed'
    }

    function handleOnClick(event, errMessage) {
        setShowLinks(prevShowLinks => !prevShowLinks)
        if (!logOut && errMessage) {
            setErrorMessage('Please Login First')
        }
    }

    return (
        <header>
            <div className="header-logo">
                <Link to='/' className='header-logo__title'>Quiz Island</Link>
            </div>
            <div
                className={showLinks ? "menu-btn" : "menu-btn open"}
                style={styles}
                role="button"
                onClick={(event) => handleOnClick(event)}>
                <span className={showLinks ? "menu-btn__burger" : "menu-btn__burger open"}></span>
            </div>
            <nav className={showLinks ? "nav" : "nav open"}>
                <div className={showLinks ? "menu-nav" : "menu-nav open"}>
                    <div className={showLinks ? "menu-nav__item" : "menu-nav__item open"}>
                        <Link
                            to='/'
                            className={showLinks ? "menu-nav__link" : "menu-nav__link open"}
                            onClick={handleOnClick}
                        >Home</Link>
                    </div>
                    <div className={showLinks ? "menu-nav__item" : "menu-nav__item open"}>
                        <Link
                            to={logOut ? '/community' : '/login'}
                            className={showLinks ? "menu-nav__link" : "menu-nav__link open"}
                            onClick={(event) => handleOnClick(event, true)}
                        >Community</Link>
                    </div>
                    <div className={showLinks ? "menu-nav__item" : "menu-nav__item open"}>
                        <Link
                            to={logOut ? '/quiz' : '/login'}
                            className={showLinks ? "menu-nav__link" : "menu-nav__link open"}
                            onClick={(event) => handleOnClick(event, true)}
                        >Take A Quiz</Link>
                    </div>
                    {!logOut && <div className={showLinks ? "menu-nav__item" : "menu-nav__item open"}>
                        <Link
                            to='/login'
                            className={showLinks ? "menu-nav__link" : "menu-nav__link open"}
                            onClick={(event) => {
                                handleLogin(event, false)
                                handleOnClick(event)
                            }}
                        >Log in</Link>
                    </div>}
                    {!logOut && <div className={showLinks ? "menu-nav__item" : "menu-nav__item open"}>
                        <Link
                            to='/login'
                            className={showLinks ? "menu-nav__link" : "menu-nav__link open"}
                            onClick={(event) => {
                                handleLogin(event, true)
                                handleOnClick(event)
                            }}
                        >Sign up</Link>
                    </div>}
                    {logOut && <div className={showLinks ? "menu-nav__item" : "menu-nav__item open"}>
                        <Link
                            to='/login'
                            className={showLinks ? "menu-nav__link" : "menu-nav__link open"}
                            onClick={(event) => {
                                handleLogOut(event)
                                handleOnClick(event)
                            }}
                        >Log out</Link>
                    </div>}
                </div>
            </nav>
        </header>
    )
}

export default Header