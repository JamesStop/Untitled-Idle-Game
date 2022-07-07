var currentResourceCollecting;

var playerStats = {
	health: 100,
	mana: 0,
	spellPower: 1,
};

var resourceCollectionSpeed = {
	Gold: 1,
	Mythril: 1,
	Herb: 1,
	Yew: 1,
	Crystal: 1,
	Arcana: 1,
};

var currentCurrency = {
	Gold: 0,
	Mythril: 0,
	Herb: 0,
	Yew: 0,
	Crystal: 0,
	Arcana: 0,
};

var perSec = {
	Gold: 0,
	Mythril: 0,
	Herb: 0,
	Yew: 0,
	Crystal: 0,
	Arcana: 0,
};

var currentStorage = {
	Gold: 0,
	Mythril: 0,
	Herb: 0,
	Yew: 0,
	Crystal: 0,
	Arcana: 0,
};

var storageCost = {
	Base: 50,
	Gold: 50,
	Mythril: 50,
	Herb: 50,
	Yew: 50,
	Crystal: 50,
	Arcana: 50,
};

var currentProducer = {
	Gold: 1,
	Mythril: 1,
	Herb: 1,
	Yew: 1,
	Crystal: 1,
	Arcana: 1,
};

var producerCost = {
	Base: 100,
	Gold: 100,
	Mythril: 100,
	Herb: 100,
	Yew: 100,
	Crystal: 100,
	Arcana: 100,
};

var currencyMax = {
	Base: 250,
	Gold: 250,
	Mythril: 250,
	Herb: 250,
	Yew: 250,
	Crystal: 250,
	Arcana: 250,
};

function wakeeWakee() {
	document.querySelector('#wakey1').style.display = 'flex';
	document.querySelector('#wakey2').style.display = 'flex';
	document.querySelector('#waker').style.display = 'none';
}

function SelectUpgradesTab() {
	document.querySelector('#UpgradesTab').style.display = 'flex';
	document.querySelector('#SpellBookTab').style.display = 'none';
	document.querySelector('#GolemsTab').style.display = 'none';
	document.querySelector('#SomethingTab').style.display = 'none';
}

function SelectSpellBookTab() {
	document.querySelector('#UpgradesTab').style.display = 'none';
	document.querySelector('#SpellBookTab').style.display = 'flex';
	document.querySelector('#GolemsTab').style.display = 'none';
	document.querySelector('#SomethingTab').style.display = 'none';
}

function SelectGolemsTab() {
	document.querySelector('#UpgradesTab').style.display = 'none';
	document.querySelector('#SpellBookTab').style.display = 'none';
	document.querySelector('#GolemsTab').style.display = 'flex';
	document.querySelector('#SomethingTab').style.display = 'none';
}

function SelectSomethingTab() {
	document.querySelector('#UpgradesTab').style.display = 'none';
	document.querySelector('#SpellBookTab').style.display = 'none';
	document.querySelector('#GolemsTab').style.display = 'none';
	document.querySelector('#SomethingTab').style.display = 'flex';
}

function colorReset() {
	let resetFirst = document.querySelector('#GoldBar').classList;
	resetFirst.remove('color-inactive');
	resetFirst.remove('color-active');
	resetFirst.add('color-inactive');
	var resetSecond = document.querySelector('#MythrilBar').classList;
	resetSecond.remove('color-inactive');
	resetSecond.remove('color-active');
	resetSecond.add('color-inactive');
	var resetThird = document.querySelector('#HerbBar').classList;
	resetThird.remove('color-inactive');
	resetThird.remove('color-active');
	resetThird.add('color-inactive');
	var resetFourth = document.querySelector('#YewBar').classList;
	resetFourth.remove('color-inactive');
	resetFourth.remove('color-active');
	resetFourth.add('color-inactive');
	var resetFourth = document.querySelector('#CrystalBar').classList;
	resetFourth.remove('color-inactive');
	resetFourth.remove('color-active');
	resetFourth.add('color-inactive');
	var resetFourth = document.querySelector('#ArcanaBar').classList;
	resetFourth.remove('color-inactive');
	resetFourth.remove('color-active');
	resetFourth.add('color-inactive');
}

function colorChange(id) {
	let changeId = `#${id}Bar`;
	var changeBlue = document.querySelector(changeId).classList;
	changeBlue.remove('color-inactive');
	changeBlue.remove('color-active');
	changeBlue.add('color-active');
}

function SetGetResources(what) {
	colorReset();
	if (window.currentResourceCollecting == what) {
		window.currentResourceCollecting = '';
	} else {
		window.currentResourceCollecting = what;
		colorChange(what);
	}
}

function CollectingResources(resource, number) {
	if (currentCurrency[resource] + number < currencyMax[resource]) {
		currentCurrency[resource] = currentCurrency[resource] + number;
		perSec[resource] = number;
	} else {
		currentCurrency[resource] = currencyMax[resource];
		perSec[resource] = number;
	}
	if (resource != 'Gold') {
		perSec.Gold = 0;
	}
	if (resource != 'Mythril') {
		perSec.Mythril = 0;
	}
	if (resource != 'Herb') {
		perSec.Herb = 0;
	}
	if (resource != 'Yew') {
		perSec.Yew = 0;
	}
	if (resource != 'Crystal') {
		perSec.Crystal = 0;
	}
	if (resource != 'Arcana') {
		perSec.Arcana = 0;
	}
	document.getElementById(resource).innerHTML = currentCurrency[resource];
	document.getElementById('PerSec.Gold').innerHTML = perSec.Gold;
	document.getElementById('PerSec.Mythril').innerHTML = perSec.Mythril;
	document.getElementById('PerSec.Herb').innerHTML = perSec.Herb;
	document.getElementById('PerSec.Yew').innerHTML = perSec.Yew;
	document.getElementById('PerSec.Crystal').innerHTML = perSec.Crystal;
	document.getElementById('PerSec.Arcana').innerHTML = perSec.Arcana;
}

function buyStorage(storer) {
	storageCost[storer] = Math.floor(
		storageCost.Base * Math.pow(2, currentStorage[storer])
	);
	if (currentCurrency[storer] >= storageCost[storer]) {
		currentStorage[storer] = currentStorage[storer] + 1;
		currentCurrency[storer] = currentCurrency[storer] - storageCost[storer];
		currencyMax[storer] = Math.floor(
			currencyMax.Base * Math.pow(2, currentStorage[storer])
		);
		document.getElementById(storer).innerHTML = currentCurrency[storer];
	}
	document.getElementById(`CurrencyMax.${storer}`).innerHTML =
		currencyMax[storer];
}

function buyProduction(producer) {
	producerCost[producer] = Math.floor(
		producerCost.Base * Math.pow(1.5, currentProducer[producer] - 1)
	);
	if (currentCurrency[producer] >= producerCost[producer]) {
		currentProducer[producer] = currentProducer[producer] + 1;
		currentCurrency[producer] =
			currentCurrency[producer] - producerCost[producer];
		resourceCollectionSpeed[producer] = resourceCollectionSpeed[producer] + 1;
		document.getElementById(producer).innerHTML = currentCurrency[producer];
	}
}

window.setInterval(function () {
	if (currentResourceCollecting) {
		CollectingResources(
			currentResourceCollecting,
			resourceCollectionSpeed[currentResourceCollecting]
		);
	}
}, 100);
