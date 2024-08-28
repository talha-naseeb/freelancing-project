// import React, { useEffect, useState } from "react";
// import axios from "../../Api/Api";
// import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Stack, Pagination } from "@mui/material";
// import { useTranslation } from "react-i18next";
// import "./style.css";
// import CustomerFilter from "./CustomerFilter";
// import noDocImg from "../../assets/images/NoDocuments (1).png";
// import HeaderLogin from "../Header/HeaderLogin";
// import CustomToggle from "../Custom/CustomToggle/CustomToggle";
// import { Dropdown, Modal } from "react-bootstrap";
// import Imagenotfound from "../../assets/images/Image_not_available.png";

// const AllCustomersData = () => {
//   const { t } = useTranslation();
//   const [data, setData] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(30);
//   const [name, setName] = useState("");
//   const [mobileNo, setMobileNo] = useState("");
//   const [licenseNo, setLicenseNo] = useState("");
//   const [propertyNo, setPropertyNo] = useState("");
//   const [propertyType, setPropertyType] = useState("");
//   const [city, setcity] = useState("");
//   const [district, setDistrict] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   const token = sessionStorage.getItem("token");
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   //Get All customers  api
//   const fetchAllCustomersData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("/Customers/GetAllCustomers", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setData(response.data.Data || []);
//       setSearchResults(response.data.Data || []);

//       setLoading(false);
//     } catch (error) {
//       console.error(t("dashboardCardStatuses.errorfetchingUserData"));
//       setLoading(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllCustomersData();
//   }, [token]);

//   const handleSearch = async () => {
//     setLoading(true);
//     try {
//       let response;
//       if (name || mobileNo || licenseNo || propertyNo || propertyType || city || district) {
//         response = await axios.get("/Customers/GetAllCustomers", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           params: {
//             name: name,
//             mobileNo: mobileNo,
//             licenseNo: licenseNo,
//             propertyNo: propertyNo,
//             propertyType: propertyType,
//             city: city,
//             district: district,
//           },
//         });
//       }
//       setSearchResults(response.data.Data || []);
//       setLoading(false);
//     } catch (error) {
//       console.error(t("dashboardCardStatuses.errorfetchingUserData"));
//       setLoading(false);
//     }
//   };

//   const clearSearch = () => {
//     setName("");
//     setMobileNo("");
//     setLicenseNo("");
//     setPropertyNo("");
//     setPropertyType("");
//     setcity("");
//     setDistrict("");
//     // handleSearch();
//     fetchAllCustomersData();
//   };
//    const handleModalClose = () => setShowModal(false);
//    const handleModalShow = () => setShowModal(true);

//   const columns = [
//     { label: t("tableLabels.name"), key: "Name" },
//     { label: t("tableLabels.mobileNo"), key: "MobileNo" },
//     { label: t("tableLabels.licenceNo"), key: "LicenceNo" },
//     { label: t("tableLabels.AdvertisementDate"), key: "AdvertisementDate" },
//     { label: t("tableLabels.propertyType"), key: "propertyType" },
//     { label: t("tableLabels.propertyNo"), key: "propertyNo" },
//     { label: t("tableLabels.city"), key: "city" },
//     { label: t("tableLabels.district"), key: "district" },
//     { label: "", key: "actions" },
//   ];

//   const formatDate = (dateString) => {
//     const timestamp = parseInt(dateString.match(/\d+/)[0]);

//     if (isNaN(timestamp)) {
//       return "";
//     }
//     const date = new Date(timestamp);

//     // Format the date
//     const day = date.getDate();
//     const month = date.getMonth() + 1;
//     const year = date.getFullYear();
//     let hours = date.getHours();
//     const minutes = date.getMinutes();

//     const ampm = hours >= 12 ? "PM" : "AM";
//     hours = hours % 12 || 12;

//     const formattedMinutes = (minutes < 10 ? "0" : "") + minutes;

//     return `${day}/${month}/${year} - ${hours}:${formattedMinutes} ${ampm}`;
//   };

