import { Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";
import "./menu.scss";
import { useState } from "react";
import ActivateEventsModal from "./active-events-modal";

interface MenuItemProps {
  icon: React.ReactNode;
  text: string;
  link: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, link }) => (
  <Nav.Link as={Link} to={link} className="menu-item">
    <div className="menu-item-icon">{icon}</div>
    {text}
  </Nav.Link>
);

export default function Menu() {

  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className="menu-container">
      <h4 className="menu-title">IBilling</h4>
      <Nav className="menu-items">
        <MenuItem icon={<FaHome />} text="Home" link="/home" />
        <MenuItem icon={<IoMdPricetag />} text="Preços" link="/prices" />
      </Nav>
      <div className="menu-footer">
        <ActivateEventsModal show={showModal} handleClose={handleClose} />
        <Button variant="warning" onClick={handleOpen}>Ativar Eventos</Button>
      </div>
      <div className="menu-footer">
        <p className="menu-user">Luiz Felipe</p>
        <Button variant="danger">Logoff</Button>
      </div>
    </div>
  );
}
