import React from "react";
import "./JobCard.css";

const JobCard = ({ job }) => {
  const {
    jobRole,
    location,
    maxJdSalary,
    minJdSalary,
    jobDetailsFromCompany,
    minExp,
    companyName,
    logoUrl,
  } = job;

  const capitalizeWords = (str) => {
    return str
      .split("")
      .map((char) => char.toUpperCase())
      .join("");
  };

  return (
    <div className="job-container" key={job.jdUid}>
      <div className="company-title">
        <img className="company-logo" src={logoUrl} alt={companyName} />
        <div className="job-details">
          <div className="company-name">{companyName}</div>
          <div className="job-title"> {capitalizeWords(jobRole)} </div>
          <div className="job-location"> {capitalizeWords(location)} </div>
        </div>
      </div>

      <div className="job-salary">
        Estimated Salary: ₹{minJdSalary} - {maxJdSalary} LPA
      </div>
      <div className="description-container">
        <div className="description-header">About Company:</div>
        <div className="description-text">{jobDetailsFromCompany}</div>
      </div>
      <div className="exp-container">
        <div className="exp-header">Minimum Experience</div>
        <div className="exp-text">{minExp} years</div>
      </div>
    </div>
  );
};

export default JobCard;
