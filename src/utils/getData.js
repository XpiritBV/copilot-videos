import basename from "../../react-config";

const getData = async () => {
  try {
	const response = await fetch(`${basename}data.json`);
	if (!response.ok) {
	  throw new Error('Network response was not ok');
	}
	return await response.json();
  } catch (error) {
	console.error('Fetch error:', error);
	throw error;
  }
};

export default getData;