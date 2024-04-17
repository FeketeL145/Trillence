import Cookies from 'js-cookie';


function Logout() {
    Cookies.remove('token');
    Cookies.remove('username');
    Cookies.remove('isAdmin');
    window.location.href = '/';
}

export default Logout;