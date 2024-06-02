
import { useNavigate } from 'react-router-dom';
import  {useState,} from 'react';
import { Link } from 'react-router-dom';


const RegistrationForm = ({signup,rmessage}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword,setrePassword] = useState('')
  const [username,setUsername] = useState('');

  const onChangeEmail = e => {
    const email = e.target.value;
      setEmail(email);
      }
  const onChangePassword = e => {
      const password = e.target.value;
      setPassword(password);
      }
  const onChangeUsername = e => {
    const username = e.target.value;
    setUsername(username);
  }
  const onChangerePassword = e => {
    const repassword = e.target.value;
    setrePassword(repassword)
  }
  const handleRegister =  async (event) => {
    event.preventDefault();
    const user = { username, email, password };
    const success = await signup(user)
    if (success) {
      navigate('/login')
    }
  }
  return (
    <section className="vh-100" style={{ backgroundColor: '#eee' }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: '25px' }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="text" id="form3Example1c" className="form-control" value={username} onChange={onChangeUsername} />
                          <label className="form-label" htmlFor="form3Example1c">
                            Your Name
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="email" id="form3Example3c" className="form-control" value={email}  onChange={onChangeEmail}/>
                          <label className="form-label" htmlFor="form3Example3c">
                            Your Email
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="password" id="form3Example4c" className="form-control" value={password} onChange={onChangePassword} />
                          <label className="form-label" htmlFor="form3Example4c">
                            Password
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="password" id="form3Example4cd" className="form-control" value={repassword} onChange={onChangerePassword}/>
                          <label className="form-label" htmlFor="form3Example4cd">
                            Repeat your password
                          </label>
                          <br/>
                          <Link to="/login" className="link-info">Login</Link>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="button" className="btn btn-primary btn-lg" onClick={handleRegister}>
                          Register
                        </button>
                        {rmessage && <p style={{ color: 'red' }}>{rmessage}</p>}
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://i.pinimg.com/originals/10/41/5d/10415d2d0accbbd6ae2ce6018fea86b9.jpg"
                      className="img-fluid"
                      alt="Sample"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;


