import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, useTheme } from "@mui/material";
import Dropdown from "react-bootstrap/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DownloadOutlined } from "@mui/icons-material";
import { Button } from "react-bootstrap";
import { DataGridCustomToolbar } from "components";

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

  const columns = [
    {
      field: "_id",
      headerName: "LicensePlate",
      flex: 1,
      valueGetter: (params) => params.row.licensePlate,
    },
    {
      field: "userId",
      headerName: "Make",
      flex: 0.5,
      valueGetter: (params) => params.row.make,
    },
    {
      field: "createdAt",
      headerName: "Model",
      flex: 1,
      valueGetter: (params) => params.row.model,
    },
    {
      field: "products",
      headerName: "Type",
      flex: 0.5,
      sortable: false,
      valueGetter: (params) => params.row.type,
    },
    {
      field: "cost",
      headerName: "MilesDriven",
      flex: 1,
      valueGetter: (params) => params.row.milesDriven,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  // Sample data for demonstration
  const sampleData = [
    {
      id: 1,
      licensePlate: "ABC123",
      make: "Toyota",
      model: "Camry",
      type: "Sedan",
      milesDriven: 150,
    },
    {
      id: 2,
      licensePlate: "DEF456",
      make: "Honda",
      model: "Accord",
      type: "Sedan",
      milesDriven: 200,
    },
    {
      id: 3,
      licensePlate: "GHI789",
      make: "Ford",
      model: "F-150",
      type: "Truck",
      milesDriven: 300,
    },
    {
      id: 4,
      licensePlate: "BH8019",
      make: "Ford",
      model: "Mustang",
      type: "Muscle-Car",
      milesDriven: 240,
    },
    {
      id: 5,
      licensePlate: "KA1234",
      make: "Mitsubishi",
      model: "Lancer-Evolution",
      type: "Sedan",
      milesDriven: 300,
    },
    {
      id: 6,
      licensePlate: "BJ1434",
      make: "Opel",
      model: "Speedster",
      type: "Hatchback",
      milesDriven: 300,
    },
    {
      id: 7,
      licensePlate: "AP8745",
      make: "Benz",
      model: "CLK-GTR",
      type: "Sedan",
      milesDriven: 600,
    },
    {
      id: 8,
      licensePlate: "KL6542",
      make: "Konigsegg",
      model: "Jetta",
      type: "Sedan",
      milesDriven: 400,
    },
    {
      id: 9,
      licensePlate: "BH2546",
      make: "Audi",
      model: "Q8",
      type: "SUV",
      milesDriven: 700,
    },
    {
      id: 10,
      licensePlate: "MH7684",
      make: "Mahindra",
      model: "Xylo",
      type: "SUV",
      milesDriven: 900,
    },
  ];

  return (
    <>
      <Box display="flex" justifyContent="flex-start" mb={2}>
        <Dropdown className="d-inline mx-2">
          <Dropdown.Toggle id="dropdown-autoclose-true">Report</Dropdown.Toggle>
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
        <Button
          id="bn"
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
            rows={sampleData}
            columns={columns}
            rowCount={sampleData.length}
            rowsPerPageOptions={[20, 50, 100]}
            pagination
            page={page}
            pageSize={pageSize}
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            getRowId={(row) => row.id} // Custom function to get row id
            components={{ Toolbar: () => null }} // Pass an empty component
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
