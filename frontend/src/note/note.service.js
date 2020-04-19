export default {
    async get() {
        return fetch('http://localhost:3000/notes/1').then(response => {
            return response.json();
        }, (error) => {
            console.error(error);
        });
    },
    async post(note) {
        return fetch('http://localhost:3000/notes/1', {
            headers: {'Content-type': 'application/json; charset=UTF-8'},
            method: 'POST',
            body: JSON.stringify(note)
        }).then(response => {
            return response.json();
        }, (error) => {
            console.error(error);
        });
    },
    async put(notes) {
        return fetch('http://localhost:3000/notes/1', {
            headers: {'Content-type': 'application/json; charset=UTF-8'},
            method: 'PUT',
            body: JSON.stringify(notes)
        }).then(() => {
            return;
        }, (error) => {
            console.error(error);
        });
    },
    async delete(id) {
        return fetch('http://localhost:3000/notes/' + id, {
            headers: {'Content-type': 'application/json; charset=UTF-8'},
            method: 'DELETE'
        }).then(() => {
            return;
        }, (error) => {
            console.error(error);
        });
    }
}
