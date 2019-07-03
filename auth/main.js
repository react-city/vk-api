const accessToken = getCookie('access_token');

if (accessToken) {
    location.href = `${location.protocol}//${location.host}/vk-api/friends`;
}