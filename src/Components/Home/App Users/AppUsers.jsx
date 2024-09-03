import React, { useState, useEffect } from "react";
import axios from "../../../Api/Api";
import { toast } from "react-toastify";
import { Modal, Button, Form, Accordion } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useTranslation } from "react-i18next";
import Offcanvas from "react-bootstrap/Offcanvas";
import CustomToggle from "../../Custom/CustomToggle/CustomToggle";
import { HiOutlineUsers } from "react-icons/hi2";
import noDocImg from "../../../assets/images/NoDocuments (1).png";
import { FaUserEdit } from "react-icons/fa";
import "./style.css";

function AppUsers() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const token = sessionStorage.getItem("token");

  // Get All App Users API
  const fetchAllAppUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/admin/GetAllAppUsers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.response || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAppUsers();
  }, [token]);

  // Handle Update Button Click
  const handleUpdate = (user) => {
    setSelectedUser(user);
    setFullName(user.fullName);
    setCountryCode(user.countryCode || "");
    setMobileNumber(user.mobileNumber || "");
    setShowOffcanvas(true);
  };

  // Handle User Update Submission
  const handleUpdateUser = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "/api/admin/UpdateAppUser",
        {
          AppUserID: selectedUser.appUserID,
          FullName: fullName,
          CountryCode: countryCode,
          MobileNumber: mobileNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.statusCode === "1") {
        toast.success(t("AppUsers.updateSuccess"));
        fetchAllAppUsers(); // Refresh the user list
        setShowOffcanvas(false); // Close the offcanvas
      } else {
        toast.error(t("AppUsers.updateFailed"));
      }
    } catch (error) {
      toast.error(t("AppUsers.updateError"));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { label: t("tableLabels.appuser"), key: "fullName" },
    { label: t("tableLabels.email"), key: "emailID" },
    { label: t("tableLabels.status"), key: "status" },
    { label: "", key: "actions" },
  ];

  return (
    <div className='mt-3'>
      {loading && (
        <div className='loader-overlay'>
          <div className='loader'></div>
        </div>
      )}

      <Accordion defaultActiveKey='0'>
        <Accordion.Item eventKey='2'>
          <Accordion.Header>
            <div className='d-flex align-items-center gap-3'>
              <HiOutlineUsers size={30} />
              <label style={{ fontSize: "20px", fontWeight: "500" }}>{t("AppUsers.AppUsers")}</label>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <Grid>
              <Grid item xs={12}>
                <div>
                  <TableContainer component={Paper}>
                    <Table style={{ border: "none" }}>
                      <TableHead className=''>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell key={column.label} style={{ backgroundColor: "#F0F3F4" }} className='TableHeaderCell'>
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.length === 0 && (
                          <TableRow>
                            <td colSpan='6' className='p-5 text-center'>
                              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <img alt='iconloading' src={noDocImg} style={{ height: "120px", width: "180px" }} />
                                {t("tableLabels.usernotfound")}
                              </div>
                            </td>
                          </TableRow>
                        )}

                        {data.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell className='TableCell'>{row.fullName}</TableCell>
                            <TableCell className='TableCell'>{row.emailID}</TableCell>
                            <TableCell className='TableCell'>
                              <label
                                style={{
                                  padding: "2px 12px",
                                  borderRadius: "5px",
                                  backgroundColor: row.isActive ? "#00cc4533" : "#eeeeee",
                                  color: "black",
                                }}
                              >
                                {row.isActive ? "Active" : "Inactive"}
                              </label>
                            </TableCell>
                            <TableCell className='py-0'>
                              <Dropdown>
                                <Dropdown.Toggle as={CustomToggle} />
                                <Dropdown.Menu>
                                  <Dropdown.Item className='d-flex gap-2 align-items-center' onClick={() => handleUpdate(row)}>
                                    <FaUserEdit size={22} />
                                    {t("AppUsers.updateUser")}
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </Grid>
            </Grid>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Offcanvas for updating user */}
      <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{t("AppUsers.updateUser")}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group className='mb-3' controlId='formFullName'>
              <Form.Label>{t("userProfile.fullName")}</Form.Label>
              <Form.Control type='text' value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formCountryCode'>
              <Form.Label>{t("SignUp.countryCode")}</Form.Label>
              <Form.Control type='text' value={countryCode} onChange={(e) => setCountryCode(e.target.value)} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formMobileNumber'>
              <Form.Label>{t("userProfile.mobileNumber")}</Form.Label>
              <Form.Control type='text' value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
            </Form.Group>

            <div className='newComment d-flex align-items-center justify-content-between gap-3 w-100 p-3 py-4'>
              <Button className='customerFilterReset' onClick={() => setShowOffcanvas(false)}>
                {t("customerFilter.reset")}
              </Button>
              <Button className='customerFilterBtn' onClick={handleUpdateUser}>
                {t("AppUsers.Update")}
              </Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default AppUsers;
