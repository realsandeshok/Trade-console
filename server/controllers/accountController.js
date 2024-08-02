// controllers/accountController.js
const pool = require('../config/database');

const getAccounts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM accounts');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching accounts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const addAccount = async (req, res) => {
    const { account_name, broker_id, broker } = req.body;

    if (!account_name || !broker_id || !broker) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO accounts (account_name, broker_id, broker) VALUES ($1, $2, $3) RETURNING *',
            [account_name, broker_id, broker]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        // Check for unique constraint violation error
        if (error.code === '23505') { // PostgreSQL unique violation error code
            return res.status(409).json({ error: 'Account with this name or broker ID already exists' });
        }
        console.error('Error adding account:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getAccounts,
    addAccount
};
