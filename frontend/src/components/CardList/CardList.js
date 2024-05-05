import react, { useEffect, useState } from "react";
import JobCard from "../JobCard/JobCard";
import "../JobCard/JobCard.css";
import SelectInput from "../SelectInput/SelectInput";

const CardList = () => {
  const [jobDataList, setJobDataList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const [rolesList, setRolesList] = useState([]);
  const [selectedRole, setSelectedRole] = useState([]);

  const limit = 10;
  const requestHeaders = new Headers();

  const paramsData = JSON.stringify({
    limit,
    offset,
  }); // setting limit and offset initial value

  const requestOptions = {
    method: "POST",
    headers: requestHeaders,
    body: paramsData,
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON", // fetching job data
        requestOptions
      );
      const result = await response.json();
      const newJobData = result?.jdList;
      setJobDataList((prev) => [...prev, ...newJobData]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching job data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight // checking if the scroll hit to bottom
      ) {
        setOffset((prevOffset) => prevOffset + limit); // incrementing offset for fetch more data
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [offset]);

  useEffect(() => {
    // console.log("selectedRole===", selectedRole);
  }, [selectedRole]);

  return (
    <div>
      <div className="main-header">Search Jobs</div>

      <div className="main-filter-container">
        <SelectInput
          placeHolder="Roles"
          setPropValue={setSelectedRole}
          propValue={selectedRole}
          rolesList={rolesList}
        />
      </div>

      {jobDataList.length > 0 && (
        <div className="job-list">
          {jobDataList.map((job) => (
            <JobCard job={job} />
          ))}
        </div>
      )}

      {loading && <div>Loading...</div>}
    </div>
  );
};

export default CardList;
