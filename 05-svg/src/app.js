import router from './router'
import homeTpl from './templates/home.hbs'
import simpleTpl from './templates/simple.hbs'
import styleTpl from './templates/style.hbs'
import animationTpl from './templates/animation.hbs'
import textTpl from './templates/text.hbs'
import interactionTpl from './templates/interaction.hbs'
import notFoundTpl from './templates/not-found.hbs'
import $ from "jquery";

const app = document.getElementById('app')

function index() {
  app.innerHTML = homeTpl()
}

function simple() {
  app.innerHTML = simpleTpl()
}

function style() {
  app.innerHTML = styleTpl()
}

function animation() {
  app.innerHTML = animationTpl()
}

function text() {
  app.innerHTML = textTpl()
}

function interaction() {
  app.innerHTML = interactionTpl();

  let cm = false, md = false;
  let positionCurrentSlider = 0, positionMouseX = 0;
  let foreground = $('#foreground');
  let background = $('#background');
  let slider = $('#slider');
  let sliderText = $('#slider-text');
  let slWidth= slider.attr('width'), bgWidth = background.attr('width');

  foreground.mousedown(function (event) {
    if(!cm) {
      md = true;
      positionMouseX = event.clientX;
    }
  });

  foreground.mousemove(function (event) {
    if(!md || cm)
      return;

    positionMouseX +=  parseInt(event.clientX - positionMouseX);
    positionCurrentSlider = parseInt(positionMouseX - slWidth);

    if(positionCurrentSlider >= slWidth && positionCurrentSlider <= bgWidth) {
      console.log("Width: " + positionCurrentSlider);
      slider.attr('width', positionCurrentSlider);
      sliderText.attr('transform', `translate(${positionCurrentSlider - slWidth},0)`);
    }
  });

  $(document).mouseup(function (){
    md = false;
    if(positionCurrentSlider >= bgWidth) {
      slider.attr('width', bgWidth);
      $('#committed').attr('visibility', 'visible');
      cm = true;
    }
    else {
      slider.attr('width', slWidth);
      sliderText.attr('transform', 'translate(0,0)');
    }
  });
}

function notFound() {
  app.innerHTML = notFoundTpl()
}
router('/', index)
router('/simple', simple)
router('/style', style)
router('/animation', animation)
router('/text', text)
router('/interaction', interaction)
router('*', notFound)
router()
