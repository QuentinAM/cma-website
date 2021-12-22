// Import the functions you need from the SDKs you need
      
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase

function launch_data_base()
{
    const firebaseConfig = {

        apiKey: "",
      
        authDomain: "",
      
        projectId: "",
      
        storageBucket: "",
      
        messagingSenderId: "",
      
        appId: ""
      
      };

    app = initializeApp(firebaseConfig);
}

function create_user(email, password)
{
    if (app == null)
    {
        launch_data_base();
    }

    auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

        user = userCredential.user;

    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
}