//   const handleCellClick = (event) => {
//     const cell = event.target;
//     cell.classList.toggle("scrollable");
//   };

//   return (
//     <Grid className='MainDiv'>
//       <HeaderLogin />
//       <Grid className='container'>
//         {/* Loader overlay */}
//         {loading && (
//           <div className='loader-overlay'>
//             <div className='loader'></div>
//           </div>
//         )}

//         <div className=' customerDataTable'>
//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <label className='fs-16'></label>

//             <div className='search-filters-container'>
//               <CustomerFilter
//                 name={name}
//                 mobileNo={mobileNo}
//                 licenseNo={licenseNo}
//                 propertyNo={propertyNo}
//                 propertyType={propertyType}
//                 city={city}
//                 district={district}
//                 setName={setName}
//                 setMobileNo={setMobileNo}
//                 setLicenseNo={setLicenseNo}
//                 setPropertyNo={setPropertyNo}
//                 setPropertyType={setPropertyType}
//                 setcity={setcity}
//                 setDistrict={setDistrict}
//                 handleSearch={handleSearch}
//                 clearSearch={clearSearch}
//               />
//             </div>
//           </div>
//           {/* Table */}
//           <TableContainer component={Paper} style={{ height: "70vh" }}>
//             <Table style={{ border: "none" }}>
//               {/* Table Headers */}
//               <TableHead>
//                 <TableRow>
//                   {columns.map((column) => (
//                     <TableCell key={column.label} style={{ backgroundColor: "#1b2020", color: "white" }} className='TableHeaderCell'>
//                       {column.label}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>

//               {/* Table Body */}
//               <TableBody>
//                 {searchResults.length === 0 && (
//                   <TableRow>
//                     <td colSpan='6' className='p-5 text-center'>
//                       <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//                         <img alt='imageLoading' src={noDocImg} style={{ height: "120px", width: "180px" }} />
//                         {t("tableLabels.notDocsFound")}
//                       </div>
//                     </td>
//                   </TableRow>
//                 )}

//                 {searchResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
//                   <TableRow key={index}>
//                     {/* Table Cells */}

//                     <TableCell className='TableCell truncate-cell' onClick={(e) => handleCellClick(e)}>
//                       {row.Name}
//                     </TableCell>
//                     <TableCell className='TableCell'>{row.MobileNo}</TableCell>
//                     <TableCell className='TableCell'>{row.LicenceNo}</TableCell>
//                     <TableCell className='TableCell'>{row.AdvertisementDate ? formatDate(row.AdvertisementDate) : ""}</TableCell>
//                     <TableCell onClick={(e) => handleCellClick(e)} className='TableCell truncate-cell'>
//                       {row.PropertyType}
//                     </TableCell>
//                     <TableCell onClick={(e) => handleCellClick(e)} className='TableCell truncate-cell'>
//                       {row.PropertyNo}
//                     </TableCell>
//                     <TableCell className='TableCell'>{row.City}</TableCell>
//                     <TableCell className='TableCell'>{row.District}</TableCell>

//                     <TableCell className='py-0'>
//                       <Dropdown>
//                         <Dropdown.Toggle as={CustomToggle} />

//                         <Dropdown.Menu>
//                           <Dropdown.Item onClick={handleModalShow}>View Image</Dropdown.Item>
//                         </Dropdown.Menu>
//                       </Dropdown>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* Pagination */}
//           <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
//             <div className='showHideNoDocs'>
//               {page * rowsPerPage + 1} - {Math.min((page + 1) * rowsPerPage, data.length)} {t("tableLabels.documentsof")} {data.length} {t("tableLabels.document")}
//             </div>
//             <Stack spacing={2}>
//               <Pagination
//                 count={Math.ceil(data.length / rowsPerPage)}
//                 variant='outlined'
//                 shape='rounded'
//                 page={page + 1}
//                 onChange={(event, newPage) => handleChangePage(event, newPage - 1)}
//                 sx={{ "& .Mui-selected": { background: "#ff5757 !important", color: "white" } }}
//               />
//             </Stack>
//           </div>
//         </div>
//       </Grid>
//       <Modal show={showModal} onHide={handleModalClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Image Preview</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>

