/*
// declare a module
var appModule = angular.module('appModule', []);

// Create a service
appModule.factory('appService', function() {
  var serviceInstance;
  


  return serviceInstance;
});
*/

var globalInvoice = null;

function InvoiceController($scope) {

	var initialInvoice = {};

	// If it was recieved to be statically, rendered, it will be recieved from here.
	if (typeof globalStaticInvoice !== 'undefined') {
    	initialInvoice = globalStaticInvoice;
	}



	$scope.invoice = initialInvoice;
	// Copy to global scope to ajax can get it
	globalInvoice = $scope.invoice;
	
	$scope.invoice.currencySymbol = '$';
	$scope.invoice.vatPercentage = '0.25';

	$scope.invoice.from = "Company Name\nAdress";
	$scope.invoice.to = "Company Name\nAdress";
	$scope.invoice.id = "001";

	var date = new Date();
    $scope.invoice.date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

    date = new Date(date.getTime() + 1000 * 3600 * 24 * 30);
    $scope.invoice.dueDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

	$scope.invoice.items = [
		{description:'item', price:500},
	];

	$scope.updateSummary = function() {

		var subtotalPrice = 0;

		for (i in $scope.items) {
			var item = $scope.items[i];
			subtotalPrice += parseInt(item.price, 10);
		}
		
		$scope.invoice.subtotalPrice = subtotalPrice;
		$scope.invoice.vatAmount = $scope.invoice.subtotalPrice * $scope.invoice.vatPercentage;
		

		$scope.invoice.totalPrice = $scope.invoice.subtotalPrice + $scope.invoice.vatAmount;

	}; $scope.updateSummary();

	$scope.updateTo = function() {
		$scope.invoice.totalPrice = 0;
	}; $scope.updateSummary();

	$scope.addItem = function() {
		var item = {
			description: $scope.newItem.description,
			price: $scope.newItem.price,
		}
		$scope.invoice.items.push(item);

		$scope.newItem.description = '';
		$scope.newItem.price = '';

		$scope.updateSummary();
	};

	$scope.removeItem = function(index) {
		console.log("remove");
		$scope.invoice.items.splice(index, 1);
		$scope.updateSummary();
	};
}

