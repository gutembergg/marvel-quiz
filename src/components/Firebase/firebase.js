import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "marvel-quiz-8bccd.firebaseapp.com",
    databaseURL: "https://marvel-quiz-8bccd.firebaseio.com",
    projectId: "marvel-quiz-8bccd",
    storageBucket: "marvel-quiz-8bccd.appspot.com",
    messagingSenderId: "159025442510",
    appId: "1:159025442510:web:8036bd8b13cac14de32a9f"
  };

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    /// Inscription //////////////////////////////////////////////////

    signupUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    /// Connexion //////////////////////////////////////////////////////

    loginUser = (email, password) => 
    this.auth.signInWithEmailAndPassword(email, password);

    /// Deconnexion /////////////////////////////////////////////////////

    signoutUser = () => this.auth.signOut();

    /// Recover password ////////////////////////////////////////////////

    passwordReset = email => this.auth.sendPasswordResetEmail(email);

    user = uid => this.db.doc(`users/${uid}`);
}

export default Firebase;