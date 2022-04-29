import React from "react";
import style from "./Styles.module.css";

export default function Page({ dataPerPage, totalData, paginate, currentPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  };

  return (
    <nav>
     
      <div>
      
     
        <ul className={style.page}>
        <li><button disabled={currentPage===1} onClick={()=>paginate(currentPage-1)}>Back</button></li>
          {pageNumbers.map((num) => (
            <li key={num}>
              <button className={currentPage ===num?style.selectButtonPage:null} onClick={()=>paginate(num)}>{num}</button>
            </li>
          ))}
            <li><button disabled={currentPage===pageNumbers.length} onClick={()=>paginate(currentPage+1)}>Next</button></li>
        </ul>
       
      </div>
    </nav>
  );
}
