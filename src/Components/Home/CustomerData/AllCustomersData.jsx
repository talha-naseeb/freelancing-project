import React, { useEffect, useState } from "react";
import axios from "../../../Api/Api";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Stack, Pagination } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./style.css";
import CustomerFilter from "./CustomerFilter";
import noDocImg from "../../../assets/images/NoDocuments (1).png";
import CustomToggle from "../../Custom/CustomToggle/CustomToggle";
import { Dropdown } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const AllCustomersData = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [licenseNo, setLicenseNo] = useState("");
  const [propertyNo, setPropertyNo] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [city, setcity] = useState("");
  const [district, setDistrict] = useState("");
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //Get All customers  api
  const fetchAllCustomersData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/admin/GetAllCustomers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data.response || []);
      setSearchResults(response.data.response || []);

      setLoading(false);
    } catch (error) {
      console.error(t("dashboardCardStatuses.errorfetchingUserData"));
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCustomersData();
  }, [token]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      let response;
      if (name || mobileNo || licenseNo || propertyNo || propertyType || city || district) {
        response = await axios.get("/api/admin/GetAllCustomers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            name: name,
            mobileNo: mobileNo,
            licenseNo: licenseNo,
            propertyNo: propertyNo,
            propertyType: propertyType,
            city: city,
            district: district,
          },
        });
      }
      setSearchResults(response.data.response || []);
      setLoading(false);
    } catch (error) {
      console.error(t("dashboardCardStatuses.errorfetchingUserData"));
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setName("");
    setMobileNo("");
    setLicenseNo("");
    setPropertyNo("");
    setPropertyType("");
    setcity("");
    setDistrict("");
    fetchAllCustomersData();
  };

  const handleDownload = async (customerID, customerName) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/prop/GenerateCustomerPdf?customerID=${customerID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "arraybuffer",
      });

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${customerName}-document.pdf`);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
      } else {
        toast.error(t("tableLabels.downloadError"));
      }
    } catch (error) {
      console.error(t("tableLabels.downloadError"), error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (customerID) => {
    navigate(`/customer-details/${customerID}`);
  };

  const columns = [
    { label: t("tableLabels.name"), key: "name" },
    { label: t("tableLabels.mobileNo"), key: "mobileNo" },
    { label: t("tableLabels.licenceNo"), key: "licenceNo" },
    { label: t("tableLabels.AdvertisementDate"), key: "advertisementDate" },
    { label: t("tableLabels.propertyType"), key: "propertyType" },
    { label: t("tableLabels.propertyNo"), key: "propertyNo" },
    { label: t("tableLabels.city"), key: "city" },
    { label: t("tableLabels.district"), key: "district" },
    { label: "", key: "actions" },
  ];

  const formatDate = (dateString) => {
    const timestamp = parseInt(dateString.match(/\d+/)[0]);

    if (isNaN(timestamp)) {
      return "";
    }
    const date = new Date(timestamp);

    // Format the date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    const formattedMinutes = (minutes < 10 ? "0" : "") + minutes;

    return `${day}/${month}/${year} - ${hours}:${formattedMinutes} ${ampm}`;
  };

  const handleCellClick = (event) => {
    const cell = event.target;
    cell.classList.toggle("scrollable");
  };

  return (
    <Grid className='container mt-3'>
      <Grid>
        {/* Loader overlay */}
        {loading && (
          <div className='loader-overlay'>
            <div className='loader'></div>
          </div>
        )}

        <div className='py-3 p-3 container pendingtable '>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label className='fs-16'>{t("CustomersData.CustomerData")}</label>

            <div className='search-filters-container'>
              <CustomerFilter
                name={name}
                mobileNo={mobileNo}
                licenseNo={licenseNo}
                propertyNo={propertyNo}
                propertyType={propertyType}
                city={city}
                district={district}
                setName={setName}
                setMobileNo={setMobileNo}
                setLicenseNo={setLicenseNo}
                setPropertyNo={setPropertyNo}
                setPropertyType={setPropertyType}
                setcity={setcity}
                setDistrict={setDistrict}
                handleSearch={handleSearch}
                clearSearch={clearSearch}
              />
            </div>
          </div>
          {/* Table */}
          <TableContainer component={Paper} style={{ height: "70vh" }}>
            <Table style={{ border: "none" }}>
              {/* Table Headers */}
              <TableHead style={{}}>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.label}
                      style={{
                        background:
                          "linear-gradient(41deg, rgba(0, 0, 0, 1) 2%, rgba(74, 24, 24, 1) 16%, rgba(0, 0, 0, 1) 33%, rgba(94, 33, 33, 1) 50%, rgba(0, 0, 0, 1) 63%, rgba(70, 23, 23, 1) 76%, rgba(19, 1, 1, 1) 87%)",
                        color: "white",
                      }}
                      className='TableHeaderCell'
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              {/* Table Body */}
              <TableBody>
                {searchResults.length === 0 && (
                  <TableRow>
                    <td colSpan='12' className='p-5 text-center'>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <img alt='imageLoading' src={noDocImg} style={{ height: "120px", width: "180px" }} />
                        {t("tableLabels.notDocsFound")}
                      </div>
                    </td>
                  </TableRow>
                )}

                {searchResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className='TableCell truncate-cell' onClick={(e) => handleCellClick(e)}>
                      {row.name}
                    </TableCell>
                    <TableCell className='TableCell'>{row.mobileNo}</TableCell>
                    <TableCell className='TableCell'>{row.licenceNo}</TableCell>
                    <TableCell className='TableCell'>{row.advertisementDate ? formatDate(row.advertisementDate) : ""}</TableCell>
                    <TableCell onClick={(e) => handleCellClick(e)} className='TableCell truncate-cell'>
                      {row.propertyType}
                    </TableCell>
                    <TableCell onClick={(e) => handleCellClick(e)} className='TableCell truncate-cell'>
                      {row.propertyNo}
                    </TableCell>
                    <TableCell className='TableCell'>{row.city}</TableCell>
                    <TableCell className='TableCell'>{row.district}</TableCell>
                    <TableCell className='py-0'>
                      <Dropdown>
                        <Dropdown.Toggle as={CustomToggle} />
                        <Dropdown.Menu>
                          <Dropdown.Item className='d-flex align-items-center gap-2' onClick={() => handleViewDetails(row.customerID)}>
                            <FaUser size={20} />
                            {t("CustomersData.CustomerDetails")}
                          </Dropdown.Item>
                          <Dropdown.Item className='d-flex align-items-center gap-2' onClick={() => handleDownload(row.customerID, row.name)}>
                            <BsDownload size={20} />
                            {t("CustomersData.Download")}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
            <div className='showHideNoDocs'>
              {page * rowsPerPage + 1} - {Math.min((page + 1) * rowsPerPage, data.length)} {t("tableLabels.documentsof")} {data.length} {t("tableLabels.document")}
            </div>
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(data.length / rowsPerPage)}
                variant='outlined'
                shape='rounded'
                page={page + 1}
                onChange={(event, newPage) => handleChangePage(event, newPage - 1)}
                sx={{ "& .Mui-selected": { background: "rgb(74, 24, 24) !important", color: "white" } }}
              />
            </Stack>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default AllCustomersData;
