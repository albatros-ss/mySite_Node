'use strict';

const googleMap = (function () {

    function createMap() {
        const marker = new google.maps.Marker({
            position: new google.maps.LatLng(51.492038, 31.300086),
            map: map,
            icon: {url: 'assets/img/decor/map_marker.svg', scaledSize: new google.maps.Size(44, 54)}
        });
        const mapOptions = {
            // Приближение
            zoom: 14,
            // Координаты центра
            center: new google.maps.LatLng(51.496997, 31.289445), // Chernigov
            // Стили карты
            styles: [{"featureType": "administrative", "stylers": [{"visibility": "off"}]}, {
                "featureType": "poi",
                "stylers": [{"visibility": "simplified"}]
            }, {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{"visibility": "simplified"}]
            }, {"featureType": "water", "stylers": [{"visibility": "simplified"}]}, {
                "featureType": "transit",
                "stylers": [{"visibility": "simplified"}]
            }, {"featureType": "landscape", "stylers": [{"visibility": "simplified"}]}, {
                "featureType": "road.highway",
                "stylers": [{"visibility": "off"}]
            }, {"featureType": "road.local", "stylers": [{"visibility": "on"}]}, {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{"visibility": "on"}]
            }, {"featureType": "water", "stylers": [{"color": "#e7a731"}]}, {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [{"color": "#cd8920"}]
            }, {"featureType": "road.highway", "stylers": [{"color": "#d7d7d7"}]}],
            // Отключение стандартного интерфейса
            disableDefaultUI: true,
            // Отключение реакции на прокрутку колеса мыши
            scrollwheel: false
        };

        // Выбор элемента для карты
        let mapElement = document.getElementById('js-map');
        // Создание карты
        let map = new google.maps.Map(mapElement, mapOptions);
        marker.setMap(map);
    }

    return {
        init: () => createMap()
    }
})();
export default googleMap;