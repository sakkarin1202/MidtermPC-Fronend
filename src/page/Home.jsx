import React from "react";
import Laptop from "../assets/images/laptop.png";
import PC from "../assets/images/PC.png";
import Mobile from "../assets/images/Mobile.png";
import Tablet from "../assets/images/Tablet.png";
import Footer from "./Footer";

const data = [
  {
    id: 1,
    title: "PC",
    img: PC,
    description: "High performance desktop computer suitable for gaming and productivity.",
    rating: 5,
  },
  {
    id: 2,
    title: "Laptop",
    img: Laptop,
    description: "Lightweight laptop for work and leisure with long battery life.",
    rating: 4, 
  },
  {
    id: 3,
    title: "Mobile",
    img: Mobile,
    description: "Smartphone with a stunning display and excellent camera.",
    rating: 4, 
  },
  {
    id: 4,
    title: "Tablet",
    img: Tablet,
    description: "Versatile tablet for both entertainment and productivity.",
    rating: 3.5, 
  },
];

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const stars = [];

  for (let i = 0; i < 5; i++) { 
    if (i < fullStars) {
      stars.push(<span key={i} className="text-yellow-400">★</span>); 
    } else if (i === fullStars && halfStar) {
      stars.push(<span key={i} className="text-red-400">☆</span>); 
    } else {
      stars.push(<span key={i} className="text-gray-300">☆</span>); 
    }
  }

  return stars;
};

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="navbar bg-gradient-to-r from-gray-800 to-gray-500 shadow-lg rounded-lg mb-2 p-4">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost normal-case text-2xl text-lime-500">Digital Hub</a>
        </div>
        <div className="flex-none justify-end space-x-4">
          <a href="/signin" className="btn btn-outline btn-light text-white border-white hover:bg-white hover:text-gray-800 transition">Sign in</a>
          <a href="/signup" className="btn btn-primary">Sign up</a>
        </div>
      </nav>

      {/* Main Section */}
      <section className="flex flex-col items-center justify-start flex-grow p-6"> 
      <h1 className="flex items-center text-4xl font-bold text-gray-800 mb-8 bg-gradient-to-r from-blue-500 via-indigo-500 to-green-500 text-white p-4 rounded-lg shadow-lg">
  <span className="material-icons mr-4">Computer</span>
  Welcome to Digital Hub
</h1>

        {/* Grid Layout for Cards */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-7xl"> 
          {data.map((device, index) => (
            <div 
              key={device.id} 
              className={`card shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300 h-72 flex flex-col ${index % 4 === 0 ? 'bg-blue-100' : index % 4 === 1 ? 'bg-green-100' : index % 4 === 2 ? 'bg-yellow-100' : 'bg-pink-100'} border-2 border-gray-400`} // Background colors and border for the card
            >
              <figure className="flex justify-center items-center p-3 flex-grow mt-3">
                <img
                  src={device.img}
                  alt={device.title}
                  className="rounded-2xl w-40 h-40 object-cover border-2 border-gray-300" 
                />
              </figure>
              <div className="card-body text-center p-4 flex-grow flex flex-col justify-center items-center">
                <h2 className="card-title text-lg font-semibold text-gray-800">{device.title}</h2>
                <p className="text-gray-600 text-sm text-center">{device.description}</p>
                <div className="flex justify-center mt-2">
                  {renderStars(device.rating)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
