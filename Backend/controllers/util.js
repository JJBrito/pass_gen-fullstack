// Função para gerar uma senha com base nos critérios especificados
function gerarSenha(comprimentoSenha, incluirMinusculas, incluirMaiusculas, incluirNumeros, incluirSimbolos) {
    let senha = '';
    const maxComprimentoSenha = 20;

    // Verifica se o comprimento da senha é maior que o máximo permitido
    if (comprimentoSenha > maxComprimentoSenha) {
        comprimentoSenha = maxComprimentoSenha; // Define o comprimento da senha como o máximo permitido
    }

    // Restringe o comprimento da senha para no máximo 20 caracteres
    comprimentoSenha = Math.min(comprimentoSenha, maxComprimentoSenha);

    // Caracteres permitidos para cada categoria
    const minusculas = 'abcdefghijklmnopqrstuvwxyz';
    const maiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeros = '0123456789';
    const simbolos = '!@#$%^&*()-=_+';

    // Concatena as categorias permitidas com base nos critérios
    let caracteresPermitidos = '';
    if (incluirMinusculas) caracteresPermitidos += minusculas;
    if (incluirMaiusculas) caracteresPermitidos += maiusculas;
    if (incluirNumeros) caracteresPermitidos += numeros;
    if (incluirSimbolos) caracteresPermitidos += simbolos;

    // Gera a senha aleatória com base nos caracteres permitidos
    for (let i = 0; i < comprimentoSenha; i++) {
        const randomIndex = Math.floor(Math.random() * caracteresPermitidos.length);
        senha += caracteresPermitidos[randomIndex];
    }

    return senha;
}

module.exports = { gerarSenha };