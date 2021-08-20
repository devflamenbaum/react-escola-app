import React from 'react';
import {
    FaHome,
    FaSignInAlt,
    FaUserAlt,
    FaCircle,
    FaPowerOff,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/modules/auth/action';
import history from '../../services/history';

import { Nav } from './styled';

export default function Index() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(actions.loginFailure());
        history.push('/');
    };

    return (
        <Nav>
            <Link to="/">
                <FaHome size={24} />
            </Link>
            <Link to="/register">
                <FaUserAlt size={24} />
            </Link>
            {isLoggedIn ? (
                <Link onClick={handleLogout} to="/logout">
                    <FaPowerOff size={24} />
                </Link>
            ) : (
                <Link to="/login">
                    <FaSignInAlt size={24} />
                </Link>
            )}

            {isLoggedIn && <FaCircle size={24} color="#66ff33" />}
        </Nav>
    );
}