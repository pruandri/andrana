import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'crud'
});

app.get('/', (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Erreur hehe de connexion" });
        return res.json(result);
    });
});

app.post('/student', (req, res) => {
    const num = req.body.num;
    const nom = req.body.nom;
    const moyenne = req.body.moyenne;
    const observ = req.body.observ;

    const sql = "INSERT INTO student (num, Nom, Moyenne, observation) VALUES (?, ?, ?, ?)";
    const vlue = [num, nom, moyenne, observ];
    db.query(sql, vlue, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.get('/lire/:num', (req, res) => {
    const sql = "SELECT*FROM student WHERE num=?";
    const ID = req.params.num;
    db.query(sql, [ID], (err, result) => {
        if (err) return res.json({ Message: "Erreur de connexion" });
        return res.json(result);
    });
});

app.put('/edit/:num', (req, res) => {
    
    const { num, nom, moyenne,observ } = req.body;
    const id = req.params.num; 
  
    
    const sql = `UPDATE student SET num = ?, Nom = ?, Moyenne = ? ,observation=? WHERE num = ?`;
    const values = [num, nom, moyenne,observ,id];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error(err); 
        return res.status(500).json({ message: 'Error updating student' }); 
      }
  
      return res.json({ message: 'Student updated successfully' }); 
    });
  });

app.delete('/supprimer/:num', (req, res) => {
    const sql = "DELETE FROM student WHERE num = ?";
    const id = req.params.num;

    db.query(sql, [id], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.listen(8081, () => {
    console.log("Listening");
});
