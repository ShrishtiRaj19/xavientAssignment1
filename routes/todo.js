var todo = require('../controllers/todo');

module.exports = (router) => {
    router.post('/todo/create', todo.createTask);
    router.get('/todo/get', todo.getTask);
    router.put('/todo/update/:id', todo.updateTask);
    router.delete('/todo/delete/:id', todo.deleteTask);
}