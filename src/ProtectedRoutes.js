/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable prefer-const */
/* eslint-disable react/self-closing-comp */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from './Auth/Auth';

function ProtectedRoutes({ children }) {
    const navigate = useNavigate();
    let { user } = useUserAuth()
    if (!user) {
        navigate('/login')
    }
    return children
}

export default ProtectedRoutes;