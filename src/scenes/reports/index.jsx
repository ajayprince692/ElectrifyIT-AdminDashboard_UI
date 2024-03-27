import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, useTheme } from "@mui/material";
import { useGetTransactionsQuery } from "state/api";
import { Header, DataGridCustomToolbar } from "components";
import Dropdown from 'react-bootstrap/Dropdown';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DownloadOutlined } from "@mui/icons-material";
import { Button } from "react-bootstrap";

function DateRangePicker({ startDate, endDate, setStartDate, setEndDate }) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
       Time frames
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <div className="date-picker-container">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="From"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="To"
          />
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}

const Reports = () => {
  const theme = useTheme();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const columns = [
    {
      field: "_id",
      headerName: "LicensePlate",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "Make",
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "Model",
      flex: 1,
    },
    {
      field: "products",
      headerName: "Type",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "MilesDriven",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <>
      <Box display="flex" justifyContent="flex-start" mb={2}>
        <Dropdown className="d-inline mx-2">
          <Dropdown.Toggle id="dropdown-autoclose-true">
            Report
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#">Total miles driven</Dropdown.Item>
            <Dropdown.Item href="#">Energy consumption</Dropdown.Item>
            <Dropdown.Item href="#">Cost analysis</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        
        <Dropdown className="d-inline mx-2" autoClose="inside">
          <Dropdown.Toggle id="dropdown-autoclose-inside">
            Frequency
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#">Daily</Dropdown.Item>
            <Dropdown.Item href="#">Weekly</Dropdown.Item>
            <Dropdown.Item href="#">Monthly</Dropdown.Item>
            <Dropdown.Item href="#">Yearly</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </Box>
      
      <Box display="flex" justifyContent="flex-end">
        {/* Download Reports */}
        <Button id="bn"
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.background.alt,
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary.light,
            },
          }}
        >
          <DownloadOutlined sx={{ mr: "10px" }} />
          Download Reports
        </Button>
      </Box>
      
      <Box m="1.5rem 2.5rem">
        <Header title="REPORTS" subtitle="Entire list of reports" />
        <Box
          height="80vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButtom-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}
            columns={columns}
            rowCount={(data && data.total) || 0}
            rowsPerPageOptions={[20, 50, 100]}
            pagination
            page={page}
            pageSize={pageSize}
            paginationMode="server"
            sortingMode="server"
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSortModelChange={(newSortModel) => setSort(...newSortModel)}
            components={{ Toolbar: DataGridCustomToolbar }}
            componentsProps={{
              toolbar: { searchInput, setSearchInput, setSearch },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Reports;
