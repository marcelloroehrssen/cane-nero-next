import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import {theme} from "../../Theme";
import React from "react";
import clsx from "clsx";

const useStyle = makeStyles({
    imageBox: {
        width: '100%',
    },
    previewBox: {
        minHeight: '300px',
        border: '1px dashed',
        borderColor: theme.palette.secondary.dark
    }
});

const PreviewImage = ({image, title, ...props}) => {
    const classes = useStyle();
    return (<>
        {image && <img src={image} {...props} className={classes.imageBox} alt={title}/>}
        {!image && <div className={clsx(classes.imageBox, classes.previewBox)}/>}
    </>);
};

PreviewImage.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string
};

export default PreviewImage