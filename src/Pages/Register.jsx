
import { Toaster } from "react-hot-toast"
import { useFormik } from 'formik';
import Axios from "axios"


function Register() {

 
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },

        onSubmit: async (values) => {
            try {
                const response = await Axios.post(
                    `http://localhost:5000/register`,
                    { email: formik.values.email, password: formik.values.password, username: formik.values.username },
                );

                console.log('Registration successful:', response.data);

            } catch (error) {
                console.error('Error signing in:', error);
            }
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>

                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />

                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />


                <button type="submit">Submit</button>

            </form>
        </>
    );
}

export default Register;
