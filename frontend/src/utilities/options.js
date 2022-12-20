import { FaUserPlus } from "react-icons/fa";
import { FaUserMinus } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { MdAirplanemodeActive } from "react-icons/md";
import { MdAirplanemodeInactive } from "react-icons/md";
import { FaCarAlt } from "react-icons/fa";
import { FaCarCrash } from "react-icons/fa";

export const AdminMenu = [
    {
        title: "Crear usuario",
        icon:  <FaUserPlus size={70}/>,
        link: "/admin-menu/add-user"
    },
    {
        title: "Eliminar usuario",
        icon:  <FaUserMinus size={70}/>,
        link: "/admin-menu/delete-user"
    },
    {
        title: "Historial de vuelos",
        icon:  <FaHistory size={70}/>,
        link: "/admin-menu/history"
    },
    {
        title: "Agregar viaje",
        icon:  <MdAirplanemodeActive size={70}/>,
        link: "/admin/add-fly"
    },
    {
        title: "Eliminar viaje",
        icon:  <MdAirplanemodeInactive size={70}/>,
        link: "/admin/delete-fly"
    },
    {
        title: "Agregar automóvil",
        icon:  <FaCarAlt size={70}/>,
        link: "/admin/add-car"
    },
    {
        title: "Eliminar automóvil",
        icon:  <FaCarCrash size={70}/>,
        link: "/admin/delete-car"
    },
]

export const UserOptions = [
    {
        title: "Reservar viaje",
        icon:  <MdAirplanemodeActive size={70}/>,
        link: "/user/fly"
    },
    {
        title: "Reservar automóvil",
        icon:  <FaCarAlt size={70}/>,
        link: "/user/car"
    },
]