// api/update-tours.js
import fetch from 'node-fetch';

const GITHUB_OWNER = process.env.GITHUB_OWNER; // e.g. "medast7"
const GITHUB_REPO = process.env.GITHUB_REPO;   // e.g. "nomadtravel.com"
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // token in project secrets
const FILE_PATH = 'data/tours.json';
const BRANCH = process.env.GITHUB_BRANCH || 'main';

async function getFileSha() {
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}?ref=${BRANCH}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json'
    }
  });
  if (!res.ok) throw new Error(`Failed to fetch file: ${res.status}`);
  const j = await res.json();
  return j.sha;
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const rawUrl = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${BRANCH}/${FILE_PATH}`;
      const r = await fetch(rawUrl);
      if (!r.ok) return res.status(500).json({ error: 'Failed to fetch tours' });
      const data = await r.json();
      return res.status(200).json(data);
    }

    if (req.method === 'PUT') {
      const newData = req.body;
      if (!newData) return res.status(400).json({ error: 'No data' });

      const sha = await getFileSha();
      const content = Buffer.from(JSON.stringify(newData, null, 2)).toString('base64');

      const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`;
      const payload = {
        message: 'Update tours via Admin Dashboard',
        content,
        sha,
        branch: BRANCH
      };

      const r = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const jr = await r.json();
      if (!r.ok) return res.status(r.status).json(jr);
      return res.status(200).json(jr);
    }

    return res.setHeader('Allow', 'GET, PUT').status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
