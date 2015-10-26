
var myAppModule = angular.module('myApp', ['ngRoute']);
myAppModule.config(function($routeProvider, $locationProvider) {
    
   
  $routeProvider
   .when('/add', {
    templateUrl: 'views/ticket.html',
    controller: 'ticketController',
    }
    ).when('/edit/:param1',{
  
   templateUrl: 'views/edit.html',
    controller: 'ticketEditController'
  
  
    }).when('/',{
  
     templateUrl: 'views/list.html',
    controller: 'ticketListController'
  
  })





});