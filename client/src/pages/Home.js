import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { axiosInstance } from '../helpers/axiosInstance';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import { Col, Row, message } from 'antd';
import Bus from '../components/Bus';
import PageTitle from '../components/PageTitle';
import axios from 'axios';

function Home() {
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.users);
    const [buses, setBuses] = useState([]);
    const getBuses = async () => {

        try {
            dispatch(ShowLoading());
            const response = await axios.post("/api/buses/get-all-buses", {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            dispatch(HideLoading());
            if (response.data.success) {
                setBuses(response.data.data);
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    useEffect(() => {
        getBuses();
    }, []);
    return (
        <div >
            <div className='m-3'><PageTitle title={'Available Buses'} /></div>
            <div>
                <Row gutter={[15, 15]}>
                    {
                        buses.filter(bus => bus.status === 'Yet To Start').map((bus) => (
                            <Col lg={12} xs={24} sm={24}>
                                <Bus bus={bus} />
                            </Col>
                        ))
                    }
                </Row>
            </div>

        </div>
    )
}

export default Home
