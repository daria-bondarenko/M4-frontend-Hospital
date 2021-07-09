import React from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const DeleteComplaint = ({openDelete, setOpenDelete, setAllComplaints, idDelete, setAllComplaintsCopy}) => {
    const token = JSON.parse(localStorage.getItem('token'));

    const onClickCancel = () => {
        setOpenDelete(false);
    };

    const onClickDelete = async () => {
        const res = await axios.delete(`http://localhost:4000/deleteRecord`, {
            params: {_id: idDelete},
            headers: { Authorization: token }
        });
        setAllComplaints(res.data.data);
        setAllComplaintsCopy(res.data.data);
        setOpenDelete(false);
    }

    return (
        <div>
            <Dialog
                open={openDelete}
                onClose={() => onClickCancel()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Удалить прием"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Вы действительно хотите удалить прием?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => onClickCancel()}
                        color="primary"
                        variant="contained"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => onClickDelete()}
                        color="primary"
                        variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteComplaint;
