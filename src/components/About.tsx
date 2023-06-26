import React from 'react';
import '../../public/css/About.css';

const About = () => {
  return (
    <div className="about-container">
      <ul className='line'></ul>
      <div className="about-content">
        <h1 className="about-heading">Our Mission</h1>
        <div className="about-description">
          <p>
            Moove Now is your ultimate solution for hassle-free relocation. Discover your dream apartment effortlessly with detailed information, visuals, and virtual tours all in one place. Browse through a wide selection of apartments, view high-quality images and floor plans, and make informed decisions about your future living space.
          </p>
          <p>
            Our platform goes beyond apartment details. Explore valuable insights on nearby landmarks, schools, parks, shopping centers, and more. We understand that transportation plays a vital role, so we provide information on transportation options and estimated costs to meet your commuting needs and budget.
          </p>
          <p>
            With Moove Now, finding the perfect place to call home is our founder's mission. We empower you with a comprehensive platform that simplifies the entire relocation process. Say goodbye to the hassle of moving and let Moove Now be your trusted guide.
          </p>
        </div>
      </div>
      <ul className='line'></ul>
    </div>
  );
}

export default About;
