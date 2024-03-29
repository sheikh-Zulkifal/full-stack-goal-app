import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import { reset, logout } from '../features/auth/authSlice'
import {useSelector, useDispatch} from 'react-redux'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
        // console.log("user log out");
    }
  return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>GoalSetter</Link>
        </div>
        <ul>
            {user ? ( <li>
            <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Logout   
            </button>
        </li>
        ) : (
        <>
            <li>
            <Link to='/login'>
                <FaSignInAlt /> Login   
            </Link>
        </li>
        <li>
            <Link to='/register'>
                <FaUser /> Register
            </Link>
        </li>
         </>)}
            
        </ul>
    </header>
  )
}

export default Header
