import Cookies from 'js-cookie';


function Logout() {
    Cookies.remove('token');
    Cookies.remove('username');
    window.location.href = '/';
}

export default Logout;