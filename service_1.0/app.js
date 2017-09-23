var app = angular.module('BasicService', []);

/****** now creating a service to add products *****/

/**** Creating product service ****/
 app.service( 'Product', [ '$rootScope', function( $rootScope ) {
   var service = {
    products: [
       { pid: 1, name: "Laptop Lenovo" , price : 24000 },
       { pid: 2, name: "Laptop dell" , price : 28000  }
      ],
 
      addProduct: function ( prod ) {
       service.products.push(prod);
       $rootScope.$broadcast( 'product.update' );
     }
     
     
  }
 
   return service;
 }]);



/***Now defining a directive to add a product on list of product **/

app.directive('addProd' , ['Product' , function(Product){
  
  return {
    restrict : "A" ,
    link : function(scope, element, attrs){
      element.bind("click" , function(){
        Product.addProduct({id : 3  ,  name : "XXXXX" , price : 20000})
      })
      
    }
  }
}])

/**** now accessing that service from any controller or directive ****/
app.controller('MainCtrl', function($scope , Product   ) {
  
   $scope.$on( 'product.update', function( event ) {
     $scope.products = Product.products;
      console.log($scope.products );
     console.log("Product added ");
  });
  $scope.products = Product.products;
  
  $scope.name = 'Sample Service in Angular Js ';
});
