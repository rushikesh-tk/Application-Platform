export const capitalizeWords = (str) => {
  return str
    ?.split("")
    .map((char) => char.toUpperCase())
    .join("");
};

export const fetchJobs = async (offset) => {
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
  try {
    const response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON", // fetching job data
      requestOptions
    );
    const result = await response.json();
    const newJobData = result?.jdList;

    return newJobData;
  } catch (error) {
    console.error("Error fetching job data:", error);
    return [];
  }
};
