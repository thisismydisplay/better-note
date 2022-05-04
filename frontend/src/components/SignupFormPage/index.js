import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import { createNotebook } from "../../store/notebook";
function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return (
                dispatch(sessionActions.signup({ email, username, password }))
                    //   .then(dispatch(createNotebook({title: 'First Notebook', userId: sessionUser.id})))
                    .catch(async (res) => {
                        const data = await res.json();
                        if (data && data.errors) setErrors(data.errors);
                    })
            );
        }

        return setErrors([
            "Confirm Password field must be the same as the Password field",
        ]);
    };

    return (
        <div className="form-container">
            <form className='home-form' onSubmit={handleSubmit}>
                <ul className='form-errors'>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label className='form-label'>
                    Email
                    </label>
                    <input className='form-input'
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                <label className='form-label'>
                    Username
                    </label>
                    <input className='form-input'
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                <label className='form-label'>
                    Password
                    </label>
                    <input className='form-input'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                <label className='form-label'>
                    Confirm Password
                    </label>
                    <input className='form-input'
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                <button className='form-btn' type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignupFormPage;
