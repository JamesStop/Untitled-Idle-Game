var CurrentResourceCollecting;

var PlayerStats = {
	Health: 100,
	Mana: 0,
	SpellPower: 1,
};

var ResourceCollectionSpeed = {
	Gold: 1,
	Mythril: 1,
	Herb: 1,
	Yew: 1,
	Crystal: 1,
	Arcana: 1,
};

var CurrentCurrency = {
	Gold: 0,
	Mythril: 0,
	Herb: 0,
	Yew: 0,
	Crystal: 0,
	Arcana: 0,
};

var PerSec = {
	Gold: 0,
	Mythril: 0,
	Herb: 0,
	Yew: 0,
	Crystal: 0,
	Arcana: 0,
};

var CurrentStorage = {
	Gold: 0,
	Mythril: 0,
	Herb: 0,
	Yew: 0,
	Crystal: 0,
	Arcana: 0,
};

var StorageCost = {
	Base: 50,
	Gold: 50,
	Mythril: 50,
	Herb: 50,
	Yew: 50,
	Crystal: 50,
	Arcana: 50,
};

var CurrentProducer = {
	Gold: 1,
	Mythril: 1,
	Herb: 1,
	Yew: 1,
	Crystal: 1,
	Arcana: 1,
};

var ProducerCost = {
	Base: 100,
	Gold: 100,
	Mythril: 100,
	Herb: 100,
	Yew: 100,
	Crystal: 100,
	Arcana: 100,
};

var CurrencyMax = {
	Base: 250,
	Gold: 250,
	Mythril: 250,
	Herb: 250,
	Yew: 250,
	Crystal: 250,
	Arcana: 250,
};

function WakeeWakee() {
	document.querySelector('#Wakey1').style.display = 'flex';
	document.querySelector('#Wakey2').style.display = 'flex';
	document.querySelector('#Waker').style.display = 'none';
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
	resetFirst.remove('colorInactive');
	resetFirst.remove('colorActive');
	resetFirst.add('colorInactive');
	var resetSecond = document.querySelector('#MythrilBar').classList;
	resetSecond.remove('colorInactive');
	resetSecond.remove('colorActive');
	resetSecond.add('colorInactive');
	var resetThird = document.querySelector('#HerbBar').classList;
	resetThird.remove('colorInactive');
	resetThird.remove('colorActive');
	resetThird.add('colorInactive');
	var resetFourth = document.querySelector('#YewBar').classList;
	resetFourth.remove('colorInactive');
	resetFourth.remove('colorActive');
	resetFourth.add('colorInactive');
	var resetFourth = document.querySelector('#CrystalBar').classList;
	resetFourth.remove('colorInactive');
	resetFourth.remove('colorActive');
	resetFourth.add('colorInactive');
	var resetFourth = document.querySelector('#ArcanaBar').classList;
	resetFourth.remove('colorInactive');
	resetFourth.remove('colorActive');
	resetFourth.add('colorInactive');
}

function colorChange(id) {
	let changeId = `#${id}Bar`;
	var changeBlue = document.querySelector(changeId).classList;
	changeBlue.remove('colorInactive');
	changeBlue.remove('colorActive');
	changeBlue.add('colorActive');
}

function SetGetResources(what) {
	colorReset();
	if (window.CurrentResourceCollecting == what) {
		window.CurrentResourceCollecting = '';
	} else {
		window.CurrentResourceCollecting = what;
		colorChange(what);
	}
}

function CollectingResources(resource, number) {
	if (CurrentCurrency[resource] + number < CurrencyMax[resource]) {
		CurrentCurrency[resource] = CurrentCurrency[resource] + number;
		PerSec[resource] = number;
	} else {
		CurrentCurrency[resource] = CurrencyMax[resource];
		PerSec[resource] = number;
	}
	if (resource != 'Gold') {
		PerSec.Gold = 0;
	}
	if (resource != 'Mythril') {
		PerSec.Mythril = 0;
	}
	if (resource != 'Herb') {
		PerSec.Herb = 0;
	}
	if (resource != 'Yew') {
		PerSec.Yew = 0;
	}
	if (resource != 'Crystal') {
		PerSec.Crystal = 0;
	}
	if (resource != 'Arcana') {
		PerSec.Arcana = 0;
	}
	document.getElementById(resource).innerHTML = CurrentCurrency[resource];
	document.getElementById('PerSec.Gold').innerHTML = PerSec.Gold;
	document.getElementById('PerSec.Mythril').innerHTML = PerSec.Mythril;
	document.getElementById('PerSec.Herb').innerHTML = PerSec.Herb;
	document.getElementById('PerSec.Yew').innerHTML = PerSec.Yew;
	document.getElementById('PerSec.Crystal').innerHTML = PerSec.Crystal;
	document.getElementById('PerSec.Arcana').innerHTML = PerSec.Arcana;
	
}

function buyStorage(Storer) {
	StorageCost[Storer] = Math.floor(
		StorageCost.Base * Math.pow(2, CurrentStorage[Storer])
	);
	if (CurrentCurrency[Storer] >= StorageCost[Storer]) {
		CurrentStorage[Storer] = CurrentStorage[Storer] + 1;
		CurrentCurrency[Storer] = CurrentCurrency[Storer] - StorageCost[Storer];
		CurrencyMax[Storer] = Math.floor(
			CurrencyMax.Base * Math.pow(2, CurrentStorage[Storer])
		);
		document.getElementById(Storer).innerHTML = CurrentCurrency[Storer];
	}
	document.getElementById('CurrencyMax.Gold').innerHTML = CurrencyMax.Gold;
	document.getElementById('CurrencyMax.Mythril').innerHTML =
		CurrencyMax.Mythril;
	document.getElementById('CurrencyMax.Herb').innerHTML = CurrencyMax.Herb;
	document.getElementById('CurrencyMax.Yew').innerHTML = CurrencyMax.Yew;
	document.getElementById('CurrencyMax.Crystal').innerHTML =
		CurrencyMax.Crystal;
	document.getElementById('CurrencyMax.Arcana').innerHTML = CurrencyMax.Arcana;
}

function buyProduction(Producer) {
	ProducerCost[Producer] = Math.floor(
		ProducerCost.Base * Math.pow(1.5, CurrentProducer[Producer] - 1)
	);
	if (CurrentCurrency[Producer] >= ProducerCost[Producer]) {
		CurrentProducer[Producer] = CurrentProducer[Producer] + 1;
		CurrentCurrency[Producer] =
			CurrentCurrency[Producer] - ProducerCost[Producer];
		ResourceCollectionSpeed[Producer] = ResourceCollectionSpeed[Producer] + 1;
		document.getElementById(Producer).innerHTML = CurrentCurrency[Producer];
	}
}

window.setInterval(function () {
	if (CurrentResourceCollecting) {
		CollectingResources(
			CurrentResourceCollecting,
			ResourceCollectionSpeed[CurrentResourceCollecting]
		);
	}
}, 100);
