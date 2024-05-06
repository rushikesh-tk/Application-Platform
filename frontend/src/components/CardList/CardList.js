import react, { useEffect, useState } from "react";
import JobCard from "../JobCard/JobCard";
import "../JobCard/JobCard.css";
import SelectInput from "../SelectInput/SelectInput";

// const tempOnj = {
//   jdUid: "cfff35ac-053c-11ef-83d3-06301d0a7178-92010",
//   jdLink: "https://weekday.works",
//   jobDetailsFromCompany:
//     "This is a sample job and you must have displayed it to understand that its not just some random lorem ipsum text but something which was manually written. Oh well, if random text is what you were looking for then here it is: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages and now in this assignment.",
//   maxJdSalary: 61,
//   minJdSalary: null,
//   salaryCurrencyCode: "USD",
//   location: "delhi ncr",
//   minExp: 3,
//   maxExp: 6,
//   jobRole: "frontend",
//   companyName: "Dropbox",
//   logoUrl: "https://logo.clearbit.com/dropbox.com",
// };

const rolesListArray = ["frontend", "ios", "android", "tech lead", "backend"];

const CardList = (props) => {
  const {} = props;

  const [filteredJobData, setFilteredJobData] = useState([]);
  const [jobDataList, setJobDataList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState([]);
  const [filters, setFilter] = useState({
    roles: [],
    minBaseSalrary: "",
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
    // setLoading(true);
    try {
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON", // fetching job data
        requestOptions
      );
      const result = await response.json();
      const newJobData = result?.jdList;
      setJobDataList((prev) => [...prev, ...newJobData]);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching job data:", error);
      // setLoading(false);
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

  const filterUniqueJobRoles = (jobsArray) => {
    let jobRoles = jobsArray.map((job) => job.jobRole);

    let uniqueJobRoles = jobRoles.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

    return uniqueJobRoles;
  };

  const filterJobsByRoles = (jobsArray, rolesArray) => {
    let tempData = jobsArray;
    if (rolesArray?.length > 0) {
      tempData = jobsArray.filter((job) => rolesArray.includes(job.jobRole)); // filtering according to selected roles
    }

    setFilteredJobData(tempData);
  };

  useEffect(() => {
    filterJobsByRoles(jobDataList, selectedRole);
  }, [jobDataList, selectedRole]);

  return (
    <div className="main-div">
      <div className="main-header">Search Jobs</div>

      <div className="main-filter-container">
        <SelectInput
          placeHolder="Roles"
          setPropValue={setSelectedRole}
          propValue={selectedRole}
          dropDownArray={rolesListArray}
        />
      </div>

      {filteredJobData.length > 0 && (
        <div className="job-list">
          {filteredJobData.map((job, index) => (
            <JobCard job={job} />
          ))}
        </div>
      )}

      {loading && <div>Loading...</div>}
    </div>
  );
};

export default CardList;
