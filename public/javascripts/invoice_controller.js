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

	// Construct the invoice
	var invoice;

	// If it was recieved to be statically, rendered, it will be recieved from here.
	if (typeof globalStaticInvoice !== 'undefined') {
    	invoice = globalStaticInvoice;
	}

	// Else, create default values
	else {
		invoice = {};
		invoice.currencySymbol = '$';
		invoice.vatPercentage = '0.25';
		invoice.from = "Company Name\nAddress";
		invoice.to = "Company Name\nAddress";
		invoice.id = "001";
		invoice.items = [];
		invoice.companyName = "Company Name";
		invoice.invoiceText = "Invoice";

		var date = new Date();
	    invoice.date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

		date = new Date(date.getTime() + 1000 * 3600 * 24 * 30);
		invoice.dueDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
	}


	// Set the constructed invoice
	$scope.invoice = invoice;

	// Copy to global scope to ajax can get it
	globalInvoice = $scope.invoice;
	

	$scope.updateSummary = function() {

		var subtotalPrice = 0;

		for (i in $scope.invoice.items) {
			var item = $scope.invoice.items[i];
			subtotalPrice += parseInt(item.price, 10);
		}
		
		$scope.invoice.subtotalPrice = subtotalPrice;
		$scope.invoice.vatAmount = $scope.invoice.subtotalPrice * $scope.invoice.vatPercentage;
		

		$scope.invoice.totalPrice = $scope.invoice.subtotalPrice + $scope.invoice.vatAmount;


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

