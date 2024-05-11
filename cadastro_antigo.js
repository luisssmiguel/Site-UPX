document.addEventListener('DOMContentLoaded', function() {
    const toggleIcons = document.querySelectorAll('.toggle-password');
    const passwordInput = document.querySelector('#password');

    if (!toggleIcons || toggleIcons.length === 0) {
        console.error('Nenhum ícone de alternância de senha encontrado.');
        return;
    }

    if (!passwordInput) {
        console.error('Campo de senha não encontrado.');
        return;
    }

    toggleIcons.forEach(function(icon) {
        icon.addEventListener('click', function() {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.add('active');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('active');
            }
        });
    });
});
