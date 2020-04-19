import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import {theme} from "../../Theme";
import React from "react";

const useStyle = makeStyles({
    previewBox: {
        width: '100%',
        minHeight:'300px',
        border: '1px dashed',
        borderColor: theme.palette.secondary.dark
    }
});

PreviewImage.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string
};

export default function PreviewImage(props) {
    const classes = useStyle();

    if (props.image) {
        return <img src={props.image} style={{width:"100%"}} alt={props.title}/>
    } else {
        return <div className={classes.previewBox}/>
    }
}