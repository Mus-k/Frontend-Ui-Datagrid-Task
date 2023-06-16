import React, { useState, useEffect } from "react";
import Form from "../form/Form";
import GlobalFilter from "./GlobalFilter";
import "./Home.css";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import Data from "../api/InputData";
import { useMemo } from "react";
import Table from "../table/Table";

// ana sayfa
function Home() {
  // başlangıç ​​hali
  const [info, setInfo] = useState({
    link: "",
    name: "",
    explaination: "",
    emptyField: true,
  });
  const [data, setData] = useState(Data);

  const columns = useMemo(
    () => [
      { Header: "Social Medya Linki", accessor: "link" },
      {
        Header: "Social Medya Adı",
        accessor: "name",
      },
      { Header: "Açıklama", accessor: "explaination" },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    prepareRow,
    state,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageOptions,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);
  const { globalFilter, pageIndex } = state;

  //ekelme fonksyonu, adding value
  function add(e) {
    const { link, name, explaination } = info;
    e.preventDefault();
    if (!link || !name || !explaination) {
      return;
    }
    // ozel kullanıcı kimliği oluşturma
    const id = Date.now();
    const inputData = { id, link, name, explaination };
    const newValue = [inputData, ...data];
    setData(newValue);

    // localstorage'a veri gönderme
    localStorage.setItem("items", JSON.stringify(newValue));

    // başlangıç ​​durumuna ayarla // set them to initial state
    setInfo({
      link: "",
      name: "",
      explaination: "",
    });
  }

  // localStorage'dan veri alma
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("items"));
    if (items) {
      setData(items);
    }
  }, []);
  return (
    <div className="home">
      <div className="homeDiv">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <Form info={info} setInfo={setInfo} onAdd={add} />
      </div>

      {/* table tablo dosyası */}
      <div className="home-table">
        <Table
          useSortBy={useSortBy}
          getTableProps={getTableProps}
          getTableBodyProps={getTableBodyProps}
          headerGroups={headerGroups}
          page={page}
          prepareRow={prepareRow}
        />
      </div>
      {/* bottom */}
      <div className="bottom">
        {/* left */}
        <div className="left">
          <span className="show">
            Show:
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
              style={{
                width: "50px",
                backgroundColor: "white",
                color: "black",
              }}
            />
          </span>
        </div>
        {/* right */}
        <div className="right">
          <button
            className={canPreviousPage ? "prevBtn col" : ""}
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <span>
            <span
              className={
                canPreviousPage ? "prevBtn controlsBtns btnsColor" : ""
              }
            >
              {" "}
              {pageIndex + 1}
            </span>{" "}
            of{" "}
            <span
              className={
                canNextPage ? "nextBtn controlsBtns btnsColor" : "gray"
              }
              disabled={!canNextPage}
            >
              {pageOptions.length}
            </span>
          </span>
          <button
            className={canNextPage ? "nextBtn col" : ""}
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
