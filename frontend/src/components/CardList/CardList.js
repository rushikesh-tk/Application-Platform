import react, { useEffect, useState } from "react";

const CardList = () => {
  const [jobDataList, setJobDataList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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

  return (
    <div>
      <div>Job List</div>

      {jobDataList.length > 0 && (
        <div>
          {" "}
          <ul>
            {jobDataList.map((job) => (
              <li key={job.jdUid}>
                <h2>{job.jobRole}</h2>
                <h4>{job.jdUid}</h4>
                <p>{job.jobDetailsFromCompany}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {loading && <div>Loading...</div>}
    </div>
  );
};

export default CardList;
