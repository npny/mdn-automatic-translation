var rules, domain, locale, root;


function start() {

	if(!window.localStorage["rules"]) window.localStorage["rules"] = JSON.stringify(defaultRules);

	rules = JSON.parse(window.localStorage["rules"]);
	domain = window.location.pathname.substring(6); // Substring 6 turns (developer.mozilla.org)/en-US/docs/* into simply /docs/*, for scoping
	locale = document.querySelector("[name=tolocale]").value;
	root = document.querySelector(".cke_wysiwyg_frame").contentWindow.document;

	addButton();

	addTagsButton();
}

// Add button to quickly move the tags
function addTagsButton(){
	// Query the tags list and the new tag's input
	var existingTags = document.querySelectorAll('#translate-tags li');
	var newTagInput = document.querySelector('li.tagit-new input');

	Array.prototype.forEach.call(existingTags, (tag) => {

		// Create a new link for each existing tag
		// Clicking on the link will update the input field with the curent value
		((tagElement) => {

			var arrowElement = document.createElement('a');
			arrowElement.innerText = '▷';
			arrowElement.href = '#';

			arrowElement.addEventListener("click", (e) => {
				e.preventDefault();

				newTagInput.value = tag.querySelector('a').innerText;
				newTagInput.focus(); // just press enter to validate
			});

			tagElement.appendChild(arrowElement);

		})(tag)

	});
}

function addButton() {

	const button = document.createElement("button");
	button.innerText = "Auto-translate";
	button.addEventListener("click", (e) => e.preventDefault() + runTranslation());

	document.querySelector(".editor-container").previousElementSibling.appendChild(button);

}


function runTranslation() {

	rules.forEach(function(rule) {

		// Check whether or not the rule should be applied
		// indexOf==0 means that rule.domain is a substring of page.domain that starts at 0
		// This way, the scoping rule "/Web/HTML" will work on the page "/Web/HTML/Element/Button"
		if(domain.indexOf(rule.domain || "") != 0) return;

		// If no selector is specified, run on the entire text
		const elements = root.querySelectorAll(rule.selector || "body");
		if(!elements.length) return;

		// Check that we have a translation. No point in matching a pattern if we're not able to translate it in the end
		const translation = rule.translation[locale];
		if(!translation) return;
		
		// If the pattern string looks like "/expr/flags" we interpret it as a regular expression, otherwise as a regular string to be matched
		const regExpParts = rule.pattern.match(new RegExp('^/(.*?)/([gimy]*)$'));
		const pattern = regExpParts ? new RegExp(regExpParts[1], regExpParts[2]) : rule.pattern;

		// And finally we apply the substitutions
		Array.prototype.forEach.call(elements, function(element){
			
			element.innerHTML = element.innerHTML.replace(pattern, translation);

		});

	});

}


// This is a setInterval() loop that checks periodically for a condition, and runs a callback once the condition is true.
function waitUntil(condition, interval, callback) {
	const intervalID = window.setInterval( () => condition() ? clearInterval(intervalID) + callback() : null, interval);
}


waitUntil(() =>
	document.querySelector(".cke_wysiwyg_frame") &&
	document.querySelector(".cke_wysiwyg_frame").contentWindow.document.querySelector("body"),
20, start);
