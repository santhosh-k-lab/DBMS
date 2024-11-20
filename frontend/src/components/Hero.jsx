import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
          Our platform streamlines vehicle service management, making it easier than ever to book and track services, stay updated on real-time service status, and access comprehensive service records. With transparent billing and clear quotes, you’ll have everything you need in one convenient place. Thank you for choosing us to help keep your vehicles running smoothly!
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;