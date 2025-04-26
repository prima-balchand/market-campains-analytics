import React from "react";
// import PropTypes from "prop-types";

const NetworkPersonaAnalysis = ({
  title = "Network Persona Analysis",
  description = "This section shows persona analysis based on network data.",
  data,
}) => {
  // Group rows by category for rowspan calculation
  const groupedRows = data.rowData.reduce((acc, row) => {
    if (!acc[row.category]) {
      acc[row.category] = [];
    }
    acc[row.category].push(row);
    return acc;
  }, {});

  return (
    <div className="persona-table-container">
      <h3>{title}</h3>
      <div className="interaction-hint">{description}</div>
      <div className="table-responsive">
        <table className="persona-table">
          <thead>
            <tr>
              {data.headerData.map((header) => (
                <th key={header.id}>{header.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rowData.map((row, index) => {
              // Determine if this is the first row of a category group
              const isFirstInCategory =
                row.isFirstInGroup ||
                index === 0 ||
                data.rowData[index - 1].category !== row.category;

              // Calculate rowspan for the category cell
              const rowSpan = isFirstInCategory ? groupedRows[row.category].length : 0;

              return (
                <tr key={row.id}>
                  {isFirstInCategory && (
                    <td rowSpan={rowSpan} style={{ fontWeight: "bold", verticalAlign: "middle" }}>
                      {row.category}
                    </td>
                  )}
                  <td style={{ backgroundColor: row.backgroundColor || "transparent" }}>
                    {row.personaCategory}
                  </td>
                  <td style={{ backgroundColor: row.backgroundColor || "transparent" }}>
                    {row.percentOrders}
                  </td>
                  <td style={{ backgroundColor: row.backgroundColor || "transparent" }}>
                    {row.aovMean}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// NetworkPersonaAnalysis.propTypes = {
//   title: PropTypes.string,
//   description: PropTypes.string,
//   data: PropTypes.shape({
//     headerData: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.string.isRequired,
//         label: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//     rowData: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         category: PropTypes.string.isRequired,
//         personaCategory: PropTypes.string.isRequired,
//         percentOrders: PropTypes.string.isRequired,
//         aovMean: PropTypes.number.isRequired,
//         backgroundColor: PropTypes.string,
//         isFirstInGroup: PropTypes.bool,
//       })
//     ).isRequired,
//   }).isRequired,
// };

export default NetworkPersonaAnalysis;
