import styled from 'styled-components';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { auth, provider } from '../firebase';
import {selectUserName,selectUserPhoto,selectUserLoginDetails, setUserLoginDetails, setSignOutState} from '../features/user/userSlice'
import {useEffect} from 'react'

const Header = (props) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const userName = useSelector(selectUserName)
    const userPhoto = useSelector(selectUserPhoto);
    
    useEffect(() => {
        auth.onAuthStateChanged(async (user) =>{
            if(user) {
                setUser(user)
                history.push('/home')
            }
        })
    }, [userName])

        const handleAuth = () => {
            if(!userName) {
                auth
                .signInWithPopup(provider)
                .then((result) =>{
                    setUser(result.user)
                }).catch((error) =>{
                    alert(error.message)
                })
            } else if (userName) {
                auth.signOut().then(() => {
                    dispatch(setSignOutState())
                    history.push('/')
                }).catch((err) => alert(err.message))
            }
        }

        const setUser = (user) => {
            dispatch(
                setUserLoginDetails({
                    name:user.displayName,
                    email:user.email,
                    photo:user.photoURL,
                })
            )
        }

    return(
        <Nav>
            <Logo>
                <img src="/images/logo.svg" alt="Disney+" />
            </Logo>
            {
                !userName ? (
                <Login onClick={handleAuth}>Login</Login> 
                 ) : (
                <>
                    <NavMenu>
                        <a>
                            <img src="/images/home-icon.svg" />
                            <span>HOME</span>
                        </a>
                        <a>
                            <img src="/images/search-icon.svg" />
                            <span>SEARCH</span>
                        </a>
                        <a>
                            <img src="/images/watchlist-icon.svg" />
                            <span>WATCHLIST</span>
                        </a>
                        <a>
                            <img src="/images/original-icon.svg" />
                            <span>ORIGINALS</span>
                        </a>
                        <a>
                            <img src="/images/movie-icon.svg" />
                            <span>MOVIES</span>
                        </a>
                        <a>
                            <img src="/images/series-icon.svg" />
                            <span>SERIES</span>
                        </a>
                    </NavMenu>
                    <SignOut>
                        <UserImg src={userPhoto} alt={userPhoto}/>
                        <DropDown>
                            <span onClick={handleAuth}>Sign Out</span>
                        </DropDown>
                    </SignOut>
                </>
            )}
        </Nav> 
    )
}


const Nav = styled.nav `
    position:fixed;
    top:0;
    left:0;
    right:0;
    height:70px;
    background-color:#090b13;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 36px;
    letter-spacing:16px;
    z-index: 3;
`

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div `
    align-items:center;
    display:flex;
    flex-flow:row nowrap;
    height:100%;
    justify-content:flex-end;
    margin:0px;
    padding:0px;
    position:relative;
    margin-right:auto;
    margin-left:25px;
    cursor:pointer;

    a{
        display:flex;
        align-items:center;
        padding:0 12px;

        img{
            height:20px;
            min-width:20px;
            width:20px;
            z-index:auto;
        }
        span {
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;
            &:after {
                content: "";
                height: 2px;
                background: white;
                position: absolute;
                left: 0; 
                right: 0;
                bottom: -6px;
                opacity: 0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                transform: scaleX(0);
            }
        }
        &:hover {
            span:after {
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }

    @media (max-width: 768px) {
        display:none;
    }
`

const Login = styled.a `
    background-color:rgba(0,0,0,0.6);
    padding:8px 16px;
    text-decoration:none;
    text-transform:uppercase;
    letter-spacing:1.5px;
    border:1px solid #f9f9f9;
    border-radius:4px;
    transition: all 0.2s ease 0s;
    cursor:pointer;

    &:hover{
        background-color:#f9f9f9;
        color:#000;
        border-color:transparent;
    }
`

const UserImg = styled.img `
    height:100%;
`

const DropDown = styled.div `
    position: absolute;
    top: 48px;
    right: 0px;
    background: rgb(19, 19, 19);
    border: 1px solid rgba(151, 151, 151, 0.34);
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
    padding: 10px;
    font-size: 10px;
    text-align:center;
    letter-spacing: 3px;
    width: 100px;
    opacity: 0;
`
const SignOut = styled.div `
    position:relative;
    height:48px;
    width:48px;
    display:flex;
    cursor:pointer;
    align-items:center;
    justify-content:center;

    ${UserImg}{
        border-radius:50%;
        width:100%;
        height:100%;
    }
    &:hover{
        ${DropDown}{
            opacity:1;
            transition-duration:1s;
        }
    }
`

export default Header;