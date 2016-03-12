var rules, domain, locale, root;


function start() {

	if(!window.localStorage["rules"]) window.localStorage["rules"] = JSON.stringify(defaultRules);

	rules = JSON.parse(window.localStorage["rules"]);
	domain = window.location.pathname.substring(6); // Substring 6 turns (developer.mozilla.org)/en-US/docs/* into simply /docs/*, for scoping
	locale = document.querySelector("[name=tolocale]").value;
	root = document.querySelector(".cke_wysiwyg_frame").contentWindow.document;

	addTranslateButton();
	addTagsArrows();
}


function addTranslateButton() {

	const button = document.createElement("button");
	button.innerText = "Auto-translate";
	button.addEventListener("click", (e) => {
		e.preventDefault();
		runTranslation();
	});

	document.querySelector(".editor-container").previousElementSibling.appendChild(button);

}


function addTagsArrows(){

	const existingTags = document.querySelectorAll("#translate-tags li a");
	const newTagInput = document.querySelector(".tagit-new input");

	// We'll add a small transfer arrow on each tag element
	Array.prototype.forEach.call(existingTags, (tag) => {

		const arrow = document.createElement("a");
		arrow.innerText = "▷";
		arrow.href = "#";

		// Clicking on this arrow will transfer the tag name to the new tag input and focus it, giving the user a chance to edit it before it is added
		arrow.addEventListener("click", (e) => {
			e.preventDefault();

			newTagInput.blur();
			newTagInput.value = tag.innerText;
			newTagInput.focus();
		});

		tag.parentNode.appendChild(arrow);

	});

}


function runTranslation() {

	rules.forEach((rule) => {

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
		Array.prototype.forEach.call(elements, (element) => {
			
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
	document.querySelector(".cke_wysiwyg_frame").contentWindow.document.querySelector(".cke_editable"),
20, start);
