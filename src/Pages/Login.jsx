
import { Toaster } from "react-hot-toast"
import { useFormik } from 'formik';
import Axios from "axios"


function Login() {


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },

        onSubmit: async (values) => {
            try {
                const response = await Axios.post(
                    `http://localhost:5000/login`,
                    { email: formik.values.email, password: formik.values.password },
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

               


                <button type="submit">Submit</button>

            </form>
        </>
    );
}

export default Login;
