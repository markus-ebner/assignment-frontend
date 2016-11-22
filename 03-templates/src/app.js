import $ from 'jquery'
import router from './router'
import homeTpl from './templates/home.hbs'
import playerTpl from './templates/player.hbs'
import contactTpl from './templates/contact.hbs'
import notFoundTpl from './templates/not-found.hbs'

const data = {
  'magnus': {
    name: 'Magnus Carlsen',
    image: 'https://cdn.worldchess.com/static/img/nyfide/carlsen_2x.png',
    description: 'Carlsen is a former chess prodigy. He became a Grandmaster in 2004, at the age of 13 years, 148 days. This made him the third-youngest grandmaster in history.'
  },
  'sergey': {
    name: 'Sergey Karjakin',
    image: 'https://cdn.worldchess.com/static/img/nyfide/karjakin_2x.png',
    description: 'On March 28, 2016, Sergey Karjakin became the Challenger to Magnus Carlsen in the World Chess Championship 2016 after winning the Candidates Tournament 2016 in Moscow.'
  }
}

const $app = $('#app')

function index() {
  $app.html(homeTpl())
}

function contact() {
  $app.html(contactTpl())
}

function players(ctx) {
  let player = {
    name: 'Anonymous',
    'image': 'http://placehold.it/350x350',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }
  switch (ctx.params.player) {
    case 'magnus':
    case 'sergey':
      player = data[ctx.params.player]
      break;
  }
  $app.html(playerTpl(player))
}

function notFound() {
  $app.html(notFoundTpl())
}

router('/', index)
router('/players/:player', players)
router('/contact', contact)
router('*', notFound)
router()
