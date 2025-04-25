import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    if (err) {
      console.error("Erro trazer usuários:", err);
      return res.status(500).json({ error: "Erro ao procurar usuários" });
    }

    return res.status(200).json(data);
  });
};

export const deleteUsers = (req, res) => {
  const userId = req.params.id;
  const query = "DELETE FROM usuarios WHERE id=? "
  
  db.query(query, [userId], (err) => {
    if(err) return res.status(500).json(err);

    return res.status(200).json({message:"Usuario Deletado!!!"})
  })
};

export const updateUser = (req, res) => {
  const userId = req.params.id;
  const { firstName, idade, cpf, email, genero } = req.body;

  const q = "UPDATE usuarios SET firstName = ?, idade = ?, cpf = ?, email = ?, genero = ? WHERE id = ?";
  const values = [firstName, idade, cpf, email, genero, userId];

  db.query(q, values, (err) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ message: "Usuário atualizado!!!" });
  });
};

export const createUser = (req, res) => {
  try {
    const { firstName, idade, cpf, email, genero } = req.body;

    if (!firstName || !idade || !cpf || !email || !genero) {
      return res.status(400).json({ error: "Insira em todos os campos" });
    }

    const q = "INSERT INTO usuarios (firstName, idade, cpf, email, genero) VALUES (?, ?, ?, ?, ?)";
    const values = [firstName, idade, cpf, email, genero];

    db.query(q, values, (err, result) => {
      if (err) {
        console.error("Erro no Cadastramento:", err);
        return res.status(500).json({ error: "Erro ao Cadastrar usuário" });
      }

      return res.status(201).json({
        message: "Usuário criado com sucesso",
        id: result.insertId,
        firstName,
        idade,
        cpf,
        email,
        genero
      });
    });
  } catch (err) {
    console.error("Erro:", err);
    return res.status(500).json({ error: "Erro" });
  }
};



