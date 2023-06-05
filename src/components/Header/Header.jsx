import { Link, useNavigate } from 'react-router-dom';
import './style.scss'
import logo from '../../assets/movix-logo.svg'
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useState, useEffect } from 'react';

const Header = () => {

  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);

  const exploreNav = (type) => {
    navigate(`/explore/${type}`);
    setMobileMenu(false)
  }

  const queryHandler = (e) => {
    (e.key === 'Enter' || e === 'searchBtn' && query.length > 0) && navigate(`/search/${query}`)
  }

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);
  return (
    <header className={`${show}`}>
      <Link to='/'>
        <div className='logo'>
          <img src={logo} alt='logo' />
        </div>
      </Link>
      <div className='navItems'>
        <ul className={`navlist ${mobileMenu && 'mobileItems'}`}>
          <li className='navItem' onClick={() => exploreNav('movie')}>Movies</li>
          <li className='navItem' onClick={() => exploreNav('tv')}>Tv Shows</li>
          {!mobileMenu && <li className="navItem input-wrapper">
            <button className="icon" onClick={() => queryHandler('searchBtn')}>
              <HiOutlineSearch />
            </button>
            <input placeholder="search.." className="searchbar" type="text" onKeyUp={queryHandler} onChange={(e) => setQuery(e.target.value)} />
          </li>}
        </ul>
        <ul className='mobileNavItem'>
          <li className="input-wrapper">
            <button className="icon" onClick={() => queryHandler('searchBtn')}>
              <HiOutlineSearch />
            </button>
            <input placeholder="search.." className="searchbar" type="text" onKeyUp={queryHandler} onChange={(e) => setQuery(e.target.value)} />
          </li>
          <li onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <VscChromeClose /> : <SlMenu />}</li>
        </ul>
      </div>
    </header>
  )
}

export default Header