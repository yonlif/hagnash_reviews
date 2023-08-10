const databaseEndpoint = "http://localhost:3030/"



const request = ({ endpoint, method, data }) => {
    fetch(endpoint, {
        body: JSON.stringify(data),
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};


export const get = async (name: string=null, databaseName: string="reviews") => {
	var endpoint = `${databaseEndpoint}${databaseName}`
	if (name) {
		endpoint = `${endpoint}?name=${name}`
	}
	console.log(`In 'get' function to endpoint: ${endpoint}`)
    const response = await fetch(endpoint); // Adjust the URL based on your JSON server endpoint
    const data = await response.json();
    return data;
};

export const add = (data, databaseName: string="reviews") => {
    var endpoint = `${databaseEndpoint}${databaseName}`
    request({
        endpoint: endpoint,
        method: 'POST',
        data
    });
};

export const update = (review, databaseName: string="reviews") => {
    var endpoint = `${databaseEndpoint}${databaseName}`
    request({
        endpoint: `${endpoint}/${review.id}`,
        method: 'PUT',
        data: review
    });
};

export const remove = (review, databaseName: string="reviews") => {
    var endpoint = `${databaseEndpoint}${databaseName}`
    request({
        endpoint: `${endpoint}/${review.id}`,
        method: 'DELETE'
    });
};
