import React, {useState, useEffect} from 'react';
import axios from "axios";
import './UpdateComplaint.scss'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const UpdateComplaint = ({setOpenEdit, openEdit, setAllComplaints, indexUpdate, allComplaints, setIndexUpdate, setAllComplaintsCopy}) => {
    const [newName, setNewName] = useState('');
    const [newDoctor, setNewDoctor] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newComplaint, setNewComplaint] = useState('');
    const allDoctors = ['Хуан Антонио Третий', 'Дейнерис Таргариен', 'Спанч Боб'];
    const token = JSON.parse(localStorage.getItem('token'));


    useEffect(() => {
        const getComplaint = () => {
            if (indexUpdate !== null) {
                const {name, doctor, date, complaint} = allComplaints[indexUpdate];
                setNewName(name);
                setNewDoctor(doctor);
                setNewDate(date);
                setNewComplaint(complaint);
            }
        }
        getComplaint();
    }, [indexUpdate])

    const onClickCancel = () => {
        setOpenEdit(false);
        setIndexUpdate(null);
    };

    const onClickSave = async () => {

        await axios.patch('http://localhost:4000/editRecord', {
            _id: allComplaints[indexUpdate]._id,
            name: newName,
            doctor: newDoctor,
            date: newDate,
            complaint: newComplaint,
        }, {
            headers: { Authorization: token }
        }).then(res => {
            setAllComplaints(
                res.data.data
            );
            setAllComplaintsCopy(res.data.data);
            setIndexUpdate(null);
        });

        setOpenEdit(false);
        setNewName('');
        setNewDoctor('');
        setNewDate('');
        setNewComplaint('');
    };

    return (
        <div className={'modal-update'}>
            <Dialog
                open={openEdit}
                onClose={onClickCancel}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle>Изменить прием</DialogTitle>
                <DialogContent className='modal-update'>
                    <TextField
                        type="text"
                        label="Имя"
                        variant="outlined"
                        fullWidth
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <FormControl variant="outlined">
                        <InputLabel>Врач</InputLabel>
                        <Select
                            fullWidth
                            label="Врач"
                            className={'doctor'}
                            value={newDoctor}
                            onChange={(e) => setNewDoctor(e.target.value)}
                        >
                            {allDoctors.map((item, index) => {
                                    return <MenuItem value={`${item}`} key={`doctor-${index}`}>
                                        {item}
                                    </MenuItem>
                                }
                            )}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        type="date"
                        variant="outlined"
                        fullWidth
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                    />
                    <TextField
                        multiline
                        label="Жалобы"
                        rows={4}
                        variant="outlined"
                        fullWidth
                        value={newComplaint}
                        onChange={(e) => setNewComplaint(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => onClickCancel()}
                        variant="contained"
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => onClickSave()}
                        variant="contained"
                        color="primary"
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UpdateComplaint;
