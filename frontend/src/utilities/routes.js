import AdministratorMenu from '../views/AdministratorMenu';
import Login from '../views/login';
import Signin from '../views/Signin';
import UserMenu from '../views/UserMenu';

export const rutas = [
    {
        path: "/",
        element: Login
    },
    {
        path: "/signin",
        element: Signin
    },
    {
        path: "/admin",
        element: AdministratorMenu
    },
    {
        path: "/user",
        element: UserMenu
    }
]