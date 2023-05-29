import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import './datatable.css';

const DataTable = ({ data, setEditedData }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Price',
        accessor: 'price',
        Cell: ({ row, value }) => (
          <div className="input-container">
            <input
              type="text"
              value={value || ''}
              onChange={(e) => {
                const updatedData = [...data];
                updatedData[row.index].price = e.target.value;
                setEditedData(updatedData);
              }}
            />
            <button
              className="reset-button"
              onClick={() =>
                setEditedData((prevState) => {
                  const updatedData = [...prevState];
                  updatedData[row.index].price = value;
                  return updatedData;
                })
              }
            >
              Reset
            </button>
          </div>
        ),
      },
    ],
    [data, setEditedData]
  );

  const handleSave = () => {
    // Perform save action (e.g., send edited data to server)
    // Here, we'll just log the edited data
    console.log('Edited Data:', data);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [
          {
            id: 'price',
            desc: false,
          },
          {
            id: 'name',
            desc: false,
          },
        ],
      },
    },
    useSortBy
  );

  return (
    <div className="table-container">
      <table className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <span>&darr;</span>
                      ) : (
                        <span>&uarr;</span>
                      )
                    ) : (
                      ''
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default DataTable;
