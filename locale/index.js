

exports.countries = function() {
	var l = {
		'se': 'Sverige',
		'en': 'USA'
	};

	var list = [];

	for (i in l) {
		var key = i;
		var value = l[i];

		var object = {};
		object[key] = value;
		list.push(object);
	}

	return list;
}

exports.en = function() {
	var a = {};
	a.tagLine = "Create a free beautiful invoice online and get the pdf."
	a.download = "Download";
	a.add = "Add";
	a.remove = "Remove";

	a.invoice = {};
	invoice = a.invoice;
	invoice.invoiceText = "Invoice";
	invoice.currencySymbol = '$';
	invoice.from = "Company Name\nAddress";
	invoice.to = "Name\nAddress";
	invoice.id = "001";
	invoice.items = [];
	invoice.companyName = "Company Name";
	invoice.itemDescriptionLabel = "Description";
	invoice.itemPriceLabel = "Price ($)";

	invoice.idLabel = "Invoice ID";
	invoice.dateLabel = "Invoice Date";
	invoice.dueDateLabel = "Due Date";

	invoice.subtotalLabel = "Subtotal";
	invoice.vatLabel = "Sales Tax (10%)";
	invoice.totalLabel = "Total";
	invoice.message = "Thank you for your purchase!";

	invoice.fromLabel = "From";
	invoice.toLabel = "To";

	invoice.items = [
		{description: 'example 1', price: '100'},
		{description: 'example 2', price: '200'},
	];

	date = new Date();
	invoice.date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

	date = new Date(date.getTime() + 1000 * 3600 * 24 * 30);
	invoice.dueDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

	return a;
};

exports.se = function() {
	var a = {};
	a.tagLine = "Skapa en gratis faktura online och ladda ner som pdf."
	a.download = "Ladda ner";
	a.add = "Lägg till";
	a.remove = "Ta bort";

	a.invoice = {};
	invoice = a.invoice;
	invoice.invoiceText = "Faktura";
	invoice.currencySymbol = '$';
	invoice.from = "Namn\nAdress";
	invoice.to = "Namn\nAdress";
	invoice.id = "001";
	invoice.items = [];
	invoice.companyName = "Företagsnamn";
	invoice.itemDescriptionLabel = "Specifikation";
	invoice.itemPriceLabel = "Belopp (SEK)";

	invoice.idLabel = "Fakturanummer";
	invoice.dateLabel = "Fakturadatum";
	invoice.dueDateLabel = "Förfallodatum";

	invoice.subtotalLabel = "Symma";
	invoice.vatLabel = "Moms (25%)";
	invoice.totalLabel = "Att betala";
	invoice.message = "Tack för ditt köp!";

	invoice.fromLabel = "Från";
	invoice.toLabel = "Till";

	invoice.footerColumn0 = "Telefon:\nxxx-xxx xx xx";
	invoice.footerColumn1 = "E-post:\nnamn@företag.se";
	invoice.footerColumn2 = "Org.nr: xxx\nMomsreg.nr: xxx\nGodkänd för F-skatt";

	invoice.items = [
		{description: 'exempel 1', price: '100'},
		{description: 'exampel 2', price: '200'},
	];

	date = new Date();
	invoice.date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

	date = new Date(date.getTime() + 1000 * 3600 * 24 * 30);
	invoice.dueDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

	return a;
};