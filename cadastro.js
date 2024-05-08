async function insertData(formDataJson) {
    try {
        // Cria uma conexão com o banco de dados
        const connection = await mysql.createConnection({
            host: 'localhost', // Altere para o endereço do seu servidor MySQL
            user: 'root', // Altere para o nome de usuário do seu MySQL
            password: 'Anjo100%', // Altere para a senha do seu MySQL
            database: 'CodeTech' // Altere para o nome do seu banco de dados
        });

        // Insere os dados do formulário na tabela 'usuarios'
        const [rows, fields] = await connection.execute('INSERT INTO usuarios (email, nome, telefone, senha) VALUES (?, ?, ?, ?)', [
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
    nome: 'John Doe',
    telefone: '1234567890',
    senha: 'password'
};

insertData(formDataJson);
