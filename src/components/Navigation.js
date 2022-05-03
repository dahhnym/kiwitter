import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { IoPersonCircleOutline, IoPersonCircleSharp } from 'react-icons/io5';
import { Logo } from 'routes/Auth';

const Navigation = () => {
  const location = useLocation();

  return (
    <header>
      <Nav>
        <Logo
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="kiwitter logo"
          size="3rem"
          marginBottom="3rem"
          marginLeft="0.5rem"
        />
        <ul>
          <MenuItem>
            <Link to="/">
              {location.pathname === '/' ? <AiFillHome /> : <AiOutlineHome />}
              <MenuName>Home</MenuName>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/profile">
              {location.pathname === '/profile' ? (
                <IoPersonCircleSharp />
              ) : (
                <IoPersonCircleOutline />
              )}
              <MenuName>Profile</MenuName>
            </Link>
          </MenuItem>
        </ul>
      </Nav>
    </header>
  );
};

export default Navigation;

const Nav = styled.nav`
  padding: 1.3rem;
  font-size: 1.2rem;
  box-sizing: border-box;
  min-width: max-content;
`;

const MenuItem = styled.li`
  box-sizing: border-box;
  padding: 0.5rem 1.2rem;
  &:hover {
    background-color: #eee;
    border-radius: 1.5rem;
  }
`;

const MenuName = styled.span`
  margin-left: 0.3rem;
  line-height: 2rem;
`;
