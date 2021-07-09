import React, {useState} from 'react';
import './TricksPage.scss'
import Header from "../Header/Header";
import CreateComplaint from "./CreateComplaint/CreateComplaint";
import ListOfComplaints from "./ListOfComplaints/ListOfComplaints";
import DeleteComplaint from "../Modal/DeleteComplaint/DeleteComplaint";
import UpdateComplaint from "../Modal/UpdateComplaint/UpdateComplaint";
import SortBy from "../SortBy/SortBy";

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
      <SortBy
        setAllComplaints={setAllComplaints}
        allComplaints={allComplaints}
        sort={sort}
        setSort={setSort}
        direction={direction}
        setDirection={setDirection}
        allComplaintsCopy={allComplaintsCopy}
      />
      <ListOfComplaints
        setOpenDelete={setOpenDelete}
        setOpenEdit={setOpenEdit}
        allComplaints={allComplaints}
        setIndexUpdate={setIndexUpdate}
        setIdDelete={setIdDelete}
        setAllComplaints={setAllComplaints}
        setAllComplaintsCopy={setAllComplaintsCopy}
      />
      <DeleteComplaint
        setOpenDelete={setOpenDelete}
        openDelete={openDelete}
        setAllComplaints={setAllComplaints}
        idDelete={idDelete}
        setAllComplaintsCopy={setAllComplaintsCopy}
      />
      <UpdateComplaint
        setOpenEdit={setOpenEdit}
        openEdit={openEdit}
        setAllComplaints={setAllComplaints}
        indexUpdate={indexUpdate}
        setIndexUpdate={setIndexUpdate}
        allComplaints={allComplaints}
        setAllComplaintsCopy={setAllComplaintsCopy}
      />
    </div>
  );
};

export default TricksPage;
