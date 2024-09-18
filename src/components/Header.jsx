// Header.jsx
import React from 'react';
import techmaghi from '../assets/techmaghi.png';

const Header = () => {
  // const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate('/');
  // };

  return (
    <header className="bg-gray-200 p-4 flex justify-center items-center">
      <img
        src={techmaghi} // Replace with the path to your PNG image
        alt="Techmaghi Logo"
        className="w-52 h-auto cursor-pointer" // Add cursor-pointer to indicate it's clickable
        // onClick={handleClick}
      />
    </header>
  );
};

export default Header;

