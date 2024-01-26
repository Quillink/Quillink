import {React, useState} from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function Login(props) {
    const [email, setMail] = useState('');
    const [pass, setPass] = useState('');
    const auth = getAuth();

    const handleSubmit = async () => {
        if (email && password)
        {
            try {
                await signInWithEmailAndPassword(auth, email, pass)
            } catch(err)
            {
                console.log(err.message);
            }
        }
    }

    return (
        <View style={styles.container}>
            <h1 style={styles.h1}>Log In</h1>
            <TextInput
                value={email}
                onChangeText={setMail}
                placeholder="Email"
                secureTextEntry={false}
                placeholderTextColor={"grey"}
                style={styles.input}
            />
            <TextInput
                value={pass}
                onChangeText={setPass}
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor={"grey"}
                style={styles.input}
            />
            <button onClick={handleSubmit}>Log In</button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "400px"
    },
    input: {
        backgroundColor: "white",
        padding: "5px",
        marginVertical: "5px",
    },
    h1: {
        color: "white"
    }
})

export default Login;