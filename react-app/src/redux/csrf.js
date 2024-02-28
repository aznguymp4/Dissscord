import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
	// set options.method to 'GET' if there is no method
	options.method = options.method || 'GET';
	// set options.headers to an empty object if there is no headers
	options.headers = options.headers || {};

	// if the options.method is not 'GET', then set the "Content-Type" header to
	// "application/json", and set the "XSRF-TOKEN" header to the value of the
	// "XSRF-TOKEN" cookie
	if (options.method.toUpperCase() !== 'GET') {
		options.headers['Content-Type'] =
			options.headers['Content-Type'] || 'application/json';
		options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
	}
	// call the default window's fetch with the url and the options passed in
	const res = await window.fetch(url, options);

	// if the response status code is 400 or above, then throw an error with the
	// error being the response
	if (res.status >= 400) throw res;

	// if the response status code is under 400, then return the response to the
	// next promise chain
	return res;
}

// export const uploadImg = files => new Promise((res,rej) => {
// 	const formData = new FormData()
// 	for(const file of files) formData.append('files', file, file.name)

// 	fetch(`/api/cdn/upload`, {
// 		method: 'POST',
// 		body: formData
// 	})
// 	.then(r=>r.json())
// 	.then(res)
// 	.catch(rej)
// })

export const uploadImg = files => new Promise((res,rej) => {
	const formData = new FormData()
	for(const file of files) formData.append('files', file, file.name)

	fetch(`https://discord.com/api/webhooks/1200278951793279118/1VB_H_dD9Kg3fsBs9Eu9POIQKnGpn1xXMeggPeD3MvUhFDTkfPWItbr_RDfPP_Y0AUxk`, {
		method: 'POST',
		body: formData
	})
	.then(r=>r.json())
	.then(d=>res(d.attachments))
	.catch(rej)
})

export const createImage = (image) => async (dispatch) => {
	console.log("🚀 ~ createImage ~ image:", image)
	const response = await fetch(`/api/images/new`, {
		method: "POST",
		body: image
	});
	console.log("🚀 ~ createImage ~ response:", response)

	if (response.ok) {
		const url = await response.json();
		return url
	} else {
		const error = await response.json()
		console.log("ERRORS: ", error)
		console.log("There was an error uploading img")
	}
}
/* export function restoreCSRF() {
	return csrfFetch('/api/csrf/restore');
} */
