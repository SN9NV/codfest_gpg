gpg = angular.module('home', ['ngMaterial', 'ngMessages', 'ngRoute']);

gpg.controller('home__', function($scope, $timeout, $mdSidenav, $mdDialog) {
    document.title = "Home";

    $scope.toggleLeft = function() {
        $mdSidenav('left').toggle();
    };

    $scope.close = function() {
        console.log("Nav close");
        $mdSidenav('left').close();
    };

    $scope.login = function() {
        if (!$scope.userId) {

        }

        console.log("User: " + $scope.userId + "\nPassword: " + $scope.userPassword);
        $mdSidenav('left').close();
        $scope.openMap();
    };

    $scope.register = function(ev) {
        $mdSidenav('left').close();
        console.log("Opening register_form");
        $mdDialog.show({
            controller: dialog__,
            templateUrl: "register_form.html",
            parent: angular.element(document.body),
            targetEvent: ev,
            fullscreen: true
        });
    };

    $scope.openMap = function(ev, id) {
        $mdDialog.show({
            controller: dialog__,
            templateUrl: "map.html",
            parent: angular.element(document.body),
            targetEvent: ev,
            fullscreen: true
        });
    };

    function dialog__($scope, $mdDialog) {
        console.log("Opening dialog");
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.apply = function() {
            $mdDialog.hide();
            apply();
        };

        $scope.registerUser = function() {
            console.log("User registered");
        };
    }

    function apply() {
        if (!$scope.userId) {
            $mdSidenav('left').open();
        }
    }
});

gpg.controller('safety__', function($scope) {
	document.title = "Community Safety";
});

gpg.controller('jobs__', function($scope) {
	document.title = "Jobs";
});

gpg.controller('map__', function($scope) {
  $scope.gimme_heat = function(){
    load_heatmap();
    heatmap.setMap(heatmap.getMap() ? null : map);
  };
  $scope.showme_crimes = function(){
    console.log("Initiating incident loop");

    if (marker_on === 1)
    {
    //  setMapOnAll(map);
    }

    marker_on = marker_on ? 0 : 1;

    incidents.forEach(function(item) {
      console.log(item);
    //crimes.visible = false;
    //  item.setVisible(true ? false : true);

    if (marker_on === 1)
    {
      console.log("marker1");
        crimes = new google.maps.Marker({
        position: new google.maps.LatLng(item.latitude, item.longitude),
        map: map,
        icon: image,
        title: item.event,
        zIndex: parseInt(item.id)
      });
    }

    else {
      /*
      console.log("marker 0");
      crimes.setVisible(false);
      */
      console.log("marker1");
        crimes = new google.maps.Marker({
        position: new google.maps.LatLng(item.latitude, item.longitude),
        map: null,
        icon: image,
        title: item.event,
        zIndex: parseInt(item.id)
      });



    }

    });
    console.log(crimes.length);
    //  setMapOnAll(map);
  };

	document.title = "Map";
});

gpg.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'home__'
        })
        .when('/comm_safety', {
            templateUrl: 'comm_safety_home.html',
            controller: 'safety__'
        })
        .when('/jobs', {
            templateUrl: 'jobs.html',
            controller: 'jobs__'
        })
		.when('/map', {
			templateUrl: 'map.html',
			controller: 'map__'
		});
});
