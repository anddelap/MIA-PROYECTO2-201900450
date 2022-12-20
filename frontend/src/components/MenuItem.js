import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/components/MenuItem.css'

export default function MenuItem(props) {
  const {title, icon, link} = props
  return (
    <Link to={link} className="MenuItem">
        <div className="mi-icon">
            {icon}
        </div>
        <div className="mi-title">
            {title}
        </div>
    </Link>
  )
}
