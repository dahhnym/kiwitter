import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { IoPersonCircleOutline, IoPersonCircleSharp } from 'react-icons/io5';
import { RiBookmarkFill, RiBookmarkLine } from 'react-icons/ri';
import { Logo } from 'routes/Auth';

const Navigation = () => {
  return (
    <Nav>
      <Logo
        src={`${process.env.PUBLIC_URL}/logo.png`}
        alt="kiwitter logo"
        size="3rem"
        marginBottom="3rem"
      />
      <ul>
        <li>
          <AiFillHome />
          <AiOutlineHome />
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">
            <IoPersonCircleOutline />
            <IoPersonCircleSharp />
            Profile
          </Link>
        </li>
        <li>
          <Link to="/bookmark">
            <RiBookmarkFill />
            <RiBookmarkLine />
            Bookmark
          </Link>
        </li>
        <li>
          <Logo
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="kiwitter logo"
            size="1rem"
            marginBottom="3rem"
          />
          My Account
        </li>
      </ul>
    </Nav>
  );
};

export default Navigation;

const Nav = styled.nav`
  min-width: max-content;
  box-sizing: border-box;
  padding: 1rem;
  font-size: 1.2rem;
  background-color: #fff;
`;
