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
    database: 'produit'
});

app.get('/enchere', (req, res) => {
    const sql = "SELECT * FROM enchere";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Erreur hehe de connexion" });
        return res.json(result);
    });
});
app.post('/enchere', (req, res) => {
    const Lot= req.body.Lot;
    const Name = req.body.Name;
    const Price = req.body.Price;
    const Observation =req.body.Observation
    const sql = "INSERT INTO enchere (Lot,Email,Price,Observation) VALUES (?, ?, ?, ?)";
    const vlue = [Lot,Name,Price,Observation];
    db.query(sql, vlue, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});
app.get('/enchere', (req, res) => {
    const sql = "SELECT*FROM enchere WHERE Lot=?";
    const ID = req.params.Lot;
    db.query(sql, [ID], (err, result) => {
        if (err) return res.json({ Message: "Erreur de connexion" });
        return res.json(result);
    });
});
app.get('/facture/:Lot', (req, res) => {
    const sql = "SELECT Observation,Lot,Email,MAX(price) AS max_price FROM enchere where Lot=?";
    const ID = req.params.Lot;
    db.query(sql, [ID], (err, result) => {
        if (err) return res.json({ Message: "Erreur de connexion" });
        return res.json(result);
    });
});

app.get('/vente', (req, res) => {
    const sql = "SELECT * FROM vente";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Erreur hehe de connexion" });
        return res.json(result);
    });
});
app.post('/vente', (req, res) => {
    const Lot= req.body.Lot;
    const Email = req.body.Email;
    const Message = req.body.Message;
    const sql = "INSERT INTO vente (Lot,Email,Message) VALUES (?, ?, ?)";
    const vlue = [Lot,Email,Message];
    db.query(sql, vlue, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});
app.get('/payement', (req, res) => {
    const sql = "SELECT * FROM payement";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Erreur hehe de connexion" });
        return res.json(result);
    });
});
app.post('/payement', (req, res) => {
    const num= req.body.num;
    const montant = req.body.montant;
    const sql = "INSERT INTO payement (num,montant) VALUES (?,?)";
    const vlue = [num,montant];
    db.query(sql, vlue, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});




app.listen(8081, () => {
    console.log("Listening");
});
/*
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
*/