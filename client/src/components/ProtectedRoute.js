import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux/usersSlice';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import DefaultLayout from './DefaultLayout';

function ProtectedRoute({ children }) {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.users);
    // const [loading, setloading] = useState(true);
    const navigate = useNavigate();
    const validateToken = async () => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post('/api/users/get-user-by-id', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            // console.log(response.data.success);
            dispatch(HideLoading());
            if (response.data.success) {
                // setloading(false);
                //console.log(response.data.data);

                dispatch(SetUser(response.data.data));
            } else {
                // setloading(false);

                localStorage.removeItem('token');
                message.error(response.data.message);
                navigate("/login");
            }
        } catch (error) {
            // setloading(false);
            dispatch(HideLoading());
            localStorage.removeItem('token');
            message.error(error.message);
            navigate("/login");

        }

    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            validateToken();

        } else {
            navigate("/login");
        }
    }, []);
    return (
        <div>{user && <DefaultLayout>{children}</DefaultLayout>}</div>
    )
}

export default ProtectedRoute;