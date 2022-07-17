import React from "react";
import axios from "axios";
import {Route, Routes, useNavigate} from "react-router-dom";
import Community from "./components/Community";
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import postsData from './commentsData.json'
import Header from "./components/Header";
import Home from "./components/Home";
import NoMatch from "./components/NoMatch";

function App() {
    const navigate = useNavigate()
    const [signUp, setSignUp] = React.useState(null)
    const [logOut, setLogOut] = React.useState(false)
    const [checkLoginOrSignUp, setCheckLoginOrSignUp] = React.useState(false)
    const [startNewGame, setStartNewGame] = React.useState(false)
    const [userData, setUserData] = React.useState({})
    const [errorMessage, setErrorMessage] = React.useState('')
    const [token, setToken] = React.useState('')
    const [currentUser, setCurrentUser] = React.useState({})
    const [quizData, setQuizData] = React.useState([])
    const [user, setUser] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    function handleUserChanges(event) {
        setErrorMessage('')
        const {name, value} = event.target
        setUser(oldUser => {
            return {...oldUser, [name]: value}
        })
    }

    function handleLogOut(event) {
        setToken('')
        setCurrentUser({})
        setLogOut(false)
        setCheckLoginOrSignUp(null)
        setErrorMessage('')
        setUser({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
    }

    function handleLogin(event, state) {
        setErrorMessage('')
        setCheckLoginOrSignUp(state)
        setUser({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        )
    }

    function onSubmit(event) {
        event.preventDefault()
        setErrorMessage('')
        const submitUser = !checkLoginOrSignUp ? {email: user.email, password: user.password} : user
        if (checkLoginOrSignUp) {
            if (user.password !== user.confirmPassword) {
                setErrorMessage('Password do not match please try again')
            } else {
                const newUser = {
                    first_name: user.firstName,
                    last_name: user.lastName,
                    email: user.email,
                    image: '',
                    password: user.password
                }
                setSignUp(true)
                setToken('')
                setUserData(newUser)
            }
        } else {
            setSignUp(false)
            setToken('')
            setUserData(submitUser)
        }
    }

    function setLoginUser(data) {
        setToken(data.token)
        setCurrentUser({
                id: data.id,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                image: data.image
            }
        )
    }

    React.useEffect(() => {
        axios.get('https://opentdb.com/api.php?amount=10')
            .then(response => {
                setQuizData(oldData => response.data.results)
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [startNewGame])
    React.useEffect(() => {
        if (signUp === true) {
            axios.post('/api/user', userData)
                .then(response => {
                    if (response.status === 200) {
                        setLoginUser(response.data.data)
                        setLogOut(true)
                        navigate('/')
                    }
                })
                .catch(err => {
                    console.log(err.response)
                    setErrorMessage(err.response.data.message)
                })
        } else if (signUp === false) {
            axios.post('/api/user/authenticate', userData)
                .then(response => {
                    if (response.status === 200) {
                        setLoginUser(response.data.data)
                        setLogOut(true)
                        navigate('/')
                    }
                })
                .catch(err => {
                    setErrorMessage(err.response.data.message)
                })
        }
    }, [signUp, userData])
    return (
        <div className="App">
            <Header
                logOut={logOut}
                handleLogin={handleLogin}
                handleLogOut={handleLogOut}
                setErrorMessage={setErrorMessage}
            />
            <Routes>
                <Route path='/' element={<Home logOut={logOut}/>}/>
                <Route path='/quiz' element={<Quiz
                    quizData={quizData}
                    startNewGame={startNewGame}
                    setStartNewGame={setStartNewGame}
                />}/>
                <Route path='/community' element={
                    <Community
                        postsData={postsData}
                    />}/>
                <Route path='login' element={
                    <Login
                        user={user}
                        logOut={logOut}
                        onSubmit={onSubmit}
                        handleLogin={handleLogin}
                        errorMessage={errorMessage}
                        handleLogOut={handleLogOut}
                        handleUserChanges={handleUserChanges}
                        checkLoginOrSignUp={checkLoginOrSignUp}
                    />}/>
                <Route path='*' element={<NoMatch/>}/>
            </Routes>
        </div>
    );
}

export default App;
