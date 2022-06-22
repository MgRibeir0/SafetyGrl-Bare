import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'
import { Alert } from 'react-native';

GoogleSignin.configure({
    webClientId: '701015473036-4e4g5em93lca0jdd79le2ppave4c8s30.apps.googleusercontent.com'
})

/**
 * Uses firebase auth system to authenticate user with Google
 * 
 * 
 * @returns User object if successful
 * @returns null if unsuccessful
*/
export async function handleLoginGoogleAsync() {

    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userSignIn = auth().signInWithCredential(googleCredential);

    const user = userSignIn.then((user) => {
        alert('Teste')
        return user;
    })
        .catch((err) => {
            console.log(err);
        })

    if (user != null) return await user;
    return null;
}

/**
 * 
 * @param {string}   email
 * @param {string}   password
 * 
 * 
 * @returns {boolean} 0 if unsuccessful
 * @returns {boolean} 1 if successful
 */
export function signUpEmailPassword(email, password) {

    if (!email) {
        Alert.alert('Erro', 'Por favor, informe um e-mail.');
        return false
    }
    if (!password && password.trim() && password.length > 6) {
        Alert.alert('Erro', 'Por favor, informe uma senha que contenha .');
        return false
    }
    if (!isValidEmail(email)) {
        return false
    }

    createUser(email, password);
    return true;
}

async function createUser(email, password) {
    try {
        let response = await auth().createUserWithEmailAndPassword(email, password);
        if (response && response.user) Alert.alert('✅ Usuário criado com sucesso', 'Redirecionando para a página inicial...');

    }
    catch (error) {
        console.log(error.message);
    }

}

/**
 * 
 * @param {String} email 
 * @returns {boolean} true or false
 */
const isValidEmail = email => {
    var rgx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return rgx.test(String(email).toLowerCase());
};

/**
 * 
 * 8 Digits, no spaces, 1 uppercase, 1 lowercase, 1 number
 * 
 * @param {String} password
 * @returns {boolean} true or false
 */
const isValidPassword = password => {
    let rgx = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,16}$/;
    return rgx.text(String(password));
}