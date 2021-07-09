import React, {useState} from 'react';
import './TricksPage.scss'
import Header from "../Header/Header";
import CreateComplaint from "./CreateComplaint/CreateComplaint";
import ListOfComplaints from "./ListOfComplaints/ListOfComplaints";

const TricksPage = () => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [indexUpdate, setIndexUpdate] = useState(null);
    const [idDelete, setIdDelete] = useState(null);
    const [allComplaints, setAllComplaints] = useState([]);
    const [allComplaintsCopy, setAllComplaintsCopy] = useState([]);
    const [sort, setSort] = useState('По умолчанию');
    const [direction, setDirection] = useState('По возрастанию');

    return (
        <div>
            <Header title={'Приемы'} button={true}/>
            <CreateComplaint setAllComplaints={setAllComplaints} setSort={setSort} setAllComplaintsCopy={setAllComplaintsCopy}/>
            <ListOfComplaints
                setOpenDelete={setOpenDelete}
                setOpenEdit={setOpenEdit}
                allComplaints={allComplaints}
                setIndexUpdate={setIndexUpdate}
                setIdDelete={setIdDelete}
                setAllComplaints={setAllComplaints}
                setAllComplaintsCopy={setAllComplaintsCopy}
            />
        </div>
    );
};

export default TricksPage;
