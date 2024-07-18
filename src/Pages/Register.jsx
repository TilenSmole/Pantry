
import { Toaster } from "react-hot-toast"




function Register() {

    const handleSubmit = (event) => {
        event.preventDefault(); 
        const username = event.target.elements.uname.value;
        const password = event.target.elements.psw.value; 


        if (username.trim() === '' || password.trim() === '') {
            alert('Please enter both username and password.');
            return;
        }

   
        console.log("Submitting:", { username, password });

        event.target.elements.uname.value = '';
        event.target.elements.psw.value = '';




    }


    return (
        <>
            <div>
                <label htmlFor="uname"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="uname" required />

                <label htmlFor="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required />

                <button type="submit" onClick={handleSubmit}>Login</button>
            </div>
        </>
    );
}

export default Register;
