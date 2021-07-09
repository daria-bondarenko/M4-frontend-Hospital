import React, {useState, useEffect} from 'react';
import './SortBy.scss'
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import moment from 'moment';
import _ from 'underscore';
import axios from "axios";

const SortBy = ({allComplaints, setAllComplaints, sort, setDirection, direction, setSort, allComplaintsCopy}) => {
  const allOptions = ['Имя', 'Врач', 'Дата', 'По умолчанию'];
  const allDirection = ['По возрастанию', 'По убыванию']
  const [firstDate, setFirstDate] = useState(moment().format('yyyy-MM-DD'));
  const [secondDate, setSecondDate] = useState(moment().format('yyyy-MM-DD'));
  const [directionOpen, setDirectionOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState(false);
  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    const openDirection = async () => {
      if (sort === 'По умолчанию') {
        setDirectionOpen(false);
        setDirection('По возрастанию');
        setAllComplaints(allComplaintsCopy);
        setDateFilter(false);
      } else {
        setDirectionOpen(true);
        if (sort === 'Имя' && direction === 'По возрастанию') {
          setAllComplaints(_.sortBy(allComplaints, 'name'))
        }
        if (sort === 'Врач' && direction === 'По возрастанию') {
          setAllComplaints(_.sortBy(allComplaints, 'doctor'))
        }
        if (sort === 'Дата' && direction === 'По возрастанию') {
          setAllComplaints(_.sortBy(allComplaints, 'date'))
        }
        if (sort === 'Имя' && direction === 'По убыванию') {
          let newAllComplaints = _.sortBy(allComplaints, 'name');
          setAllComplaints(newAllComplaints.reverse())
        }
        if (sort === 'Врач' && direction === 'По убыванию') {
          let newAllComplaints = _.sortBy(allComplaints, 'doctor');
          setAllComplaints(newAllComplaints.reverse())
        }
        if (sort === 'Дата' && direction === 'По убыванию') {
          let newAllComplaints = _.sortBy(allComplaints, 'date');
          setAllComplaints(newAllComplaints.reverse())
        }
      }
    }
    openDirection();
  }, [sort, direction])

  const onClickDeleteFilter = async () => {
    setAllComplaints(allComplaintsCopy);
    setDateFilter(false);
  }

  const onClickFilter = () => {
    let complaintsDate = allComplaints.filter((complaint) => {
      if (complaint.date >= firstDate && complaint.date <= secondDate) {
        return true
      }
    })
    setAllComplaints(complaintsDate);
  }

  return (
      <div className='all-sort-container'>
        <div className='container-sort'>
          {directionOpen && <FormControl variant="outlined">
            <InputLabel>Направление</InputLabel>
            <Select
                label="Направление"
                className={'sort'}
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
            >
              {allDirection.map((item, index) => {
                    return <MenuItem value={`${item}`} key={`doctor-${index}`}>
                      {item}
                    </MenuItem>
                  }
              )}
            </Select>
          </FormControl>}
          <FormControl variant="outlined">
            <InputLabel>Сортировать по:</InputLabel>
            <Select
                label="Сортировать по:"
                className={'sort'}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
            >
              {allOptions.map((item, index) => {
                    return <MenuItem value={`${item}`} key={`doctor-${index}`}>
                      {item}
                    </MenuItem>
                  }
              )}
            </Select>
          </FormControl>
        </div>
          {dateFilter
              ? <div className='container-filter'>
                <span className='text'>C :</span>
                <TextField
                    type='date'
                    variant="outlined"
                    value={firstDate}
                    onChange={(e) => setFirstDate(e.target.value)}/>
                <span className='text'>По :</span>
                <TextField
                    type='date'
                    variant="outlined"
                    value={secondDate}
                    onChange={(e) => setSecondDate(e.target.value)}/>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onClickFilter()}
                >
                  Фильтровать
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onClickDeleteFilter()}
                >
                  Удалить фильтр
                </Button>
              </div>
              : <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setDateFilter(true)}
              >
                Добавить фильтр по дате
              </Button>}
      </div>
  );
};

export default SortBy;
