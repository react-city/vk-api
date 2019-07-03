const accessToken = getCookie('access_token');

if (!accessToken) {
    location.href = `${location.protocol}//${location.host}/vk-api/auth`;
}

document.addEventListener('DOMContentLoaded', () => {
    const errorsNode = document.getElementById('errors');
    const infoNode = document.getElementById('info');
    const friendsNode = document.getElementById('friends');

    fetchJsonp(`https://api.vk.com/method/users.get?access_token=${accessToken}&v=5.100`)
        .then(response => response.json())
        .then(json => {
            if (json.response) {
                const info = json.response[0];
                console.log('info', info);
                renderInfo(info, infoNode);
            } else if (json.error) {
                const errorMsg = json.error.error_msg;
                renderErrors('fetch info', errorMsg, errorsNode);
            }
        })

    fetchJsonp(`https://api.vk.com/method/friends.get?&count=5&order=random&fields=online&access_token=${accessToken}&v=5.100`)
        .then(response => response.json())
        .then(json => {
            if (json.response) {
                const friends = json.response.items;
                console.log('friends', friends);
                renderFriends(friends, friendsNode);
            } else if (json.error) {
                const errorMsg = json.error.error_msg;
                renderErrors('fetch friends', errorMsg, errorsNode);
            }
        })
})

function renderInfo(info, parentNode) {
    const nameNode = document.createElement('h3');
    nameNode.innerText = `${info.first_name} ${info.last_name}`;
    parentNode.appendChild(nameNode);
}

function renderFriends(friends, parentNode) {
    friends.forEach(friend => {
        const userNode = document.createElement('li');
        userNode.innerText = `${friend.first_name} ${friend.last_name} [${friend.online ? 'онлайн' : 'оффлайн'}]`;
        parentNode.appendChild(userNode);
    });
}

function renderErrors(name, msg, parentNode) {
    const errorNode = document.createElement('p');
    errorNode.innerText = `[${name}]: ${msg}`;
    parentNode.appendChild(errorNode);
}