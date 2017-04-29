var mainApp = angular.module("mainApp", ['angularModalService']);
         
mainApp.controller('mainController', function($scope, ModalService) {

   $scope.contactUs = function() {

    //console.log("This works!")
    ModalService.showModal({
      templateUrl: "contactus/contactus.html",
      controller: "contactController",
      inputs: {
        title: "Hubungi Kami"
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        $scope.complexResult  = "Name: " + result.name + ", age: " + result.age;
      });
    });

  };

});

mainApp.controller('contactController', function($scope, $element, title, close) {

  $scope.name = null;
  $scope.age = null;
  $scope.title = title;
  
  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
     close({
      name: $scope.name,
      age: $scope.age
    }, 500); // close, but give 500ms for bootstrap to animate
  };

  //  This cancel function must use the bootstrap, 'modal' function because
  //  the doesn't have the 'data-dismiss' attribute.
  $scope.cancel = function() {

    //  Manually hide the modal.
    $element.modal('hide');
    
    //  Now call close, returning control to the caller.
    close({
      name: $scope.name,
      age: $scope.age
    }, 500); // close, but give 500ms for bootstrap to animate
  };

});