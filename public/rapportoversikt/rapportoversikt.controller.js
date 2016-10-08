(function () {
  "use strict";

  angular.module("angularAuth")
  .controller("rapportoversiktCtrl", rapportoversiktCtrl);

  rapportoversiktCtrl.$inject = ["$scope", "FirebaseService"];
  function rapportoversiktCtrl($scope, FirebaseService) {

    $scope.valgtSjanger = "velg";
    $scope.valgtScene = "velg";

    $scope.filterFunction = function() {
      var bookings = $scope.mainBookinger;
      var filtrertList = new Object();
      for (var dato in bookings) {
        var filtrertDato = new Object;
        angular.forEach(bookings[dato], function(value,key) {
          if($scope.isValidFilter(value)) {
            filtrertDato[key] = value;
          }
        });
        if(!($.isEmptyObject(filtrertDato))) {
          filtrertList[dato] = filtrertDato;
        }
      }
      $scope.filtrertListe = filtrertList;
    }

    $scope.isValidFilter = function(value) {
      var today = new Date();
      if(value.status != 'aktiv') {
        return false;
      } else if (($scope.searchingString != undefined) && (value.artist.toLowerCase().indexOf($scope.searchingString.toLowerCase()) == -1)){
        return false;
      } else if ((value.scene != $scope.valgtScene && $scope.valgtScene != "velg")) {
        return false;
      } else if((value.sjanger.indexOf($scope.valgtSjanger) == -1) && ($scope.valgtSjanger != "velg")) {
        return false;
      } else if ((($scope.visTidligereArrangementer != true) && (today > $scope.intToDateFunction(value.dato)))) {
        return false;
      }
      return true;
    }

    $scope.$watch('mainBookinger', function() {
      $scope.filterFunction();
    });

    $scope.intToDateFunction = function(tall) {
      tall = String(tall);
      var dato = new Date(tall.substring(0,4) + "/" + tall.substring(4,6) + '/' + tall.substring(6,8));
      return dato;
    }    


    $scope.updateModal = function(key, konsert) {
      $scope.modalInformation = konsert;
      if($scope.hasRapport == true) {
        $scope.modalRapport = $scope.mainRapporter[key];
      }
    }

    $scope.hasRapportFunction = function(key) {
      if(key in $scope.mainRapporter) {
        $scope.hasRapport = true;
      } else {
        $scope.hasRapport = false;
      }
    }

    $scope.clearModalRapport = function(){
      $scope.modalRapport = null;
    }
    
  }
})();
