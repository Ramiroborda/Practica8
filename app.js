const express = require('express')
const mysql = require('mysql')

const app = express();

app.set('view engine', 'ejs')
app.use(express.json());

var connection
const openConnection = () => {
    connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'Univalle',
        database: 'practica8'
    })
}
const closeConnection = () => {
    connection.end()
}

//visualizacion de la plantilla profesor
app.get('/professorlist', (req, res) => {
    
        res.render('professorlist', {hello: 'hello'})
})


//retorna los profesores
app.get('/professors', (req, res) => {
    openConnection()

    connection.query('SELECT * FROM professor', (error, rows) => {
        if (error) {
            console.log(error)
        }

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(rows[0]))
        closeConnection()
    })
})

//retornar profesores por id
app.get('/professors/:id', (req, res) => {
    openConnection();
    let id = req.params.id;

    connection.query('SELECT * FROM professor WHERE id = ?', [id], (error, rows) => {
        if (error) {
            console.log(error)
        }

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(rows[0]))
        closeConnection()
    })
})

//enviar dato de profesores
app.post('/professors', (req, res) => {
    openConnection()
    let professor = req.body

    connection.query('INSERT INTO professor (first_name, last_name, birth_date, city, salary) ' +
                     'VALUES (?, ?, ?, ?, ?)', [professor.first_name, professor.last_name, professor.birth_date, professor.city, professor.salary],
                     (error, rows) => {
                         if (error) {
                             console.log(error)
                         }

                         res.writeHead(200, {'Content-Type': 'application/json'})
                         res.end(JSON.stringify(rows))
                         closeConnection()
                     })
})

//actualiza datos deprofesores
app.put('/professors', (req, res) => {
    openConnection()
    let professor = req.body

    connection.query('UPDATE professor SET first_name = ?, last_name = ?, birth_date = ?, city = ?, salary = ? WHERE id = ?', 
        [professor.first_name, professor.last_name, professor.birth_date, professor.city, professor.salary, professor.id],
        (error, rows) => {
            if (error) {
                console.log(error)
            }

            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(rows))
            closeConnection()
        })
})

//borra los datos de un profesor por id
app.delete('/professors/:id', (req, res) => {
    openConnection();
    let id = req.params.id;

    connection.query('DELETE FROM professor WHERE id = ?', [id], (error, rows) => {
        if (error) {
            console.log(error)
        }

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(rows))
        closeConnection()
    })
})

app.listen(3000, () => {
    console.log('Server initialized')
})









////----------------------------------------------------------
/*const professors = [
    {
        id: 1,
        first_name: 'Luis',
        last_name: 'Pepe',
        birth_date: '1990-11-03',
        city: 'Santa Cruz',
        salary: 5000.00
    },
    {
        id: 2,
        first_name: 'Maria',
        last_name: 'Magdalena',
        birth_date: '1740-03-12',
        city: 'Oruro',
        salary: 3200.00
    }
];

app.get('/helloworld', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end('<p>Hello</p> world')
})

app.get('/hellojson', (req, res) => {
    let professor = {
        id: 1,
        first_name: 'Pepe',
        last_name: 'Mario',
        birth_date: '1950-01-03',
        city: 'Potosi',
        salary: 2000.00
    }

    let professor2 = {
        id: 2,
        first_name: 'Marcela',
        last_name: 'Elizabeth',
        birth_date: '1992-12-25',
        city: 'Cochabamba',
        salary: 4000.00
    }

    let array1 = [professor, professor2];

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(array1))
})

app.post('/hellojson', (req, res) => {
    let professor = req.body;
    console.log(professor.first_name, professor.last_name, professor.birth_date, professor.city, professor.salary);

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({response: 'ok'}))
})

app.get('/professor', (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(professors))
})

//auto increment
app.post('/professors', (req, res) => {
    let professor = req.body;
    let professorsCount = professors.length;

    professor.id = professorsCount + 1;

    professors.push(professor);

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({response: 'ok'}))
})

//actualizacion
app.put('/professors', (req, res) => {
    let professor = req.body; 

   
    for (let existingProfessor of professors) {
        if (professor.id === existingProfessor.id) {
            existingProfessor.first_name = professor.first_name;
            existingProfessor.last_name = professor.last_name;
            existingProfessor.birth_date = professor.birth_date;
            existingProfessor.city = professor.city;
            existingProfessor.salary = professor.salary;
            break;
        }
    }

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({response: 'ok'}))
})

//borrar por elemento de id
app.delete('/professor/:id', (req, res) => {
    let id = parseInt(req.params.id);

    for (let i = 0; i < professors.length; i++) {
        let existingProfessor = professors[i];

        if (existingProfessor.id === id) {
            professors.splice(i, 1);
            break;
        }
    }

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({response: 'ok'}))
})

app.listen(3000, () => {
    console.log('Server initialized')
})

//para levantar el servicio
//node app.js*/
