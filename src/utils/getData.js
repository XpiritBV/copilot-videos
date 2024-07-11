import basename from "../../react-config";

let cachedData = null;

const getData = async () => {
    if (cachedData) {
        return cachedData;
    }
    try {
        const response = await fetch(`${basename}data.json`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        cachedData = await response.json();
        return cachedData;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

export default getData;