
// Caso queira executar o código através de uma Twilio Function

const twilio = require('twilio');

const opcoes = [
    'pedra', 'papel', 'tesoura'
];

const perde = {
    'pedra': 'papel',
    'papel': 'tesoura',
    'tesoura': 'pedra'
}

exports.handler = function(context, event, callback) {
  const twiml = new twilio.twiml.MessagingResponse();
  const usuario = event.Body.toLowerCase();
  switch(usuario) {
    case 'pedra':
    case 'papel': 
    case 'tesoura':
      // fazer a escolha do computador e responder quem ganhou
      const computador = opcoes[Math.floor(Math.random() * opcoes.length)];

      if (computador === usuario) {
        twiml.message(`Ops, deu empate!`);
        twiml.message(`Quero ver se agora você ganha.`);
      } else {
        if (perde[computador] === usuario) {
          // computador perdeu
          twiml.message(`Eu escolhi *${computador}*`);
          twiml.message(`Você ganhou, mas quero jogar novamente!`);
        } else {
          // computador ganhou
          twiml.message(`Eu escolhi *${computador}*`);
          twiml.message('Ganhei! Ganhei!!!')
              .media('https://farm8.staticflickr.com/7090/6941316406_80b4d6d50e_z_d.jpg');
        }
      }
      break;

    case 'sim':
    case 'ajuda':
    case 'yes':
    case 'help':
      twiml.message(`Este jogo foi construído usando a *API de WhatsApp da Twilio* e foi implementado em 5 minutos através da nossa Sandbox.`);
      twiml.message('Acesse https://twil.io/whatsapp-5-minutos para ver nosso artigo explicando como foi desenvolvido.');
      break;

    case 'não':
    case 'nao':
    case 'no':
      twiml.message(`Que pena. Mas então bora jogar!`);
      twiml.message(`Você vai de *pedra*, *papel* ou *tesoura*?`);
      break;

    case 'spock':
    case 'lagarto':
    case 'lizard':
    case '🦎':
      twiml.message('Meus algorítmos de Machine Learning ainda não estão preparados para esse jogo mais complexo.\n\nVocê só pode escolher *pedra*, *papel* ou *tesoura*!')
        .media('https://pedrapapeltesoura-7902.twil.io/spock.png');
      break;
      
    default:
      twiml.message(`Quer jogar comigo?\nEnvie Pedra, Papel ou Tesoura!`);
      twiml.message('Se quiser saber sobre como esse jogo foi construído, envie *ajuda* para saber mais.');
      break;
  }
    
  // Este callback é o que retorna a reposta da chamada desta função.
  // Ele é realmente importante! Ex: você deve responder usando TWiML aqui para uma resposta de voz ou SMS/WhatsApp.
  // Ou deve retornar uma estrutura de dados JSON para um fluxo da Twilio Studio. Não se esqueça!

  return callback(null, twiml);
};