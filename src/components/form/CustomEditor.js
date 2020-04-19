import React from "react";
import {Editor} from "@tinymce/tinymce-react/lib/cjs/main/ts";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormError from "./FormError";

export default function CustomEditor(props) {

    return (
        <FormControl className={props.containerClass} fullWidth={!!props.fullWidth} error={!!props.error.status}>
            <InputLabel htmlFor="name">{props.label}</InputLabel>
            <Editor
                initialValue={props.value}
                apiKey="1o81zixgw3g7egnhomvsonn8ry3gkyicl7qrnev4qgw45g0n"
                init={{
                    height: 500,
                    menubar: false,
                    branding: false,
                    block_formats: 'Paragraph=p; Header 2=h2; Header 3=h3; Header 4=h4; Header 5=h5; Header 6=h6',
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat'
                }}
                onEditorChange={props.onChange}
            />
            <FormError id={props.id} in={!!props.error.status} text={props.error.message}/>
        </FormControl>
    );
}