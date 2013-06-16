

function InvoiceController($scope) {

	$scope.invoice = {'test' : 'test22'};

	
	$scope.currencySymbol = '$';
	$scope.vatPercentage = '0.25';

	$scope.from = "Company Name\nAdress";
	$scope.to = "Company Name\nAdress";
	$scope.invoiceID = "001";

	var date = new Date();
    $scope.date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

    date = new Date(date.getTime() + 1000 * 3600 * 24 * 30);
    $scope.dueDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

	$scope.items = [
		{description:'item', price:500},
	];

	$scope.updateSummary = function() {

		var subtotalPrice = 0;

		for (i in $scope.items) {
			var item = $scope.items[i];
			subtotalPrice += parseInt(item.price, 10);
		}
		
		$scope.subtotalPrice = subtotalPrice;
		$scope.vatAmount = $scope.subtotalPrice * $scope.vatPercentage;
		

	$scope.totalPrice = $scope.subtotalPrice + $scope.vatAmount;

	}; $scope.updateSummary();

	$scope.updateTo = function() {
		$scope.totalPrice = 0;
	}; $scope.updateSummary();

	$scope.addItem = function() {
		var item = {
			description: $scope.description,
			price: $scope.price,
		}
		$scope.items.push(item);

		$scope.description = '';
		$scope.price = '';

		$scope.updateSummary();
	};

	$scope.removeItem = function(index) {
		console.log("remove");
		$scope.items.splice(index, 1);
		$scope.updateSummary();
	};
}

