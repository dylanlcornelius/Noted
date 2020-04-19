export default {
    async get() {
        return fetch('http://localhost:3000/pages/1').then(response => {
            return response.json();
        }, (error) => {
            console.error(error);
        });
    },
    async post(page) {
        return fetch('http://localhost:3000/pages/1', {
            headers: {'Content-type': 'application/json; charset=UTF-8'},
            method: 'POST',
            body: JSON.stringify(page)
        }).then(response => {
            return response.json();
        }, (error) => {
            console.error(error);
        });
    },
    async put(pages) {
        return fetch('http://localhost:3000/pages/1', {
            headers: {'Content-type': 'application/json; charset=UTF-8'},
            method: 'PUT',
            body: JSON.stringify(pages)
        }).then(() => {
            return;
        }, (error) => {
            console.error(error);
        });
    },
    async delete(id) {
        return fetch('http://localhost:3000/pages/' + id, {
            headers: {'Content-type': 'application/json; charset=UTF-8'},
            method: 'DELETE'
        }).then(() => {
            return;
        }, (error) => {
            console.error(error);
        });
    }
}
