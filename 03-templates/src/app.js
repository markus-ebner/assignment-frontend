import $ from 'jquery';
import router from './router';
import homeTpl from './templates/home.hbs';
import playerTpl from './templates/player.hbs';
import contactTpl from './templates/contact.hbs';
import notFoundTpl from './templates/not-found.hbs';

const players = {
  'magnus': {
    player_name: 'Magnus Carlsen',
    img: 'https://cdn.worldchess.com/static/img/nyfide/carlsen_2x.png',
    desc: 'Carlsen is a former chess prodigy. He became a Grandmaster in 2004, at the age of 13 years, 148 days. This made him the third-youngest grandmaster in history.'
  },
  'sergey': {
    player_name: 'Sergey Karjakin',
    img: 'https://cdn.worldchess.com/static/img/nyfide/karjakin_2x.png',
    desc: 'On March 28, 2016, Sergey Karjakin became the Challenger to Magnus Carlsen in the World Chess Championship 2016 after winning the Candidates Tournament 2016 in Moscow.'
  }
};

const $app = $('#app');

function index() {
  $app.html(homeTpl());
}

function contact() {
  $app.html(contactTpl());
}

function players(player_att) {
  switch (player_att.params.player) {
    case 'magnus':
    case 'sergey':
      $app.html(playerTpl(players[player_att.params.player]));
      break;
    default:
      notFound();
      break;
  }
}

function notFound() {
  $app.html(notFoundTpl());
}

router('/', index);
router('/players/:player', players);
router('/contact', contact);
router('*', notFound);
router();
