const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Mock database functions
const db = {
    getAccountDetails: async () => ({ username: 'johndoe', email: 'johndoe@example.com' }),
    updateAccount: async (details) => { /* Update account in the database */ },
    getOrderHistory: async () => ({ orders: [{ id: 12345, status: 'Delivered' }, { id: 67890, status: 'Processing' }] })
};

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/account-details', async (req, res) => {
    try {
        const details = await db.getAccountDetails();
        res.json(details);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/update-account', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        await db.updateAccount({ username, email, password });
        res.status(200).send('Account updated');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/order-history', async (req, res) => {
    try {
        const history = await db.getOrderHistory();
        res.json(history);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});