import './TabelStyle.css'
const SkeletonTable: React.FC<{ columns: number; rows: number }> = ({
    columns,
    rows,
  }) => (
    <table className="responsive-table">
      <thead>
        <tr>
          {Array.from({ length: columns }).map((_, index) => (
            <th key={index}>
              <div className="skeleton skeleton-header" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <td key={colIndex}>
                <div className="skeleton skeleton-cell" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  export default SkeletonTable;