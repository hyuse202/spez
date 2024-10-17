// pages/api/auth/login.js
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Parse x-www-form-urlencoded body
    const { username, password } = req.body;
    console.log("aa")
    const body = new URLSearchParams();
    body.append('username', username);
    body.append('password', password);
    try {
        const response = await fetch('http://localhost:8000/token', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body.toString(),
        });

        const data = await response.json();

        if (response.ok) {
            // Respond with the token if successful
            res.status(200).json({ token: data.access_token });
        } else {
            // Handle error from external API
            res.status(response.status).json({ message: data.message || 'Authentication failed' });
        }
        } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        // Only allow POST requests
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}
