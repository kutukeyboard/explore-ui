import React, { useEffect } from "react";

const Table = (props) => {
  useEffect(() => {}, []);

  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          {props.columns &&
            props.columns.map((r, i) => {
              return <th key={i}>{r.header}</th>;
            })}
        </tr>
      </thead>
      <tbody>
        {props.data &&
          props.data.map((r, i) => {
            return (
              <tr key={i}>
                {Object.keys(r).map((item, idx) => {
                  const arr = props.columns.find((x) => x.accessor == item);
                  if (arr != undefined) {
                    return <td key={idx}>{r[item]}</td>;
                  }
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Table;
