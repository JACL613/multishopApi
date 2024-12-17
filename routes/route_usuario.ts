const Users = require("../databases/models/usuario_schema");
const {jwt:jwtR} = require('jsonwebtoken')
const { encrypt, decrypt } = require("../lib/utils");

const routeUsuario = require("express").Router();

routeUsuario.get("/", async (req: any, res: { json: (arg0: { message: string; status: number; data?: any; }) => any; }) => {
  try {
    const query = await Users.find();

    if (!query || query.length <= 0)
      return res.json({ message: "No hay usuarios registrados", status: 404 });

    return res.json({
      message: "Usuarios encontrados",
      data: query,
      status: 200,
    });
  } catch (error: string | any) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });
  }
});

routeUsuario.get("/:id", async (req: { params: { id: any; }; }, res: { json: (arg0: { message: string; status: number; data?: any; }) => any; }) => {
  const { id } = req.params;
  if (!id) return res.json({ message: "faltan datos", status: 401 });
  try {
    const query = await Users.findById(id);
    if (!query || query.length < 1)
      return res.json({ message: "No se encontro el usuario", status: 404 });
    return res.json({ message: "usuario encontrado", status: 200, data: query });
  } catch (error: string | any) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });
  }
});

routeUsuario.post("/", async (req: { body: { username: any; name: any; email: any; password: any; role: any; created_at: any; wallet: any; config_despatch: any; orders: any; }; }, res: { json: (arg0: { message: string; status: number; data?: any; }) => any; }) => {
  const {
    username,
    name,
    email,
    password,
    role,
    created_at,
    wallet,
    config_despatch,
    orders,
  } = req.body;
  console.log(username, name, email, password, role);

  if (!username || !name || !email || !password || !role)
    return res.json({ message: "faltan datos", status: 401 });
  try {
    const passwordHash = encrypt(password);
    const query = await Users.create({
      username,
      name,
      email,
      password: JSON.stringify(passwordHash),
      role,
      created_at,
      wallet,
      config_despatch,
      orders,
    });
    console.log(query);

    if (!query)
      return res.json({ status: 400, message: "Fallo en la creacion" });
    return res.json({
      status: 200,
      message: "Usuario registrado",
      data: query,
    });
  } catch (error: string | any) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });
  }
});

routeUsuario.post("/login",async (req: { body: { username: any; password: any; }; }, res: { json: (arg0: { message: string; status: number; }) => any; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; status?: number; data?: any; }): void; new(): any; }; }; }) => {
  const { username, password } = req.body;
  const secretKey = process.env.SECRETKEY
  if(!username || !password) 
    return res.json({ message: "faltan datos", status: 401 });
  try {
    const user = await Users.findOne({username})
    if(!user) return res.status(404).json({ message: "No se encuentra el usuario registrado "})
    const hash = JSON.parse(user.password)
    
    const passwordDecrypt = decrypt(hash)
    console.log(passwordDecrypt);
  // Aquí deberías verificar las credenciales del usuario (esto es solo un ejemplo)
  if ( password === passwordDecrypt ) {
    // Crear el token
    const token = jwt.sign({ username, role: "admin" }, secretKey, {
      expiresIn: "1h",
    });
    // Enviar el token al cliente
    res.status(200).json({status:200, message:"Usuario logueado" ,data: { ...user._doc ,password:null,token }});
  } else {
    res.status(401).json({ message: "Credenciales incorrectas" });
  }
  } catch (error: string | any) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });
    
  }
});

routeUsuario.put("/:id", async (req: { params: { id: any; }; body: { data: any; }; }, res: { json: (arg0: { message: string; status: number; data?: any; }) => any; }) => {
  const { id } = req.params;
  const { data } = req.body;
  if (!id || !data) return res.json({ message: "faltan datos", status: 401 });
  try {
    const query = await Users.findByIdAndUpdate(id, { ...data });
    if (query.length < 0)
      return res.json({ message: "No se encontro el usuario", status: 404 });
    return res.json({ message: "Usuario actualizado", status: 200, data: query });
  } catch (error: string | any) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });
  }
});

routeUsuario.delete("/:id", async (req: { params: { id: any; }; }, res: { json: (arg0: { message: string; status: number; }) => any; }) => {
  const { id } = req.params;

  try {
    const query = await Users.findByIdAndDelete(id);
    if (!query)
      return res.json({ message: "No se pudo borrar el usuario", status: 400 });

    return res.json({ message: "Usuario eliminado", status: 200 });
  } catch (error: string | any) {
    return res.json({ message: `Error: ${error.message}`, status: 500 });
  }
});

module.exports = routeUsuario;