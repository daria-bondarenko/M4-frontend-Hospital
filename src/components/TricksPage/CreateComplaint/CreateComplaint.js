import React, {useState} from 'react';
import axios from "axios";
import moment from 'moment'
import './CreateComplaint.scss';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from "@material-ui/core/Snackbar";


const CreateComplaint = ({setAllComplaints, setSort, setAllComplaintsCopy}) => {

    const [name, setName] = useState('');
    const [doctor, setDoctor] = useState('Хуан Антонио Третий');
    const [date, setDate] = useState(moment().format('yyyy-MM-DD'));
    const [complaint, setComplaint] = useState('');
    const [openSnack, setOpenSnack] = useState(false);
    const [message, setMessage] = useState(true)
    const allDoctors = ['Хуан Антонио Третий', 'Дейнерис Таргариен', 'Спанч Боб'];
    const token = JSON.parse(localStorage.getItem('token'));

    const onAddCompClick = async () => {

        if (name.trim() !== '' && complaint.trim() !== '' && date.trim() !== '') {
            try {
                const res = await axios.post('http://localhost:4000/createNewRecord', {
                    name: name,
                    doctor: doctor,
                    date: date,
                    complaint: complaint,
                },
                {
                    headers: {Authorization: token}
                })
                setAllComplaints(res.data.data);
                setAllComplaintsCopy(res.data.data);
                setName('');
                setDoctor('Хуан Антонио Третий');
                setDate(moment().format('yyyy-MM-DD'));
                setComplaint('');
                setSort('По умолчанию');
            } catch (e) {
                setName('');
                setDoctor('Хуан Антонио Третий');
                setDate(moment().format('yyyy-MM-DD'));
                setComplaint('');
                setSort('По умолчанию');
                setMessage(false);
                setOpenSnack(true);
            }
        } else {
            setMessage(true);
            setOpenSnack(true);
        }
    }

    return (
        <div className={'container'}>
            <form noValidate autoComplete="off">
                <TextField
                    label="Имя"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <FormControl variant="outlined">
                    <InputLabel>Врач</InputLabel>
                    <Select
                        label="Врач"
                        className={'doctor'}
                        value={doctor}
                        onChange={(e) => setDoctor(e.target.value)}
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
                    type='date'
                    variant="outlined"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}/>
                <TextField
                    label="Жалоба"
                    className={'input-complaint'}
                    variant="outlined"
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}/>
            </form>
            <Button
                variant="contained"
                color="primary"
                onClick={() => onAddCompClick()}>
                Добавить
            </Button>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={openSnack}
                autoHideDuration={1600}
                message={message ? 'Введите все данные!' : 'Что-то пошло не так, попробуй еще раз :)'}
                onClose={() => setOpenSnack(false)}
            />
        </div>
    );
};

export default CreateComplaint;
