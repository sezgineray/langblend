var onOffSwitch = document.getElementById('onOffSwitch');
var spanishRadioButton = document.getElementById('spanishRadioButton');
var germanRadioButton = document.getElementById('germanRadioButton');
var frenchRadioButton = document.getElementById('frenchRadioButton');

// var onOffSwitchLabel = document.getElementById('onOffSwitchLabel');

chrome.storage.local.get(['isEnabled', 'selectedLanguage'], data => {
	let isEnabled = !!data.isEnabled
	onOffSwitch.checked = isEnabled;
	// onOffSwitchLabel.innerHTML = isEnabled ? 'Turn Off' : 'Turn On';
	let selectedLanguage = data.selectedLanguage;
	console.log(selectedLanguage);
	if (selectedLanguage === 'es'){
		console.log(selectedLanguage);
		spanishRadioButton.checked = true;
		germanRadioButton.checked = false;
		frenchRadioButton.checked = false;
	}
	if (selectedLanguage === 'de'){
		console.log(selectedLanguage);
		spanishRadioButton.checked = false;
		germanRadioButton.checked = true;
		frenchRadioButton.checked = false;
	}
	if (selectedLanguage === 'fr'){
		console.log(selectedLanguage);
		spanishRadioButton.checked = false;
		germanRadioButton.checked = false;
		frenchRadioButton.checked = true;
	}
});

onOffSwitch.onchange = () => {
	let enabled = onOffSwitch.checked
	console.log(`Extension is turned on?: ${enabled}.`)
	// onOffSwitchLabel.innerText = enabled ? 'Turn Off' : 'Turn On';
	chrome.storage.local.set({isEnabled:enabled});
};

spanishRadioButton.onchange = () => {
	console.log(`spanish selected: ${spanishRadioButton.checked}`);
	if (spanishRadioButton.checked) {
		chrome.storage.local.set({selectedLanguage:'es'});
	}
};

germanRadioButton.onchange = () => {
	console.log(`german selected: ${germanRadioButton.checked}`);
	if (germanRadioButton.checked) {
		chrome.storage.local.set({selectedLanguage:'de'});
	}
};

frenchRadioButton.onchange = () => {
	console.log(`french selected: ${frenchRadioButton.checked}`);
	if (frenchRadioButton.checked) {
		chrome.storage.local.set({selectedLanguage:'fr'});
	}
};
