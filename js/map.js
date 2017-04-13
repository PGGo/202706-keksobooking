'use strict';

var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var TYPE = ['flat', 'house', 'bungalo'];

var CHECKINOUT = ['12:00', '13:00', '14:00'];

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var randomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};


var pinMap = document.querySelector('.tokyo__pin-map');
var pin = pinMap.querySelector('.pin');
var similarLodgeTemplate = document.querySelector('#lodge-template').content;
var dialogPanel = document.querySelector('.dialog__panel');
var dialogTitle = document.querySelector('.dialog__title');
var offerDialog = document.querySelector('#offer-dialog');


var translateLodgeType = function (type) {
  var typeOfLodge = type;
  switch (typeOfLodge) {
    case 'flat':
      typeOfLodge = 'Квартира';
      break;
    case 'house':
      typeOfLodge = 'Дом';
      break;
    case 'bungalo':
      typeOfLodge = 'Бунгало';
      break;
  }

  return typeOfLodge;
};

var getRandomFeatures = function () {
  var randomFeatures = [];
  var randomFeaturesNumber = randomInteger(0, 5);
  for (var i = 0; i <= randomFeaturesNumber; i++) {
    randomFeatures[i] = FEATURES[i];
  }

  return randomFeatures;
};

var getLodgeFeatures = function (features) {
  var lodgeFeatures = '';
  for (var i = 0; i < features.length; i++) {
    lodgeFeatures = lodgeFeatures + '<span class="feature__image feature__image--' + features[i] + '"></span>';
  }

  return lodgeFeatures;
};

var generateLodges = function () {
  var lodges = [];

  for (var i = 0; i < 8; i++) {
    var lodgeItem = {};

    lodgeItem.author = {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    };

    lodgeItem.location = {
      x: randomInteger(300, 900),
      y: randomInteger(100, 500)
    };

    lodgeItem.offer = {
      title: TITLE[i],
      address: lodgeItem.location.x + ', ' + lodgeItem.location.y,
      price: randomInteger(1000, 1000000),
      type: TYPE[randomInteger(0, 2)],
      rooms: randomInteger(1, 5),
      guests: randomInteger(1, 15),
      checkin: CHECKINOUT[randomInteger(0, 2)],
      checkout: CHECKINOUT[randomInteger(0, 2)],
      features: getRandomFeatures(),
      description: '',
      photos: []
    };

    lodges.push(lodgeItem);
  }

  return lodges;
};


var createPinMapElement = function (lodge) {
  var pinMapElement = pin.cloneNode(true);

  var widthPin = pin.querySelector('.rounded').width;
  var heightPin = pin.querySelector('.rounded').height;

  pinMapElement.setAttribute('style', 'left: ' + (lodge.location.x - widthPin / 2) + 'px; ' + 'top: ' + (lodge.location.y - heightPin) + 'px;');

  pinMapElement.querySelector('.rounded').setAttribute('src', lodge.author.avatar);


  return pinMapElement;
};

var createAvatarElement = function (lodge) {
  var avatarElement = dialogTitle.cloneNode(true);

  avatarElement.querySelector('img').setAttribute('src', lodge.author.avatar);

  return avatarElement;
};

var createLodgeElement = function (lodge) {
  var lodgeElement = similarLodgeTemplate.cloneNode(true);

  lodgeElement.querySelector('.lodge__title').textContent = lodge.offer.title;
  lodgeElement.querySelector('.lodge__address').textContent = lodge.offer.address;
  lodgeElement.querySelector('.lodge__price').innerHTML = lodge.offer.price + '&#x20bd;/ночь';
  lodgeElement.querySelector('.lodge__type').textContent = translateLodgeType(lodge.offer.type);
  lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + lodge.offer.checkin + ' выезд до ' + lodge.offer.checkout;
  lodgeElement.querySelector('.lodge__features').innerHTML = getLodgeFeatures(lodge.offer.features);
  lodgeElement.querySelector('.lodge__description').textContent = lodge.offer.description;

  return lodgeElement;
};


var renderPinMap = function (pinMapArr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pinMapArr.length; i++) {
    fragment.appendChild(createPinMapElement(pinMapArr[i]));
  }

  pinMap.appendChild(fragment);
};

var renderLodges = function (lodgeArr) {
  var fragment = document.createDocumentFragment();

  fragment.appendChild(createLodgeElement(lodgeArr[1]));

  offerDialog.replaceChild(fragment, dialogPanel);

  offerDialog.replaceChild(createAvatarElement(lodgeArr[1]), dialogTitle);
};

renderPinMap(generateLodges());
renderLodges(generateLodges());
