var mainApp = angular.module("mainApp", ['angularModalService']);
         
mainApp.controller('mainController', function($scope, ModalService, $http) {

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
        if(result.user){
          $http.post('/sendmail',{
            data: result.user
          }).then(function success(response) {
              console.log(response)
              swal("Terima Kasih "+result.user.name+"!", "Kami akan menghubungi anda semula dalam masa 7 hari", "success")
          }, function myError(response) {
              $scope.myWelcome = response.statusText;
          });
        }
      });
    });

  };

});

mainApp.controller('contactController', function($scope, $element, title, close) {

  $scope.user = null;
  $scope.title = title;

  $scope.state = ['Johor','Kedah','Kelantan','Melaka','Pahang','Perak','Perlis','Pulau Pinang','Sabah','Sarawak','Selangor','Terengganu','W.P Kuala Lumpur','W.P Labuan','W.P Putrajaya']
  
  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
     close({
      user: $scope.user
    }, 500); // close, but give 500ms for bootstrap to animate
  };

  //  This cancel function must use the bootstrap, 'modal' function because
  //  the doesn't have the 'data-dismiss' attribute.
  $scope.cancel = function() {

    //  Manually hide the modal.
    $element.modal('hide');
    
    //  Now call close, returning control to the caller.
    close({
      user: null
    }, 500); // close, but give 500ms for bootstrap to animate
  };

});