import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {setPages} from '../actions';

import Page from './Page'
const Pagination = () => {
    const dispatch = useDispatch();
    const [data, setData] =useState([]);
    //const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(8);
    const stateDogs = useSelector(state=>state.dogs)
    useEffect(()=>{
     //dispatch(getDogs());
     dispatch(setPages(stateDogs.slice(0,8)))
     setData(stateDogs)
     
     
    },[stateDogs]);
   
    const indexLastPost = currentPage * dataPerPage;
    const indexOfFirsPost = indexLastPost - dataPerPage;
    const currentPosts = data.slice(indexOfFirsPost,indexLastPost);
  
     
     console.log(currentPage)
     
     const paginate =(pageNum)=>{
        dispatch(setPages(currentPosts))
         setCurrentPage(pageNum)
        
     }
    return (
        <div>
            <Page dataPerPage={dataPerPage} totalData={data.length} paginate={paginate}/>
        </div>
    );
}
 
export default Pagination;