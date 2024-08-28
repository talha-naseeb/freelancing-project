import React from "react";
import "./style.css";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=''
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ textDecoration: "none" }}
  >
    {children}
    <span className='threedots' />
  </a>
));

export default CustomToggle;
