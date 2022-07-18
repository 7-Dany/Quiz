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
    const [errorMessage, setErrorMessage] = React.useState('')
    const [token, setToken] = React.useState('')
    const [currentUser, setCurrentUser] = React.useState({})
    const [userData, setUserData] = React.useState({})
    const [quizData, setQuizData] = React.useState([])
    const [user, setUser] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    function handleUserChanges(event) {
        // input handler , it will save all changes happen to input and save it to user
        setErrorMessage('')
        const {name, value} = event.target
        setUser(oldUser => {
            return {...oldUser, [name]: value}
        })
    }

    function handleLogOut(event) {
        // once the user logout it will reset all values for all states
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
        // if the user change between login and sign up it will reset error message, input fields
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
        // after submitting login or signup form it will save the data collected and send it to the api
        //if it log in it will send email and password only, if it sign up it will send newUser
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
        // it will take the data from the response and update the current user with the user received
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
        // to get 10 questions from trivia api and update quizData with those questions
        axios.get('https://opentdb.com/api.php?amount=10')
            .then(response => {
                setQuizData(oldData => response.data.results)
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [startNewGame])

    React.useEffect(() => {
        // to send the user to the backend, and it will create new one if it sign up, and will authenticate one if it login
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
