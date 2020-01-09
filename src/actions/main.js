const API_URL = `https://failbase.fosteev.ru`;

const getHeaders = () => {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
   // headers.append("Authorization", localStorage.getItem('token'));
    return headers;
}

const checkStatus = (status) => {
    const accessStatus = [200];
    return accessStatus.includes(status);
}

// const getForm = params => {
//     let formData = new FormData();
//      Object.keys(params).forEach(key => {
//          formData.append(key, params[key])
//      });
//     //return formData;
// }
//
const getFormXwww = params => {
    let formData = [];
    for (var property in params) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(params[property]);
        formData.push(encodedKey + "=" + encodedValue);
    }
    return formData.join("&");
}

// const buildQueryParams = params => {
//     const stringParams = Object.keys(params).filter(key => {
//         const value = params[key];
//         if ((typeof value === 'object') && (value.length === 0)) {
//             return false;
//         }
//         return Boolean(value) || value === 0;
//     }).map(key => `${key}=${params[key]}`).join('&');
//     return stringParams.length !== 0 ? `?${stringParams}` : '';
// }

export function request(path, method = 'GET', params) {
    let headers = getHeaders();
    let formData = null;

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    if (params) {
        formData = getFormXwww(params);
    }

    return new Promise((resolve, reject) => {
        const url = path.indexOf('http') !== -1 ? path : `${API_URL}/${path}`;

        fetch(url, {
            method: method,
            headers: headers,
            mode: 'cors',
            body: formData
        }).then(response => {
            if (!checkStatus(response.status)) {
                console.warn(`Invalid status: ${response.status}`);
                reject(response);
                return;
            }


            response.json()
                .then(resp => resolve(resp))
                .catch(err => {
                    resolve('');
                    console.warn(`Error parse json. Path: ${path}. Method: ${method}`, err);
                })

        }).catch(err => reject(err));
    });
}