import React, {useState, useEffect} from 'react';
import axios from "axios";
import './ListOfComplaints.scss'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";
import {Link, useHistory} from 'react-router-dom';

const ListOfComplaints = ({
                              setOpenDelete,
                              setOpenEdit,
                              allComplaints,
                              setIndexUpdate,
                              setIdDelete,
                              setAllComplaints,
                              setAllComplaintsCopy
                          }) => {
    const fields = ['Имя', 'Врач', 'Дата', 'Жалоба', ''];
    const token = JSON.parse(localStorage.getItem('token'));
    const history = useHistory();


    useEffect(() => {
        const getAllComplaints = async () => {
            try {
                const res = await axios.get("http://localhost:4000/getAllRecords", {
                    headers: {Authorization: token}
                });
                setAllComplaints(res.data.data);
                setAllComplaintsCopy(res.data.data);
            } catch (e) {
                history.replace('/logIn');
            }
        }
        getAllComplaints()
    }, [])

    const onDeleteClick = (_id) => {
        setOpenDelete(true);
        setIdDelete(_id);
    }

    const onUpdateClick = (index) => {
        setOpenEdit(true);
        setIndexUpdate(index);
    }

    return (
        <div className={'container-list'}>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead className={'head'}>
                        <TableRow>
                            {fields.map((item, index) => {
                                    return <TableCell align="center" key={`field-${index}`}>
                                        {item}
                                    </TableCell>
                                }
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allComplaints.map((item, index) => (
                                <TableRow key={item._id}>
                                    <TableCell align="center" className={'size-cell'}>{item.name}</TableCell>
                                    <TableCell
                                        align="center"
                                        className={'size-cell'}
                                    >
                                        {item.doctor}
                                    </TableCell>
                                    <TableCell align="center" className={'size-cell'}>{item.date}</TableCell>
                                    <TableCell align="center" className={'size-complain'}>{item.complaint}</TableCell>
                                    <TableCell align="center" className={'size-cell'}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => onUpdateClick(index)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => onDeleteClick(item._id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
};

export default ListOfComplaints;
