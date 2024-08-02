const pool = require('../config/database');

// Function to add a new script
const addScript = async (req, res) => {
    const { name, sector, parent_companies } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO scripts (name, sector, parent_companies) VALUES ($1, $2, $3) RETURNING *',
            [name, sector, parent_companies]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        // Check if the error is due to unique constraint violation
        if (error.code === '23505') {
            // PostgreSQL unique violation error code
            res.status(400).json({ error: 'Script name already exists' });
        } else {
            console.error('Error adding script:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

// Function to get all scripts
const getScripts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM scripts');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching scripts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    addScript,
    getScripts
};
