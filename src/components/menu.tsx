import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import styled from "styled-components";
import { IoMdPricetag } from "react-icons/io";

const StyledItem = styled(Nav.Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000;
  padding: 10px;
  &:hover {
    background-color: #f0f0f0;
    color: #000;
  }
`;

const StyledTitle = styled.h4`
  margin: 0;
  padding: 20px;
  text-align: center;
  font-size: 1.5rem;
  color: #333;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
`;

interface MenuItemProps {
  icon: React.ReactNode;
  text: string;
  link: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, link }) => (
  <StyledItem as={Link} to={link}>
    {icon}
    <div style={{ marginLeft: "10px" }}>{text}</div>
  </StyledItem>
);

export default function Menu() {
  return (
    <div className="d-flex flex-column flex-shrink-0 bg-light" style={{ width: "250px", height: "100vh" }}>
      <StyledTitle>IBilling</StyledTitle>
      <Nav className="flex-column">
        <MenuItem icon={<FaHome />} text="Dashboard" link="/dashboard" />
        <MenuItem icon={<IoMdPricetag />} text="Preços" link="/prices" />
      </Nav>
    </div>
  );
}
