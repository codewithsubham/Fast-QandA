export const HttpConnect = async (method = "GET", endPoint, data = {}) => {
    try {
        const response = await fetch(endPoint, {
            method: method, // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        if (response) {
            return response.json();
        }
        return false;

    } catch (error) {
        return false;
    }
};
