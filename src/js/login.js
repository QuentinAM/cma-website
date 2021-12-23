// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//         // User is signed in.
//         var displayName = user.displayName;
//         var email = user.email;
//         var emailVerified = user.emailVerified;
//         var photoURL = user.photoURL;
//         var isAnonymous = user.isAnonymous;
//         var uid = user.uid;
//         var providerData = user.providerData;
//         console.log(user);
//         console.log(displayName);
//         console.log(email);
//         console.log(emailVerified);
//         console.log(photoURL);
//         console.log(isAnonymous);
//         console.log(uid);
//         console.log(providerData);
//         // ...
//     } else {
//         // User is signed out.
//         // ...
//     }
// });

function set_form_message(form_element, type, message){
    const message_element = form_element.querySelector('.form__message');

    message_element.textContent = message;
    message_element.classList.remove('.form__message--success', '.form__message--error');
    message_element.classList.add(`.form__message--${type}`);
}

function set_input_error(input_element, message){
    input_element.classList.add('form__input--error');
    input_element.parentElement.querySelector('.form__input-error-message').textContent = message;
}

function clear_input_error(input_element){
    input_element.classList.remove('form__input--error');
    input_element.parentElement.querySelector('.form__input-error-message').textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const login_form = document.querySelector("#login");
    const create_account_form = document.querySelector("#create_account");

    document.querySelector("#link_create_account").addEventListener("click", element => {
        element.preventDefault();
        login_form.classList.add("form__hidden");
        create_account_form.classList.remove("form__hidden");
    });

    document.querySelector("#link_login").addEventListener("click", element => {
        element.preventDefault();
        create_account_form.classList.add("form__hidden");
        login_form.classList.remove("form__hidden");
    });

    login_form.addEventListener("submit", event => {
        event.preventDefault();
        
        console.log("login...\n");
        const email = login_form.querySelector("#login_email").value;
        const password = login_form.querySelector("#login_password").value;

        // firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
            
        //     set_form_message(login_form, "error", errorMessage);
        
        // });
        
        set_form_message(login_form, "success", "Logging in...");
    });

    create_account_form.addEventListener("submit", event => {
        event.preventDefault();

        // // Create account
        // create_user(create_account_form.querySelector("#signup_email").value,
        //             create_account_form.querySelector("#signup_password").value);

    });

    document.querySelectorAll('.form__input').forEach(input_element => {
        input_element.addEventListener("blur", event => {
            
            // Username too short
            if (event.target.id == "signup_username" &&
                event.target.value.length > 0 &&
                event.target.value.length < 10){
                set_input_error(input_element, "Username must be at least 10 characters long");
            }

            // Email invalid
            if (event.target.id == "signup_email" && 
               (!event.target.value.includes('@') || !event.target.value.includes('.')))
            {
                set_input_error(input_element, "Invalid email");
            }

            // Password too short
            if (event.target.id == "signup_password" &&
                event.target.value.length > 0 &&
                event.target.value.length < 8){
                set_input_error(input_element, "Password must be at least 8 characters long");
            }

            if (event.target.id == "signup_password_confirm" &&
                event.target.value != document.querySelector("#signup_password").value){
                set_input_error(input_element, "Passwords do not match");
            }
        });

        input_element.addEventListener("input", event => {
           clear_input_error(input_element); 
        });
    });
    
});