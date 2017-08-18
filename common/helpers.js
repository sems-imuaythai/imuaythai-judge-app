export const parseMessage = (message) => {
    let responseData = null;
    let response = JSON.parse(message);

    try {
        responseData = JSON.parse(response.data);
    } catch (err) {
        responseData = response.data;
    }

    response.data = responseData;

    return response;
}