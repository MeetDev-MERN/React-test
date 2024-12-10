import React from "react";
import SkeletonTable from "./SkeletonTabel";
import Pagination from "../Pagination/Pagination";
import Input from "../Input/CustomInput";
import CustomDropdown, { Option } from "../Dropdown/CustomDropdown";

interface Column<T> {
  key: keyof T;
  title: string;
  render?: (value: T[keyof T], record: T) => React.ReactNode;
}

interface Filter {
  type: "text" | "dropdown";
  label: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  options?: Option[];
}

interface TableProps<T> {
  data: T[] | undefined;
  columns: Column<T>[];
  filters?: Filter[];
  filterState: Record<string, string | number>;
  setFilterState: React.Dispatch<
    React.SetStateAction<Record<string, string | number>>
  >;
  page: {
    current: number;
    pageSize: number;
  };
  setPage: React.Dispatch<
    React.SetStateAction<{ current: number; pageSize: number }>
  >;
  loading: boolean;
  error?: null | Error;
  onRetry?: () => void;
  handleApplyFilters?: (filters: { [key: string]: string | number }) => void; 
  handleResetFilters?: () => void; 
}

const Table = <T,>({
  data,
  columns,
  filters,
  page,
  setPage,
  filterState,
  setFilterState,
  handleResetFilters,
  loading,
  error,
  onRetry,
  handleApplyFilters,
}: TableProps<T>): JSX.Element => {
  const startIndex = (+page.current - 1) * +page.pageSize;
  const paginatedData =
    data?.slice(startIndex, startIndex + +page.pageSize) || [];

  const handleFilterChange = (label: string, value: string | number) => {
    setFilterState((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const renderCellValue = (value: T[keyof T]): React.ReactNode => {
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      React.isValidElement(value)
    ) {
      return value;
    }
    return null;
  };

  return (
    <div className="table-responsive-container">
      <div className="filters-container">
        <div className="filters-fields">
          {filters &&
            filters.map((filter) => (
              <div key={filter.label} className="filter">
                {filter.type === "text" && (
                  <Input
                    placeholder={filter.label}
                    value={filterState[filter.label] || ""}
                    onChange={(e) =>
                      handleFilterChange(filter.label, e.target.value)
                    }
                    label={filter.label}
                  />
                )}
                {filter.type === "dropdown" && filter.options && (
                  <CustomDropdown
                    label={filter.label}
                    options={filter.options}
                    value={filterState[filter.label] || ""}
                    onChange={(e) => handleFilterChange(filter.label, e)}
                  />
                )}
              </div>
            ))}
        </div>
        <div className="filter-actions">
          <button
            className="filter-button apply-button"
            onClick={() =>
              handleApplyFilters && handleApplyFilters(filterState)
            }
          >
            Apply
          </button>
          <button
            className="filter-button reset-button"
            onClick={handleResetFilters}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="table-container">
        {loading ? (
          <SkeletonTable columns={columns.length} rows={page.pageSize} />
        ) : error ? (
          <div className="error-state">
            <p>{error.message}</p>
          </div>
        ) : paginatedData.length > 0 ? (
          <div className="table-wrapper">
            <table className="responsive-table">
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th key={col.key.toString()}>{col.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((col) => (
                      <td key={col.key.toString()}>
                        {col.render
                          ? col.render(row[col.key], row)
                          : renderCellValue(row[col.key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-data">No data available</div>
        )}
      </div>

     {!loading && data && data?.length>0&& <Pagination
        pageSize={page.pageSize}
        totalPages={data ? Math.ceil(data?.length / page.pageSize) : 0}
        currentPage={page.current}
        onPageSizeChange={(changeSize) =>
          setPage({ ...page, pageSize: changeSize })
        }
        onPageChange={(pageChange) => setPage({ ...page, current: pageChange })}
      />}
    </div>
  );
};

export default Table;