//         </Modal.Body>
//       </Modal>
//     </Grid>
//   );
// };

// export default AllCustomersData;

import React, { useEffect, useState } from "react";
import axios from "../../Api/Api";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Stack, Pagination } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./style.css";
import CustomerFilter from "./CustomerFilter";
import noDocImg from "../../assets/images/NoDocuments (1).png";
import HeaderLogin from "../Header/HeaderLogin";
import CustomToggle from "../Custom/CustomToggle/CustomToggle";
import { Dropdown, Modal, Image } from "react-bootstrap";
import Imagenotfound from "../../assets/images/Image_not_available.png";

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
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const token = sessionStorage.getItem("token");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //Get All customers  api
  const fetchAllCustomersData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/Customers/GetAllCustomers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data.Data || []);
      setSearchResults(response.data.Data || []);

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
        response = await axios.get("/Customers/GetAllCustomers", {
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
      setSearchResults(response.data.Data || []);
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
    // handleSearch();
    fetchAllCustomersData();
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedImage(null); 
  };

  const handleModalShow = (imageUrl) => {
    console.log("image", imageUrl);
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const columns = [
    { label: t("tableLabels.name"), key: "Name" },
    { label: t("tableLabels.mobileNo"), key: "MobileNo" },
    { label: t("tableLabels.licenceNo"), key: "LicenceNo" },
    { label: t("tableLabels.AdvertisementDate"), key: "AdvertisementDate" },
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
    <Grid className='MainDiv'>
      <HeaderLogin />
      <Grid className='container'>
        {/* Loader overlay */}
        {loading && (
          <div className='loader-overlay'>
            <div className='loader'></div>
          </div>
        )}

        <div className=' customerDataTable'>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label className='fs-16'></label>

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
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.label} style={{ backgroundColor: "#1b2020", color: "white" }} className='TableHeaderCell'>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              {/* Table Body */}
              <TableBody>
                {searchResults.length === 0 && (
                  <TableRow>
                    <td colSpan='6' className='p-5 text-center'>
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
                      {row.Name}
                    </TableCell>
                    <TableCell className='TableCell'>{row.MobileNo}</TableCell>
                    <TableCell className='TableCell'>{row.LicenceNo}</TableCell>
                    <TableCell className='TableCell'>{row.AdvertisementDate ? formatDate(row.AdvertisementDate) : ""}</TableCell>
                    <TableCell onClick={(e) => handleCellClick(e)} className='TableCell truncate-cell'>
                      {row.PropertyType}
                    </TableCell>
                    <TableCell onClick={(e) => handleCellClick(e)} className='TableCell truncate-cell'>
                      {row.PropertyNo}
                    </TableCell>
                    <TableCell className='TableCell'>{row.City}</TableCell>
                    <TableCell className='TableCell'>{row.District}</TableCell>
                    <TableCell className='py-0'>
                      {/* <Dropdown>
                        <Dropdown.Toggle as={CustomToggle} />
                        <Dropdown.Menu>
                          {Object.keys(row).map((key) => {
                            if (key.startsWith("Image") && row[key] !== null) {
                              const imageUrl = row[key];
                              const startIndex = imageUrl.indexOf("api-dev.yallahmotora.com");
                              const formattedUrl = imageUrl.substring(startIndex);
                              return (
                                <Dropdown.Item key={key} onClick={() => handleModalShow(formattedUrl)}>
                                  View Image
                                </Dropdown.Item>
                              );
                            }
                            return null;
                          })}
                        </Dropdown.Menu>
                      </Dropdown> */}
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
                sx={{ "& .Mui-selected": { background: "#ff5757 !important", color: "white" } }}
              />
            </Stack>
          </div>
        </div>
      </Grid>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Image Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <embed src={selectedImage} type='application/pdf' width='100%' height='500px' />
        </Modal.Body>
      </Modal>
    </Grid>
  );
};

export default AllCustomersData;
