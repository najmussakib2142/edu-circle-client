import Lottie from 'lottie-react';
import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import registerLottie from '../../assets/lotties/11.json'
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../provider/AuthContext';
import { toast } from 'react-toastify';
// import { Helmet } from 'react-helmet-async';

const Register = () => {

    const { createUser, setUser, updateUser, googleSignIn } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();
    const [error, setError] = useState('')

    const handleRegister = e => {
        e.preventDefault();
        setError('');
        const form = e.target;
        const formData = new FormData(form)
        const email = formData.get('email')
        const password = formData.get('password')
        const name = formData.get('name')
        const photo = formData.get('photo')

        const uppercaseReg = /[A-Z]/;
        const lowercaseReg = /[a-z]/;

        if (password.length < 6) {
            setError("Password must be at least 6 characters long!");
            return;
        }
        if (!uppercaseReg.test(password)) {
            setError("Password must contain at least one uppercase letter!");
            return;
        }
        if (!lowercaseReg.test(password)) {
            setError("Password must contain at least one lowercase letter!");
            return;
        }

        // create user
        createUser(email, password)
            .then(result => {

                const user = result.user;
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo })
                        // console.log(result.user);
                        toast.success("Registration Successful!"); navigate('/')
                    })
                    .catch((error) => {
                        setError(error.message)
                        setUser(user)
                    })
            })
            .catch(error => {
                const errorCode = error.code;
                setError(errorCode);
            })
    }

    const handleGoogleLogIn = () => {
        googleSignIn()
            .then(() => {
                toast.success("Logged in with Google!");
                navigate(location.state ? location.state : "/");
            })
            .error(error => {
                toast.error(error.message)
            })
    }

    return (
        <div>
            {/* <Helmet>
                <title>EduCircle || Register</title>
            </Helmet> */}

            <div className="hero py-20">
                <div className="hero-content flex-col gap-10 lg:flex-row-reverse">

                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <h1 className="text-4xl font-bold text-black dark:text-white text-center">Register your account</h1>
                            <form onSubmit={handleRegister} className="fieldset">
                                {/* name */}
                                <label className="label">Your Name</label>
                                <input required name='name' type="text" className="input select-primary " placeholder="Enter your name" />
                                {/* photo */}
                                <label className="label">Photo URL</label>
                                <input required name='photo' type="text" className="input select-primary" placeholder="Enter your URL" />
                                {/* email */}
                                <label className="label">Email</label>
                                <input required name='email' type="email" className="input select-primary" placeholder="Email" />
                                {/* password */}
                                <label className="label">Password</label>
                                <div className='relative'>
                                    <input
                                        required
                                        name='password'
                                        type={showPassword ? 'text' : "password"}
                                        className="input select-primary"
                                        placeholder="Password"
                                    />
                                    <button
                                        onClick={() => setShowPassword(!showPassword)}
                                        className='absolute btn btn-xs right-5 top-2'
                                        type='button'
                                    >
                                        {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                                    </button>
                                </div>
                                {/* check box */}
                                <label className="label py-1">
                                    <input name='terms' type="checkbox" className="checkbox" />
                                    Accept Term & conditions
                                </label>

                                {error && <p className='text-red-500 text-sm'>{error}</p>}

                                <button className="w-full mt-4 px-4 py-2 rounded-sm font-medium transition-colors
  bg-gray-900 text-white hover:bg-gray-800 
  dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-300 cursor-pointer">
                                    Register
                                </button>
                                <div className="divider">OR</div>

                                <button onClick={handleGoogleLogIn}
                                    className="w-full mt-1 px-4 py-2 flex items-center justify-center gap-2 rounded-md font-medium transition-all border
  bg-white text-gray-900 border-gray-300 hover:bg-gray-100 hover:border-primary
  dark:bg-gray-800 dark:text-gray-100 cursor-pointer dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-500">

                                    <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                    SignIn with Google
                                </button>

                                <p className='text-center pt-3'>Already Have An Account ?
                                    <Link className='text-blue-600 hover:underline' to="/signIn"> Login </Link></p>

                            </form>
                        </div>
                    </div>

                    <div className="text-center lg:text-left">
                        <Lottie
                            className="w-full min-w-[400px] max-w-[550px] mx-auto"
                            animationData={registerLottie}
                            loop={true}
                        ></Lottie>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;