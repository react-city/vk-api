const [access_token, expires_in, user_id] = location.hash.substring(1).split('&').map(str => str.split('=')[1]);

setCookie('access_token', access_token, { path: '/', expires: Number(expires_in) });
location.href = `${location.protocol}//${location.host}/vk-api/friends`;  