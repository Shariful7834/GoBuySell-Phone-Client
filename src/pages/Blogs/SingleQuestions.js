import React from "react";

const SingleQuestions = ({ question }) => {
  const { name, answer } = question;
  return (
    <div
      data-aos="flip-up"
      data-aos-easing="linear"
      data-aos-duration="1000"
      tabIndex={0}
      className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mt-5"
    >
      <div className="collapse-title text-xl font-medium">
        <h2 className="text-xl font-bold">{name}</h2>
      </div>
      <div className="collapse-content">
        <p className="text-black">{answer}</p>
      </div>
    </div>
  );
};

export default SingleQuestions;
