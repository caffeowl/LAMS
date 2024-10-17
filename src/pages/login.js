import './login.css'
import { Link } from 'react-router-dom';
export default function Login() {
    return (
        <div class="container mt-5 body">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <form id="registrationForm">
                                <div class="form-group">
                                    <label for="reg" id="label">
                                        <b> Registration Number </b>
                                    </label>
                                    <input type="number"
                                        class="form-control"
                                        id="reg"
                                        placeholder="Enter your register number" required />
                                </div>
                                <br />
                                <div class="form-group">
                                    <label for="password" id="label_pass">
                                        <b>Password</b>
                                    </label>
                                    <input type="password"
                                        class="form-control"
                                        id="password"
                                        placeholder="Password"
                                        required />
                                </div>
                                <br />
                                <Link to='/attend'>
                                    <button class="btn btn-primary text-center">
                                        Login
                                    </button>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}