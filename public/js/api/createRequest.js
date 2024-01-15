const createRequest = (options = {}) => {
	const xhr = new XMLHttpRequest;
	let url = options.url;
	xhr.responseType = "json";
	xhr.withCredentials = true;


	try {
		xhr.addEventListener("load", () => {
			options.callback(null, xhr.response);
		})
	} catch (error) {
		options.callback(error, xhr.response);
	}


	if (options.method === "GET") {
		url = url + "?"
		for (value in options.data) {
			url = url + value + "=" + options.data[value] + "&";
		}

		xhr.open(options.method, url);
		xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:8000/")
		xhr.send();
	} else {
		let formData = new FormData;
		for (value in options.data) {
			formData.append(value, options.data[value]);
		}

		xhr.open(options.method, url);
		xhr.send(formData);
	}
};
