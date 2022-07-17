import React from "react";
import lock from '../images/icon-lock.svg'
import userIcon from '../images/icon-user.svg'
import email from '../images/icon-email.svg'

function Login(props) {
    const {
        handleUserChanges,
        user,
        onSubmit,
        checkLoginOrSignUp,
        errorMessage,
    } = props

    return (
        <div className='Login-container'>
            <form className='Login' onSubmit={onSubmit}>
                <h3 className='Login__title'>
                    {checkLoginOrSignUp ? 'SIGN UP' : 'LOGIN'}
                </h3>
                <p className='Login__error'>{errorMessage ? errorMessage : ''}</p>
                {checkLoginOrSignUp &&
                    <label htmlFor="firstName" className='Login__label'>
                        <img src={userIcon} alt="" aria-hidden={true}/>
                        <input
                            type="text"
                            id='firstName'
                            className='Login__input'
                            placeholder='First Name'
                            name='firstName'
                            value={user.firstName}
                            onChange={handleUserChanges}
                            required={true}
                        />
                    </label>
                }
                {checkLoginOrSignUp &&
                    <label htmlFor="lastName" className='Login__label'>
                        <img src={userIcon} alt="" aria-hidden={true}/>
                        <input
                            type="text"
                            placeholder='Last Name'
                            className='Login__input'
                            id='lastName'
                            name='lastName'
                            value={user.lastName}
                            onChange={handleUserChanges}
                            required={true}
                        />
                    </label>
                }
                <label htmlFor="email" className='Login__label'>
                    <img src={email} alt="" aria-hidden={true}/>
                    <input
                        type="email"
                        placeholder='Email'
                        className='Login__input'
                        id='email'
                        name='email'
                        value={user.email}
                        onChange={handleUserChanges}
                        required={true}
                    />
                </label>
                <label htmlFor="password" className='Login__label'>
                    <img src={lock} alt="" aria-hidden={true}/>
                    <input
                        type='password'
                        placeholder='Password'
                        className='Login__input'
                        name='password'
                        value={user.password}
                        onChange={handleUserChanges}
                        required={true}
                    />
                </label>
                {checkLoginOrSignUp &&
                    <label htmlFor="confirmPassword" className='Login__label'>
                        <img src={lock} alt="" aria-hidden={true}/>
                        <input
                            type='password'
                            placeholder='Confirm Password'
                            className='Login__input'
                            id='confirmPassword'
                            name='confirmPassword'
                            value={user.confirmPassword}
                            onChange={handleUserChanges}
                            required={true}
                        />
                    </label>
                }
                <button type='submit' className='Login__button'>
                    {checkLoginOrSignUp ? 'Sign up' : 'Login'}
                </button>
            </form>
        </div>
    )
}

export default Login