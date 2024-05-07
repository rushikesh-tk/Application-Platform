import react, { useEffect, useState } from "react";
import JobCard from "../JobCard/JobCard";
import "../JobCard/JobCard.css";
import SelectInput from "../SelectInput/SelectInput";

const rolesListArray = ["frontend", "ios", "android", "tech lead", "backend"];
const minExpArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const jobLocationArray = ["remote", "hybrid", "in-office"];
const minBasePayArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const CardList = () => {
  const [filteredJobData, setFilteredJobData] = useState([]);
  const [jobDataList, setJobDataList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    roles: [],
    minExperience: [],
    jobLocation: [],
    minBaseSalary: [],
    companyName: [],
  });

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

  const filterJobsByRoles = (jobsArray, filterObj) => {
    let tempFilteredJobData = jobsArray;

    if (filterObj["roles"]?.length > 0) {
      tempFilteredJobData = tempFilteredJobData.filter((job) =>
        filterObj["roles"].includes(job.jobRole)
      ); // filtering according to selected roles
    }

    if (filterObj["jobLocation"]?.length > 0) {
      tempFilteredJobData = tempFilteredJobData.filter((job) => {
        if (filterObj["jobLocation"]?.length === 0) {
          return true; // if no location is selected, include all jobs
        }

        return filterObj["jobLocation"].some((selectedLocation) => {
          if (selectedLocation === "remote" && job.location === "remote") {
            return true;
          }
          if (selectedLocation === "hybrid" && job.location === "hybrid") {
            return true;
          }
          if (
            selectedLocation === "in-office" &&
            !["remote", "hybrid"].includes(job.location)
          ) {
            return true;
          }
          return false;
        });
      });
    }

    if (filterObj["minBaseSalary"]?.length !== 0) {
      tempFilteredJobData = tempFilteredJobData.filter(
        (job) =>
          job.minJdSalary >= filterObj["minBaseSalary"] &&
          job.minJdSalary !== null
      ); // filtering according to min experience
    }

    if (filterObj["companyName"][0]?.length > 0) {
      tempFilteredJobData = tempFilteredJobData.filter((job) =>
        job.companyName
          .toLowerCase()
          .includes(filterObj["companyName"][0].toLowerCase())
      );
    } // filtering wrt company name

    if (filterObj["minExperience"]?.length !== 0) {
      tempFilteredJobData = tempFilteredJobData.filter(
        (job) => job.minExp <= filterObj["minExperience"] && job.minExp !== null
      ); // filtering according to min experience
    }

    setFilteredJobData(tempFilteredJobData);
  };

  useEffect(() => {
    filterJobsByRoles(jobDataList, filters);
  }, [jobDataList, filters]);

  return (
    <div className="main-div">
      <div className="main-header">Search Jobs</div>

      <div className="main-filter-container">
        <SelectInput
          placeHolder="Roles"
          setPropValue={setFilters}
          propValue={filters}
          typeName="roles"
          dropDownArray={rolesListArray}
          isMultiple={true}
        />
        <SelectInput
          placeHolder="Experience"
          setPropValue={setFilters}
          propValue={filters}
          typeName="minExperience"
          dropDownArray={minExpArray}
          isMultiple={false}
        />

        <SelectInput
          placeHolder="Job Type"
          setPropValue={setFilters}
          propValue={filters}
          typeName="jobLocation"
          dropDownArray={jobLocationArray}
          isMultiple={true}
        />
        <SelectInput
          placeHolder="Min Base Pay"
          setPropValue={setFilters}
          propValue={filters}
          typeName="minBaseSalary"
          dropDownArray={minBasePayArray}
          isMultiple={false}
        />

        <SelectInput
          placeHolder="Company Name"
          setPropValue={setFilters}
          propValue={filters}
          typeName="companyName"
        />
      </div>

      {loading || filteredJobData.length === 0 ? (
        <>
          {loading && <div>Loading...</div>}
          {filteredJobData.length === 0 && (
            <div>No Jobs Available with Current Filters</div>
          )}
        </>
      ) : (
        <div className="job-list">
          {filteredJobData.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardList;
