import React, {useContext} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {theme} from "../../Theme";
import {useStyles} from "../header/LoginRegisterStyle";
import {Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Dropzone from 'react-dropzone-uploader'
import ConfigContext from "../../provider/ConfigContext";
import FormError from "./FormError";

const useStyle = makeStyles({
    dzuInputLabel: {
        "color": theme.palette.primary
    }
});

function UploadButton() {
    return (
        <Tooltip title={'Invia I file'} placement={"top"} arrow>
            <IconButton>
                <AddAPhotoIcon color={"secondary"}/>
            </IconButton>
        </Tooltip>
    );
}

export default function CustomUploader(props)
{
    const classes = useStyles();

    const config = useContext(ConfigContext);

    const getUploadParams = ({meta}) => {
        return {
            url: config.ws_url + props.uploadPath
        }
    };
    const handleChangeStatus = (fileWithMeta, status) => {
        if (status === 'headers_received') {
            fileWithMeta.remove()
        } else if (status === 'done') {
            props.onChange(JSON.parse(fileWithMeta.xhr.response));
        }
    };

    return (
        <FormControl className={props.containerClass} fullWidth={!!props.fullWidth} error={!!props.error.status}>
            <Dropzone
                inputContent={props.label}
                classNames={classes.dzuInputLabel}
                getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                canRemove={false}
                multiple={false}
                maxFiles={1}
                inputWithFilesContent={null}
                SubmitButtonComponent={UploadButton}
                accept="image/*"
            />
            <FormError id={props.id} in={!!props.error.status} text={props.error.message}/>
        </FormControl>
    );
}