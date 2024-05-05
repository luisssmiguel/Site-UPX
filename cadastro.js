    const mysql = require('mysql2/promise');

    async function insertData(formDataJson) {
        try {
            // Cria uma conexão com o banco de dados
            const connection = await mysql.createConnection({
                host: 'roundhouse.proxy.rlwy.net',
                port: 19875,
                user: 'root',
                password: 'MZHTPWxfWwRCLpMewFwppRtHLYLkpksg',
                database: 'railway'
            });

            // Insere os dados do formulário na tabela 'users'
            const [rows, fields] = await connection.execute('INSERT INTO users (email, name, phone, password) VALUES (?, ?, ?, ?)', [
                formDataJson.email,
                formDataJson.name,
                formDataJson.phone,
                formDataJson.password
            ]);

            console.log('Data saved successfully:', rows);

            // Fecha a conexão com o banco de dados
            await connection.end();
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    // Exemplo de uso:
    const formDataJson = {
        email: 'example@example.com',
        name: 'John Doe',
        phone: '1234567890',
        password: 'password'
    };

    insertData(formDataJson);
