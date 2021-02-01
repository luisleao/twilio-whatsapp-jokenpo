const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const twilio = require('twilio');

app.use(bodyParser.urlencoded({ extended: true }));

const opcoes = [
    'pedra', 'papel', 'tesoura'
];

const perde = {
    'pedra': 'papel',
    'papel': 'tesoura',
    'tesoura': 'pedra'
}

app.post('/message', (req, res) => {
    console.log('nova mensagem', req.body.Body);
    const usuario = req.body.Body.toLowerCase();
    switch(usuario) {
        case 'pedra':
        case 'papel': 
        case 'tesoura':
            // fazer a escolha do computador e responder quem ganhou
            const computador = opcoes[Math.floor(Math.random() * opcoes.length)];

            if (computador === usuario) {
                res.send('<Response><Message>Ops, deu empate!</Message></Response>')
            } else {
                if (perde[computador] === usuario) {
                    // computador perdeu
                    res.send(`<Response><Message>Eu escolhi *${computador}*</Message><Message>Você ganhou, mas quero jogar novamente!</Message></Response>`);
                } else {
                    // computador ganhou
                    const twiml = new twilio.twiml.MessagingResponse();
                    twiml.message(`Eu escolhi *${computador}*`);
                    twiml.message('Ganhei! Ganhei!!!')
                        .media('https://farm8.staticflickr.com/7090/6941316406_80b4d6d50e_z_d.jpg');
                    res.send(twiml.toString());
                }
            }

            break;

        default:
            res.send('<Response><Message>Escolha Pedra, Papel ou Tesoura!</Message></Response>')
            break;
    }
    

});

app.listen(3000, function(){
    console.log('Servidor ativo na porta 3000!');
})