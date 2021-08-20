import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function MyRoute({ component: Component, isClosed, ...args }) {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    if (isClosed && !isLoggedIn) {
        return (
            <Redirect
                to={{
                    pathname: '/login',
                    state: { prevPath: args.location.pathname },
                }}
            />
        );
    }

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Route {...args} component={Component} />;
}

MyRoute.defaultProps = {
    isClosed: false,
};

MyRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
        .isRequired,
    isClosed: PropTypes.bool,
};

export default MyRoute;
