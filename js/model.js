var data = [
	{ value: "0" },
	{ value: "1" },	
	{ value: "2" },
	{ value: "3" },
	{ value: "5" },
	{ value: "8" },
	{ value: "13" },
	{ value: "20" },
	{ value: "40" },
	{ value: "100" },
	{ value: "?" },
	{ value: "coffee" },
];

var CardModel = function(cards) {
	var self = this;
	
    self.registerClick = function(i) {		
		self.cards.remove( function (item) { 
			return item.value !== i.value; 
		});
		
		self.selected(true);
		self.mainMessage("Selected!");
		self.countDown("");		
    };		
	
	self.mainMessage = ko.observable("Please select card in ");
	self.countDown = ko.observable(15);
	self.selected = ko.observable(false);
	
	setInterval(function() {
        var newTimer = self.countDown();
		if(self.selected() === false) {
			newTimer -= 1;
			self.countDown(newTimer <= 0 ? 0 : newTimer);
			if(self.countDown() === 0) {
				self.cards.removeAll();
				self.mainMessage("Timeout!");
				self.countDown("");
			}
		}
    }, 1000);
	
	self.cards =  ko.observableArray(ko.utils.arrayMap(data, function(data) {
        return { value: data.value };
    }));
};

ko.applyBindings(new CardModel(data));
