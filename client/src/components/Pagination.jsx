import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPages } from "../actions";

import Page from "./Page";
const Pagination = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
 
  const [currentPage, setCurrentPage] = useState(0);
  const [dataPerPage] = useState(8);
  const stateDogs = useSelector((state) => state.dogs);
  
  const indexLastPost = currentPage * dataPerPage;
  const indexOfFirsPost = indexLastPost - dataPerPage;
  const currentPosts = data.slice(indexOfFirsPost, indexLastPost);
  
  useEffect(() => {
    setData(stateDogs);
    setCurrentPage(1);
    dispatch(setPages(stateDogs.slice(0, 8)));
    // eslint-disable-next-line
  }, [stateDogs]);

  const paginate = (pageNum) => {
    setCurrentPage(pageNum);
  };

  useEffect(() => {
    dispatch(setPages(currentPosts));
    // eslint-disable-next-line
  }, [currentPage]);

  return (
    <div>
      
      <Page
        dataPerPage={dataPerPage}
        totalData={data.length}
        paginate={paginate}
        currentPage={currentPage}
      />
     
    </div>
  );
};

export default Pagination;
