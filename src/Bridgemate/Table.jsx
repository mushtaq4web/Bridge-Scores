import React from 'react'

const Table = ({ tableData }) => {
  return (
    <div className="table-container">
    <h2>Score Table</h2>
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        textAlign: "left",
      }}
    >
      <thead>
        <tr>
          <th style={{ border: "1px solid black", padding: "8px" }}>
            ROUND
          </th>
          <th style={{ border: "1px solid black", padding: "8px" }}>
            N/S PAIR NUMBER
          </th>
          <th style={{ border: "1px solid black", padding: "8px" }}>
            E/W PAIR NUMBER
          </th>
          <th style={{ border: "1px solid black", padding: "8px" }}>
            BOARD
          </th>
          <th style={{ border: "1px solid black", padding: "8px" }}>
            CONTRACT
          </th>
          <th style={{ border: "1px solid black", padding: "8px" }}>
            RESULT
          </th>
          <th style={{ border: "1px solid black", padding: "8px" }}>
            DIRECTION
          </th>
          <th style={{ border: "1px solid black", padding: "8px" }}>
            SCORE
          </th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {row.rounds}
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {row.nsPair}
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {row.ewPair}
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {row.SelectedBoard}
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {row.contract.number}{" "}
              {row.contract.suitImage === "NT" ? (
                <span style={{ fontWeight: "bold" }}>NT</span> // Show NT as text
              ) : (
                row.contract.suitImage && (
                  <img
                    src={row.contract.suitImage}
                    alt="Suit"
                    style={{
                      height: 20,
                      width: 20,
                      verticalAlign: "middle",
                    }}
                  />
                )
              )}
              {row.contract.doubling && (
                <span
                  style={{
                    color: row.contract.doubling === "X" ? "red" : "blue",
                    fontWeight: "bold",
                    marginLeft: "5px",
                  }}
                >
                  {row.contract.doubling}
                </span>
              )}
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {row.displayResult}
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {row.direction}
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {row.result}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default Table
