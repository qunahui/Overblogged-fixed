import React from 'react';
import { Redirect } from 'react-router-dom';

const NotFoundPage = () => (
    <div>
        <Redirect to="/dashboard" />
    </div>
)

export default NotFoundPage;