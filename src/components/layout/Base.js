import React from 'react'
import PropTypes from 'prop-types'

const Base = ({children}) => {

    return (
        <>
            {children}
        </>
    );
}

Base.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Base;
