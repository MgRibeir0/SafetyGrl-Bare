import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'
import { Alert } from 'react-native';

//import { LoginManager, AccessToken } from 'react-native-fbsdk-next'; //facebook login

//#region Configurations

GoogleSignin.configure({
    webClientId: '701015473036-4e4g5em93lca0jdd79le2ppave4c8s30.apps.googleusercontent.com'
})

//#endregion

//#region Login and Logout handlers

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
 * Uses firebase auth system to authenticate user with Facebook
 * 
 * @returns User object if successful
 * @returns null if unsuccessful
 */
// export async function handleLoginFacebookAsync() {
//     // Attempt login with permissions
//     const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

//     if (result.isCancelled) {
//         throw 'User cancelled the login process';
//     }

//     // Once signed in, get the users AccesToken
//     const data = await AccessToken.getCurrentAccessToken();

//     if (!data) {
//         throw 'Something went wrong obtaining access token';
//     }

//     // Create a Firebase credential with the AccessToken
//     const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

//     // Sign-in the user with the credential
//     const userSignedIn = auth().signInWithCredential(facebookCredential);
//     const user = userSignedIn.then((user) => {
//         return user;
//     })
//         .catch((err) => {
//             console.log(err);
//         }
//         )
//     if (user != null) return await user;
//     return null;

// }

/**
 * 
 * Try to login using email and password from firebase auth services.
 * 
 * @param {string} email
 * @param {string} password 
 * 
 * @returns {string} user object if successful.
 */
export async function handleLoginEmailAsync(email, password) {

    if (!isValidEmail(email)) {
        Alert.alert('❌ Email inválido', 'Por favor, insira um email válido');
        return null;
    }

    if (!isValidPassword(password)) {
        Alert.alert('❌ Senha inválida', 'Por favor, insira uma senha válida');
        return null;
    }

    try {
        const user = await auth().signInWithEmailAndPassword(email, password);
        return await user;
    }
    catch (error) {
        console.log(error.message)
        return error.message
    }
}

export async function handleSignOut() {
    try {
        await auth().signOut();
    }
    catch (error) {
        console.log(error.message);
        Alert.alert('❌ Error', error.message);
    }
}

//#endregion

//#region Signup handlers and verifications

/**
 * 
 * @param {string} email
 * @param {string} password
 * @param {string} name Used for {@link createUser()} function
 * @param {string} telphone Used for {@link createUser()} function
 * 
 * 
 * @returns {boolean} true or false
 */
export async function signUpEmailPassword(email, password, name, telphone) {

    if (!email) {
        Alert.alert('Erro', 'Por favor, informe um e-mail.');
        return false
    }
    if (!password && !isValidPassword(password)) {
        Alert.alert('Erro', 'Por favor, informe uma senha válida.\nA senha deve conter 8 dígitos, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.');
        return false;
    }
    if (!isValidEmail(email)) {
        return false
    }

    await createUser(email, password, name, telphone);
    return true;
}

const createUser = async (email, password, name, telphone) => {
    try {
        console.log(email, password, name, telphone);
        let response = auth().createUserWithEmailAndPassword(email, password).then(async (userCreds) => {
            await userCreds.user.updateProfile({
                displayName: name,
            })
            await userCreds.user.updatePhoneNumber(telphone);
        })
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
 * - 8 digits
 * - no spaces 
 * - 1 uppercase 
 * - 1 lowercase
 * - 1 number
 * 
 * @param {String} password
 * @returns {boolean} true or false
 */
const isValidPassword = password => {
    let rgx = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?\_₹]).{8,16}$/;
    return rgx.test(String(password));
}

/**
 * 
 * Uses the firebase method to send a email verification.
 * Will trigger the onAuthStateChanged event.
 * 
 * @param {string} opt - Options for actionCodeSettings
 * 
 * @returns {boolean} true - Success, email sent
 * @returns {boolean} false - Error
 * 
 * @see Firebase docs https://firebase.google.com/docs/reference/js/v8/firebase.auth#actioncodesettings
 * 
 */
export async function verificationEmail(opt = '') {
    try {
        opt != '' ? await auth().currentUser.sendEmailVerification(opt) : await auth().currentUser.sendEmailVerification();
        return true;
    }
    catch (error) {
        console.log(error.message);
        return false;
    }
}

//#endregion
