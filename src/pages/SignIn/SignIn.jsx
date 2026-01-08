import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import registerLottie from '../../assets/lotties/12.json'
import Lottie from 'lottie-react';
import { AuthContext } from '../../provider/AuthContext';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
// import { Helmet } from 'react-helmet-async';

const SignIn = () => {

    const { signInUser, googleSignIn } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    // console.log('location in signin', location);
    const navigate = useNavigate();
    const from = location.state?.from || "/";
    const [error, setError] = useState("")

    console.log(location);
    console.log(from);

    const handleSignIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);

        // signIn user
        signInUser(email, password)
            .then(result => {
                const user = result.user;
                // console.log(user);
                Swal.fire({
                    icon: "success",
                    title: "Login Successful!",
                    text: `Welcome back, ${user.displayName || user.email}`,
                    showConfirmButton: false,
                    timer: 2000
                });

                navigate(from, { replace: true });
            })
            .catch(error => {
                const errorCode = error.code;
                // const errorMessage = error.message;
                setError(errorCode)

            })

    }

    const handleGoogleLogIn = () => {
        googleSignIn()
            .then(() => {
                toast.success("Logged in with Google!");
                 navigate(from, { replace: true });
            })
            .error(error => {
                const errorCode = error.code;
                setError(errorCode)
            })
    }


    return (
        <div className='min-h-screen flex items-center'>
            {/* <Helmet>
                <title>EduCircle || SignIN</title>
            </Helmet> */}
            <div className="hero py-20">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <Lottie className="w-full min-w-[300px] max-w-[550px] mx-auto" animationData={registerLottie} loop={true} ></Lottie>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <h1 className="text-4xl font-bold text-black dark:text-white text-center">Login now!</h1>
                            <form onSubmit={handleSignIn} className="fieldset">
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
                                {/* <label className="label py-1">
                                    <input name='terms' type="checkbox" className="checkbox" />
                                    Accept Term & conditions
                                </label> */}
                                <div><a className="link link-hover">Forgot password?</a></div>
                                {error && <p className='text-red-500 text-sm'>{error}</p>}
                                <button className="w-full mt-4 px-4 py-2 rounded-sm font-medium transition-colors
  bg-gray-900 text-white hover:bg-gray-800  dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-300 cursor-pointer">Sign In</button>
                                <div className="divider">OR</div>
                                <button onClick={handleGoogleLogIn}
                                    className="w-full mt-1 px-4 py-2 flex items-center justify-center gap-2 rounded-md font-medium transition-all border
  bg-white text-gray-900 border-gray-300 hover:bg-gray-100 hover:border-primary
  dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-500">

                                    <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                    Login with Google
                                </button>

                                <p className='text-center pt-3'>Dont’t Have An Account ?
                                    <Link
                                        state={{ from }}
                                        className='text-blue-600 hover:underline' to="/register"
                                    >
                                        Register
                                    </Link>
                                </p>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;