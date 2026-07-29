import { useState } from 'react';
import { NavLink } from 'react-router';
import { FaLaptopCode, FaTimes, FaBars } from 'react-icons/fa';
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const base = 'transition hover:text-blue-400';
  const active = 'text-blue-400 font-semibold';
  return (
    <nav className='bg-gray-800 border-b border-gray-700 shadow-md sticky top-0 z-50'>
      <div className='max-w-6xl mx-auto px-6 py-4 flex justify-between items-center'>
        <NavLink
          to='/'
          className='flex items-center gap-2 text-lg font-bold text-blue-300'
        >
          <FaLaptopCode className='text-blue-400 text-2xl'></FaLaptopCode>
          <span>The Friendly Developer</span>
        </NavLink>

        {/* Dekstop nav */}
        {/* By adding hidden and md:flex it is visible on dekstop */}
        <div className='hidden md:flex ietms-center gap-6'>
          <div className='space-x-4 text-sm text-gray-300'>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to='/'
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to='/projects'
            >
              Projects
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to='/about'
            >
              About
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to='/blog'
            >
              Blog
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to='/contact'
            >
              Contact
            </NavLink>
          </div>
        </div>
        {/* Mobile Hamburger */}
        {/* By adding hidden on md it is not visible on dekstop */}
        <div className='md:hidden flex items-center gap-4' title='Menu'>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className='text-blue-400 text-xl cursor-pointer'
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {/* Mobile Nav */}
      {menuOpen && (
        <div className='bg-gray-800 border-t border-gray-700 px-6 py-4 space-x-4 space-y-2 text-center md:hidden'>
          <NavLink
            className={({ isActive }) => (isActive ? active : base)}
            to='/'
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? active : base)}
            to='/projects'
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            Projects
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? active : base)}
            to='/about'
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? active : base)}
            to='/blog'
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            Blog
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? active : base)}
            to='/contact'
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            Contact
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
