import $ from 'jquery';

var routes = [];

export default function router(path, cb) {
  if(!path && !cb )
    doit();
  else {
    routes.push({ route: HandleDynamicWithRegex(path), handler: cb });
  }

}
function doit() {
  $(window).on('load', loading);
  $(window).on('popstate',popping );
  $(document).on('click', 'a', handleLink);
}
function loading() {
  goto(location.pathname)
}
function popping() {
  goto(location.pathname)
}
function handleLink(event) {
  var $evt = $(event.currentTarget);
  if (!($evt.get(0).host !== location.host) || $evt.attr('rel') === 'external' || $evt.attr('rel') === 'download') {
    event.preventDefault();
    goto($evt.attr('href'));
  }
}

function goto(path) {
  for (var routeAndCB of routes) {
    if (routeAndCB.route.test(path)) {
      AddHistoryPush(path);
      if(path.split('/')[2] !== undefined)
        routeAndCB.handler(path.split('/')[2]);
      else
        routeAndCB.handler();
      return;
    }
  }
  routes[routes.length - 1].handler();
}

function AddHistoryPush(route) {
  if (history.state != route) {
    window.history.pushState(route, '', route);
  }
}

function HandleDynamicWithRegex(route) {
  if(route == '*')
    route = '\\*';
  else
    route = route.replace(/:[a-z]{0,}(?=\/|$)/, "[a-z]{1,}(?=\/|$)");

  return new RegExp(route + '$');
}
