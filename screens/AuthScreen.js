import {React, useState} from 'react';
import { StyleSheet } from 'react-native';

import SignUp from '../Components/Auth/SignUp';
import Login from '../Components/Auth/Login';

function AuthScreen(props) {
    const [view, setView] = useState("LOGIN_PAGE");

    function handleSwitch() {
        setView(view == "LOGIN_PAGE" ? "SIGNUP_PAGE" : "LOGIN_PAGE");
    }

    return (
        <div style={styles.main}>
            {view == "LOGIN_PAGE" ? <Login /> : <SignUp/>}
            <p style={styles.p}>{view == "SIGNUP_PAGE" ? "Already have an account?" : "Don't have an account?"} <a style={styles.a} onClick={handleSwitch}>{view == "SIGNUP_PAGE" ? "LogIn" : "Sign Up"}</a></p>
        </div>
    );
}

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        zIndex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#011123',
        alignItems: 'center',
        justifyContent: 'center',
    },
    p: {
        color: "white",
    },
    a: {
        color: "#0077cc"
    }
})

export default AuthScreen;