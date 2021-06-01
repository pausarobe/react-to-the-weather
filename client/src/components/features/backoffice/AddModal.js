import React from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import '../../../styles/Backoffice.css';

function getModalStyle() {
    return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
}

const useStyles = makeStyles(theme => ({
    add: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    paper: {
        position: 'absolute',
        width: '50%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2)
    },
    modalHeader: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem'
    },
    formControl: {
        display: 'block',
        marginBottom: '1rem'
    },
    formButton: {
        marginTop: '1rem'
    }
}))

export default function AddModal({onSubmitToParent}) {

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const onSubmit = async event => {
        event.preventDefault();
        const object = {
            name: event.target['input-name'].value,
            ca: event.target['input-community'].value
        }
        onSubmitToParent(object);
        handleClose();
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div className={classes.modalHeader}>Add a new City</div>
            <form autoComplete="off" onSubmit={onSubmit}>
                <TextField required id="input-name" label="Name" fullWidth className={classes.formControl}/>
                <TextField id="input-community" label="Community" fullWidth className={classes.formControl}/>
                <Button variant="contained" color="primary" type="submit" className={classes.formButton}>
                    Submit
                </Button>
            </form>
        </div>
    );

    return (<div className={classes.add}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
            Add
        </Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
    </div>)

}