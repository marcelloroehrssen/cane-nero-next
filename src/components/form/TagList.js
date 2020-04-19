import React, {useEffect, useState} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));

function not(a, b) {
    let ids  = [];
    b.forEach((element) => ids.push(element.id));
    return a.filter((value) => ids.indexOf(value.id) === -1);
}

function intersection(a, b) {
    let ids  = [];
    b.forEach((element) => ids.push(element.id));
    return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList(props)
{
    const classes = useStyles();
    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState(not(props.tags, props.selectedTags));
    const [right, setRight] = useState(props.selectedTags);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    useEffect(() => {
            props.onChange(right, left)
        }, [left]
    );
    useEffect(() => {
            props.onChange(right, left)
        }, [right]
    );

    const customList = (items) => (
        <List dense component="div" role="list">
            {items.map((value) => {
                const labelId = `transfer-list-item-${value.id}-label`;

                return (
                    <ListItem key={value.id} role="listitem" button onClick={handleToggle(value)}>
                        <ListItemIcon>
                            <Checkbox
                                checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{'aria-labelledby': labelId}}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={value.label}/>
                    </ListItem>
                );
            })}
            <ListItem/>
        </List>
    );

    return (
        <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item md={5}>{customList(left)}</Grid>
            <Grid item container md={2}>
                <Grid item container xs={12} direction="column" justify={"center"} alignItems="center">
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Grid item md={5}>{customList(right)}</Grid>
        </Grid>
    );
}