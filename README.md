# [MDN Automatic Translation](https://github.com/npny/mdn-automatic-translation)

*A Chrome/FF extension to make life simpler for MDN contributors*

## Why
If you're an MDN contributor who focuses on translations, you have no doubt noticed that some patterns occur a lot (e.g. sections titles, terms in the compatibility table, etc.), and are translated the exact same way everytime.  
This extension automates some of that process.

The idea is that you add rules, which are made of :

- A pattern to be searched for (can be a RegExp or a simple string)
- A translation to replace the pattern with (can use RegExp capture groups), one for each supported language.

Additionally, you might want to scope those rules, so that they only apply for instance on section titles or on a specific MDN section like HTM5 docs.
This is done by specifying :

- A selector (like `h2`or `.compat-table th`), precise enough not to target unwanted elements
- A domain, which follows the URL hierarchy of sections. (e.g. a rule scoped to `/docs/Web/HTML` will work on `/docs/Web/HTML/Element/Button`, but not on `/docs/Web/API/AudioBuffer`)

This doesn't replace a proper translation, it's more of a "gets 90% of the repetitive stuff done" thing.

## Features

On an [edition page](https://developer.mozilla.org/en-US/docs/MDN/Doc_status) :

 - Auto-translate common terms
 ![](http://i.imgur.com/qVbHrOy.png)

 - Jump to the original article edit page
 ![](http://i.imgur.com/zXbWpYH.png)
 
 - Move your tags quickly
 ![](http://i.imgur.com/hro0Ha0.png)

## Installing unpacked (recommended)

 - [Download the unpacked extension](https://github.com/npny/mdn-automatic-translation/archive/master.zip)
 - Follow the install steps for [Chrome](https://developer.chrome.com/extensions/getstarted#unpacked) or [Firefox](https://www.youtube.com/watch?v=SKb-CNYpl6Q)

## Installing from packages

 - [Chrome](https://github.com/npny/mdn-automatic-translation/releases/download/v0.2.0/mdn-automatic-translation.crx)
 - [Firefox](https://github.com/npny/mdn-automatic-translation/releases/download/v0.2.0/mdn-automatic-translation.xpi)

## [Contributing your own rules](https://github.com/npny/mdn-automatic-translation/pulls)

You can test out new rules by editing `window.localStorage.rules`.
If you use a rule and it's not in the main `defaultRules.json` yet, please consider making a pull request!

The nice thing is that no matter what language you work with, if you can identify a pattern in the english version, other contributors can simply add their own translation on top of it instead of writing a separate pattern. In other words, translating stuff is dependent on how many contributors there is for each language, but automating patterns is dependent only on the total number of contributors.

## Example rules
```javascript
{
	"domain": "/docs/Web/API"
	"selector": "h2",
	"pattern": "Methods",
	"translation": {
		"fr": "Méthodes",
		"de": "Methoden"
	}
},
{
	
	"selector": ".compat-table td",
	"pattern": "/\\bBasic support/gi", // Regex
	"translation": {
		"fr": "Support $1", // Regex groups
		"de": "Grundlegende Unterstützung"
	}
},
{
	// Domain and selector are optional
	"pattern": "Example",
	"translation": {
		"fr": "Exemple"
	}
},
```

Enjoy !  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
