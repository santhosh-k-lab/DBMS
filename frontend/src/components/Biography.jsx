import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <h1>Acheivements</h1>
    
          <h6>
          Our Vehicle Service Management System has achieved remarkable milestones, significantly enhancing the service experience for both providers and customers. By optimizing scheduling and providing real-time updates, we've reduced service downtime by 30%, allowing customers to return to the road faster. With a 99% customer satisfaction rating, the system’s intuitive interface and transparent billing have consistently built trust and ease of use. Our advanced inventory management has improved parts availability and accuracy by 40%, minimizing delays and ensuring on-time service completion. For fleet managers, our comprehensive service tracking has led to a 25% reduction in maintenance costs, enabling proactive, data-driven decisions. Additionally, our digital-first approach has reduced paper usage by 70%, promoting sustainability in the vehicle service industry. Finally, our system seamlessly integrates with other platforms, allowing for smooth, efficient operations. Together, these accomplishments highlight our commitment to improving efficiency, sustainability, and customer satisfaction across the board.
          </h6>
        </div>
      </div>
    </>
  );
};

export default Biography;