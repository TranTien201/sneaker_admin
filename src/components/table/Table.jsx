import React, { useState, useEffect, memo } from "react";

import "./table.css";

const Table = (props) => {
  const initDataShow =
    props.limit && props.bodyData
      ? props.bodyData.slice(0, Number(props.limit))
      : props.bodyData;
  const [dataShow, setDataShow] = useState([]);
  useEffect(() => {
    setDataShow(initDataShow);
  }, [props.bodyData]);
  let pages = 1;
  let index = 0;
  let range = [];
  console.log(123);
  if (props.limit !== undefined) {
    let page = Math.floor(props.bodyData.length / Number(props.limit));
    pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1;
    range = [...Array(pages).keys()];
  }

  const [currPage, setCurrPage] = useState(0);

  const selectPage = (page) => {
    const start = Number(props.limit) * page;
    const end = start + Number(props.limit);

    setDataShow(props.bodyData.slice(start, end));

    setCurrPage(page);
  };

  return (
    <div>
      <div className="table-wrapper">
        <table>
          {props.headData ? (
            <thead>
              <tr>
                {props.headData.map((item, index) => (
                  <th key={index}>{item}</th>
                ))}
              </tr>
            </thead>
          ) : null}
          {props.bodyData ? (
            <tbody>
              {dataShow.map((item, index) => props.renderBody(item, index, props.data))}
            </tbody>
          ) : null}
        </table>
      </div>
      {pages > 1 ? (
        <div className="table__pagination">
          {range.map((item, index) => (
            <div
              key={index}
              className={`table__pagination-item ${
                currPage === index ? "active" : ""
              }`}
              onClick={() => selectPage(index)}
            >
              {item + 1}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default memo(Table);
