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

//-----------------------

var pinMap = document.querySelector('.tokyo__pin-map'); //сам тег
var pin = pinMap.querySelector('.pin').content;
var similarLodgeTemplate = document.querySelector('#lodge-template').content;
var dialogPanel = document.querySelector('.dialog__panel').content; //content?


//-----------

var lodges = [];

for (var i = 0; i < 8; i++) {
  var lodgeItem = {
    author: {
      avatar: 'img/avatars/user0' + (i+1) +'png'
    },

    offer: {
      title: TITLE[i],
      address: lodgeItem.location.x + ', ' + lodgeItem.location.y,
      price: randomInteger(1000, 1000000),
      type: TYPE[randomInteger(0, 2)], //здесь случайное значение?
      rooms: randomInteger(1, 5),
      guests: randomInteger(1, 15), //а здесь какой максимум?
      checkin: CHECKINOUT[randomInteger(0, 2)],
      checkout: CHECKINOUT[randomInteger(0, 2)],
      features: function () {
        var randomFeatures;
        for (i = 0; i <= randomInteger(0, 5); i++) {
          randomFeatures[i] = FEATURES[i];
        }

        return randomFeatures;
      },
      description: '',
      photos: []
    },

    location: {
      x: randomInteger(300, 900),
      y: randomInteger(100, 500)
    }
  };

  lodges[i] = lodgeItem;
}

var createPinMapElement = function (lodge) {
  var pinMapElement = pin.cloneNode(true);

  pinMapElement.setAttribute('style', 'left: ' + lodge.location.x + ';');
  pinMapElement.setAttribute('style', 'top: ' + lodge.location.y + ';');

  //pinMapElement.querySelector('.rounded').setAttribute('src', lodge.author.avatar);
  //или     можно и так и так?
  //координаты метки не учитывала
  pinMapElement.querySelector('.rounded').src = lodge.author.avatar;

  return pinMapElement;
  /* <div class="pin" style="left: {{location.x}}px; top: {{location.y}}px">
  <img src="{{author.avatar}}" class="rounded" width="40" height="40">
  </div> */
};

var createLodgeElement = function (lodge) {
  var lodgeElement = similarLodgeTemplate.cloneNode(true);

  lodgeElement.querySelector('.lodge__title').textContent = lodge.offer.title;
  lodgeElement.querySelector('.lodge__address').textContent = lodge.offer.address;
  lodgeElement.querySelector('.lodge__price').textContent = lodge.offer.price + '&#x20bd;/ночь';
  lodgeElement.querySelector('.lodge__type').textContent = ''; //нужна дополнительная функция, которая будет выводить значение в соответствии с типом?
  lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + lodge.offer.checkin + ' выезд до ' +  lodge.offer.checkout;
  lodgeElement.querySelector('.lodge__features').textContent = ''; //в процессе, скорее всего innerHTML
  lodgeElement.querySelector('.lodge__description').textContent = lodge.offer.description;

  return lodgeElement;
  /*Выведите заголовок объявления offer.title в блок .lodge__title
Выведите адрес offer.address в блок lodge__address
Выведите цену offer.price в блок lodge__price строкой вида {{offer.price}}&#x20bd;/ночь
В блок lodge__type выведите тип жилья offer.type: Квартира для flat, Бунгало для bungalo, Дом для house
Выведите количество гостей и комнат offer.rooms и offer.guests в блок .lodge__rooms-and-guests строкой вида Для {{offer.guests}} гостей в {{offer.rooms}} комнатах
Время заезда и выезда offer.checkin и offer.checkout в блок .lodge__checkin-time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}
В блок .lodge__features выведите все доступные удобства в квартире из массива {{offer.features}} пустыми спанами с классом feature__image feature__image--{{название удобства}}
В блок .lodge__description выведите описание объекта недвижимости offer.description
Замените src у аватарки пользователя — изображения, которое записано в .dialog__title — на значения поля author.avatar отрисовываемого объекта. */
};

var fragment = document.createDocumentFragment();

for (var j = 0; j < lodges.length; j++) {
  fragment.appendChild(createLodgeElement(lodges[j]));
}
