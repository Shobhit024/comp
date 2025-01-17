import React, { useState, useEffect } from "react";
import "./tablePage.css";
import table from "../assets/table.png";
import puzzle from "../assets/puzzle.png";
import intersect from "../assets/intersect.png";
import star from "../assets/star.png";
import icon from "../assets/icon.png";
import credit from "../assets/credit.png";
import Frame from "../assets/Frame.png";
import {
  FaShareAlt,
  FaDownload,
  FaTrash,
  FaArrowLeft,
  FaColumns,
  FaFilter,
  FaSort,
  FaSearch,
  FaUser,
  FaAlignJustify,
} from "react-icons/fa";

const TablePage = () => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("tableData");
    return savedData
      ? JSON.parse(savedData)
      : [
          {
            input: "Oct 12, 2024 at 14:08 PM",
            action: "Bitscale Evaluation - Account relevancy check",
            enrich: "Bitscale Evaluation - Account relevancy check",
          },
          {
            input: "Oct 12, 2024 at 15:08 PM",
            action: "New Task Evaluation",
            enrich: "Task Evaluation Completed",
          },
          {
            input: "Oct 12, 2024 at 14:08 PM",
            action: "cell data size exceeds limit",
            enrich: "BMW Evaluation - Relevancy check.csv",
          },
          {
            input: "Oct 12, 2024 at 14:08 PM",
            action: "https://www.linkedIn.com/bitScale.ai/sample",
            enrich: "Google Evaluation - Lilevancy check.csv",
          },
          {
            input: "Oct 12, 2024 at 14:08 PM",
            action: "Loading data, Please wait",
            enrich: "Apple Evaluation - Olvancy check.csv",
          },
          {
            input: "Oct 12, 2024 at 14:08 PM",
            action: "Loading data, Please wait",
            enrich: "Figma Evaluation - Evancy check.csv",
          },
        ];
  });

  const [autoSave, setAutoSave] = useState(true);
  const [columns, setColumns] = useState(["input", "action", "enrich"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    if (autoSave) {
      localStorage.setItem("tableData", JSON.stringify(data));
    }
  }, [data, autoSave]);

  const isTableComplete = () => {
    return data.every((row) =>
      columns.every((col) => row[col] && row[col].trim() !== "")
    );
  };

  const addRow = () => {
    if (isTableComplete()) {
      const newRow = columns.reduce((acc, col) => ({ ...acc, [col]: "" }), {});
      setData([...data, newRow]);
    } else {
      alert("Please fill in the existing rows before adding a new row.");
    }
  };

  const addColumn = () => {
    const newColumn = prompt("Enter column name:");
    if (newColumn && !columns.includes(newColumn)) {
      const enrichIndex = columns.indexOf("enrich");
      const newColumns = [
        ...columns.slice(0, enrichIndex + 1),
        newColumn,
        ...columns.slice(enrichIndex + 1),
      ];
      setColumns(newColumns);
      setData(data.map((row) => ({ ...row, [newColumn]: "" })));
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index][field] = value;
    setData(updatedData);
  };

  const toggleAutoSave = () => {
    setAutoSave((prev) => !prev);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((row) =>
    columns.some((col) =>
      row[col].toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortData = (col) => {
    const order = sortColumn === col && sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(order);
    setSortColumn(col);
    const sortedData = [...data].sort((a, b) => {
      if (a[col] < b[col]) return order === "asc" ? -1 : 1;
      if (a[col] > b[col]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };

  const shareFile = () => alert("File shared successfully!");
  const downloadFile = () => alert("File downloaded successfully!");
  const deleteFile = () => setData([]);

  const filterCount = searchTerm ? 1 : 0;
  const sortCount = sortColumn ? 1 : 0;

  return (
    <div className="table-page">
      <header className="head">
        <div className="left1">
          <FaArrowLeft
            size={12}
            style={{ cursor: "pointer", marginRight: "8px" }}
          />
          <input className="left" type="text" placeholder=" Name of the file" />
        </div>
        <div className="autosave">
          <input
            type="checkbox"
            className="checkbox"
            checked={autoSave}
            onChange={toggleAutoSave}
          />
          <label className="label">
            <span className="slider"></span>
          </label>
          <span>Auto Save</span>
          <FaUser
            className="faUser"
            size={12}
            style={{
              color: "red",
              border: "transparent",
              borderStyle: "solid",
              borderRadius: "100%",
              background: "#FEECDC",
              padding: "5px",
            }}
          />
        </div>
      </header>

      <div className="section">
        <div className="searchsection">
          <FaSearch className="search-icon" size={12} />
          <input
            className="searchbox"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <p className="feature">
            <FaAlignJustify size={12} />
            {`${filteredData.length}/${data.length} rows`}
          </p>
          <p className="feature">
            <FaColumns size={12} />
            {`${columns.length}/${data.length} columns`}
          </p>
          <p className="feature">
            <FaFilter size={12} />
            {`${filterCount} filter(s)`}
          </p>
          <p className="feature">
            <FaSort size={12} />
            {`${sortCount} sort(s)`}
          </p>
        </div>
        {/* Right Side Section */}
        <div className="rightside">
          <button className="enrich-btn">
            <img
              src={star}
              alt="button icon"
              style={{ width: "10px", marginRight: "8px" }}
            />
            Enrich
          </button>
          <FaShareAlt className="icon" onClick={shareFile} />
          <FaDownload className="icon" onClick={downloadFile} />
          <FaTrash
            className="icon"
            style={{ color: "red" }}
            onClick={deleteFile}
          />
        </div>
      </div>

      <div className="layout">
        <aside className="sidebar">
          <div className="topimg">
            <img src={table} alt="table" />
            <img src={puzzle} alt="puzzle" />
            <img src={intersect} alt="intersect" />
          </div>
          <div className="bottomimg">
            <img src={icon} alt="icon" />
            <img src={credit} alt="credit" />
          </div>
        </aside>

        <main className="main-content">
          <div className="table-container">
            <table className="fulltable">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  {columns.map((col, index) => (
                    <th key={index} onClick={() => sortData(col)}>
                      {col}{" "}
                      {sortColumn === col
                        ? sortOrder === "asc"
                          ? "↑"
                          : "↓"
                        : ""}
                    </th>
                  ))}
                  <th>
                    <button className="add-column" onClick={addColumn}>
                      + Add Column
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={Frame}
                        alt="row image"
                        style={{ width: "20px", height: "20px" }}
                      />
                    </td>
                    {columns.map((col) => (
                      <td key={col}>
                        <input
                          type="text"
                          value={row[col]}
                          onChange={(e) =>
                            handleInputChange(index, col, e.target.value)
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="add-row" onClick={addRow}>
              + Add Row
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TablePage;
