import React, { useEffect, useState } from "react";

const Table = (props) => {
  const [mobile, setMobile] = useState();
  const [data, setData] = useState(props.data);
  const [sortDir, setSortDir] = useState("asc");
  const [lastSort, setLastSort] = useState("");
  const checkWindowSize = () => {
    if (window.innerWidth > 719) {
      setMobile(false);
    } else {
      setMobile(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", checkWindowSize);
    checkWindowSize();
    return () => window.removeEventListener("resize", checkWindowSize);
  }, [checkWindowSize]);

  const sortTable = (e) => {
    e.preventDefault();

    const arr = props.columns.find((x) => x.header == e.target.innerHTML)
      .accessor;
    let temp;

    if (lastSort != e.target.innerHTML) {
      // setSortDir("asc");
      setSortDir("desc");
      e.target.className = "asc";
      temp = [...data].sort((a, b) => {
        if (a[arr] < b[arr]) return -1;
        if (a[arr] > b[arr]) return 1;
        return 0;
      });
    } else {
      if (sortDir == "asc") {
        setSortDir("desc");
        e.target.className = "asc";
        temp = [...data].sort((a, b) => {
          if (a[arr] < b[arr]) return -1;
          if (a[arr] > b[arr]) return 1;
          return 0;
        });
      } else {
        setSortDir("asc");
        e.target.className = "desc";
        temp = [...data].reverse();
      }
    }
    setLastSort(e.target.innerHTML);

    setData(temp);
  };

  const doFilter = (e) => {
    e.preventDefault();
    if (e.target.value.length == 0) {
      setData(props.data);
    } else {
      const temp = [...data].filter(
        (x) =>
          x[e.target.id].toLowerCase().indexOf(e.target.value.toLowerCase()) >
          -1
      );
      setData(temp);
    }
  };

  return (
    <table>
      {!mobile && (
        <thead>
          <tr>
            {props.columns &&
              props.columns.map((r, i) => {
                return (
                  <th className="asc" key={i} onClick={sortTable}>
                    {r.header}
                  </th>
                );
              })}
          </tr>
          <tr>
            {props.columns &&
              props.columns.map((r, i) => {
                return (
                  <td key={i}>
                    <input
                      type="text"
                      id={r.accessor}
                      placeholder={"filter " + r.header}
                      onChange={doFilter}
                    />
                  </td>
                );
              })}
          </tr>
        </thead>
      )}

      <tbody>
        {data &&
          data.map((r, i) => {
            return (
              <tr key={i}>
                {mobile ? (
                  <td>
                    <table>
                      <tbody>
                        {Object.keys(r).map((item, idx) => {
                          const arr = props.columns.find(
                            (x) => x.accessor == item
                          );
                          if (arr != undefined) {
                            return (
                              <tr key={idx}>
                                <td className="exData" style={{ width: "25%" }}>
                                  <strong>{arr.header}</strong>
                                </td>
                                <td className="exData">{r[item]}</td>
                              </tr>
                            );
                          }
                        })}
                      </tbody>
                    </table>
                  </td>
                ) : (
                  Object.keys(r).map((item, idx) => {
                    const arr = props.columns.find(
                      (x) => x.type == "data" && x.accessor == item
                    );
                    if (arr != undefined) {
                      return (
                        <td className="exData" key={idx}>
                          {r[item]}
                        </td>
                      );
                    }
                  })
                )}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Table;
