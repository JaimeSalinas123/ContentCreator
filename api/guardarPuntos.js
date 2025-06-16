export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sólo se permiten solicitudes POST' });
  }

  const { username, puntos } = req.body;

  if (!username || typeof puntos !== 'number') {
    return res.status(400).json({ error: 'Faltan datos válidos: username o puntos' });
  }

  const token = process.env.GITHUB_TOKEN;
  const repo = 'puntos-jugadores'; // <-- Cambia esto si tu repo tiene otro nombre
  const owner = 'JaimeSalinas123'; // <-- Cambia esto por tu usuario de GitHub
  const path = `usuarios/${username}.json`; // Carpeta + nombre de archivo

  const fileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  const content = Buffer.from(JSON.stringify({ puntos })).toString('base64');

  // Verificar si ya existe el archivo
  const existing = await fetch(fileUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  let sha = null;
  if (existing.ok) {
    const json = await existing.json();
    sha = json.sha;
  }

  // Crear o actualizar archivo
  const response = await fetch(fileUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({
      message: `Actualizar puntos para ${username}`,
      content,
      sha, // si no existe, GitHub lo toma como nuevo archivo
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    return res.status(500).json({ error: 'No se pudo guardar el archivo', details: errorData });
  }

  const data = await response.json();
  res.status(200).json({ message: 'Puntos guardados correctamente', data });
}
