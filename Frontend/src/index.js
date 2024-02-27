document.addEventListener('DOMContentLoaded', function () {
    const btnGerar = document.getElementById('btnGerar');

    btnGerar.addEventListener('click', function () {
        console.log('Evento de clique acionado.');

        // Valores dos inputs e checkboxes
        const nome = document.getElementById('nomeDigitadoDisplay').value;
        const email = document.getElementById('e-mailDigitadoDisplay').value;
        const comprimentoSenha = document.getElementById('number').value;
        const letrasMinusculas = document.getElementById('chkLowerId').checked;
        const letrasMaiusculas = document.getElementById('chkUpperId').checked;
        const numeros = document.getElementById('chkNumberId').checked;
        const simbolos = document.getElementById('chkSymbolsId').checked;

        console.log(`Nome: ${nome}, Email: ${email}, Comprimento da Senha: ${comprimentoSenha}, Letras Minúsculas: ${letrasMinusculas}, Letras Maiúsculas: ${letrasMaiusculas}, Números: ${numeros}, Símbolos: ${simbolos}`);

        // Verificação do preenchimento dos campos obrigatórios
        if (nome.trim() === '' || email.trim() === '') {
            alert('Dados incompletos para o envio da senha. Por favor, preencha todos os campos.');
            return; 
        }

        // Verificação do comprimento da senha
        if (comprimentoSenha === '') {
            alert('Defina o tamanho da senha.');
            return; 
        }

        // Verificação dos checkboxes
        if (!letrasMinusculas && !letrasMaiusculas && !numeros && !simbolos) {
            alert('Ao menos uma das opções de tipo de senha deve ser marcada.');
            return; 
        }

        const dados = {
            nome: nome,
            email: email,
            comprimentoSenha: comprimentoSenha,
            letrasMinusculas: letrasMinusculas,
            letrasMaiusculas: letrasMaiusculas,
            numeros: numeros,
            simbolos: simbolos
        };

        console.log(`Dados: ${JSON.stringify(dados)}`);

        //URL de envio de dados para o Backend
        axios.post('http://localhost:3000/usuario/enviar-dados', dados)
            .then(function (response) {
                console.log(response);
                alert('Senha gerada e enviada com sucesso para o seu e-mail!');
            })
            .catch(function (error) {
                console.error(error);
                alert('Ocorreu um erro ao enviar os dados.');
            });
    });

    console.log('Evento de clique registrado corretamente.');
});
