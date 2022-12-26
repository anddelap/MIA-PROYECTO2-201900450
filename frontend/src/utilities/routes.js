import AddCar from '../views/Admin/AddCar';
import AddViaje from '../views/Admin/AddViaje';
import DeleteCar from '../views/Admin/DeleteCar';
import DeleteUserAdmin from '../views/Admin/DeleteUserAdmin';
import DeleteViaje from '../views/Admin/DeleteViaje';
import HistoryAdmin from '../views/Admin/HistoryAdmin';
import UserRegistryAdmin from '../views/Admin/UserRegistryAdmin';
import AdministratorMenu from '../views/AdministratorMenu';
import Login from '../views/login';
import CarsRecepcionist from '../views/Recepcionist/CarsRecepcionist';
import ViajeRecepcionist from '../views/Recepcionist/ViajeRecepcionist';
import RecepcionistMenu from '../views/RecepcionistMenu';
import Signin from '../views/Signin';
import CarsTurist from '../views/Turist/CarsTurist';
import ViajeTurist from '../views/Turist/ViajeTurist';
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
    //Routes for admin
    {
        path: "/admin",
        element: AdministratorMenu
    },
    {
        path: "/admin/add-user",
        element: UserRegistryAdmin
    },
    {
        path: "/admin/delete-user",
        element: DeleteUserAdmin
    },
    {
        path: "/admin/history",
        element: HistoryAdmin
    },
    {
        path: "/admin/add-fly",
        element: AddViaje
    },
    {
        path: "/admin/delete-fly",
        element: DeleteViaje
    },
    {
        path: "/admin/add-car",
        element: AddCar
    },
    {
        path: "/admin/delete-car",
        element: DeleteCar
    },
    //Routes for user
    {
        path: "/user",
        element: UserMenu
    },
    {
        path: "/user/fly",
        element: ViajeTurist
    },
    {
        path: "/user/car",
        element: CarsTurist
    },
    //Routes for recepcionist
    {
        path: "/recepcionist",
        element: RecepcionistMenu
    },
    {
        path: "/recepcionist/fly",
        element: ViajeRecepcionist
    },
    {
        path: "/recepcionist/car",
        element: CarsRecepcionist
    }
]