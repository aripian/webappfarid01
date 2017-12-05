var mainApp = angular.module("mainApp", ['angularModalService', 'ngFileSaver']);
         
mainApp.controller('mainController', function($scope, ModalService, FileSaver, $http) {

   $scope.loading = true;
   $scope.fbPost;

   $scope.init = function() {
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '1904182033194916',
          xfbml      : true,
          version    : 'v2.9'
        });
        // FB.AppEvents.logPageView();
        FB.api(
          '/pelaburanunittrust/posts',
          'GET',
          {"fields":"attachments","limit":"5","filter":"app_2305272732","access_token":"1904182033194916|17390b5fe586d667c92fcece088a0e8b"},
          function(response) {
            if(response){
              $scope.fbPost = response;
              $scope.loading = false;
              console.log(response);
              $scope.$apply()
            }
          }
        );
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
   }

   $scope.contactUs = function() {

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

  $scope.downloadBook = function() {

    ModalService.showModal({
      templateUrl: "contactus/ebook.html",
      controller: "contactController",
      inputs: {
        title: "Muat turun ebook"
      }
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        if(result.user){
          $http.post('/ebook',{
            data: result.user
          }).then(function success(response) {
              var blob = new Blob([response.data], { type: 'application/pdf' });
              FileSaver.saveAs(blob, 'PROJEK TAMBAH INCOME DENGAN UNIT TRUST.pdf');
              swal("Terima Kasih "+result.user.name+"!", "Ebook anda akan dimuat turun sebentar lagi", "success")
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