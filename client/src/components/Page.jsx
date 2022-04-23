import React from "react";
import style from "./Styles.module.css";
export default function Page({ dataPerPage, totalData, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(pageNumbers);
  return (
    <nav>
     
      <div>
        <ul className={style.page}>
          {pageNumbers.map((num) => (
            <li  key={num}>
              {/* <a onClick={()=>paginate(num)}>{num}</a> */}
              <button onClick={()=>paginate(num)}>{num}</button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
