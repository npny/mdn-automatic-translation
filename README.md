# [MDN Automatic Translation](https://github.com/npny/mdn-automatic-translation)

*A chrome extension for MDN contributors. Adds an "Auto-translate" button on the MDN docs edition page that automatically replaces common terms (such as section titles).*

## Why
If you're an MDN contributor who focuses on translations, you have no doubt noticed that some patterns occur a lot (e.g. sections titles, terms in the compatibility table, etc.), and are translated the exact same way everytime.  
This extension automates some of that process.

The idea is that you add rules, which are made of :

- A pattern to be searched for (can be a RegExp or a simple string)
- A translation to replace the pattern with (can use RegExp capture groups), one for each supported language.

Additionally, you might want to scope those rules, for instance, while you might want to translate titles (like __Methods__ and __Example__) automatically, you don't necessarily want every instance of the word "method" and "example" in the page to be replaced automatically without context.  
Similarly, there might be some patterns that only occur in a particular section of MDN, like docs, or tutorials, or HTML5 docs specifically. Thus you can narrow down rules by specifying :

- A selector (like `h2`or `.compat-table th`), precise enough not to let any side effect slip through.
- A domain, which follows the URL hierarchy of sections. For instance a rule limited to the `/docs/Web/HTML` domain will work when editing the page `/docs/Web/HTML/Element/Button`, but not when editing `/docs/Web/API/AudioBuffer`.


This is of course not intended as a replacement for human translation of large paragraphs, or as something to be accepted without proofread. Think of it more as a "gets 90% of the repetitive-and-annoying-to-edit stuff done" type of thing.

## Anyway

#### 1. [Download the unpacked extension](https://github.com/npny/mdn-automatic-translation/archive/master.zip)
#### 2. [Install the extension in Chrome](https://developer.chrome.com/extensions/getstarted#unpacked)
#### 3. [Go ahead and start translating a page](https://developer.mozilla.org/en-US/docs/MDN/Doc_status)
#### 4. Click here
![](http://i.imgur.com/HxWIX8E.png)

...
#### 5. [Contribute your own rules !](https://github.com/npny/mdn-automatic-translation/pulls)

Seriously, if you have a rule in mind, consider making a pull request.
The beauty of the thing is that no matter the language you work with, if you can identify a pattern in the english version, other contributors can simply add their own translation on top of it instead of writing a separate pattern. In other words, translating stuff is dependent on how many contributors there is for each language, but automating patterns is dependent only on the total number of contributors.

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
	"domain": "/docs/Web/API"
	"selector": "h2",
	"pattern": "/\\bExamples\\b/gi", // RegExp
	"translation": {
		"fr": "$1", // RegExp groups
		"de": "Beispiel"
	}
},
{
	// Domain and selector are optional
	"selector": ".compat-table td",
	"pattern": "Basic support",
	"translation": {
		"fr": "Support de base",
		"de": "Basisunterstützung"
	}
},
{
	// Unscoped rules are not a very realistic use case, though
	"pattern": "string",
	"translation": {"fr": "chaîne"}
},
```


## Stuff left to do :
- Ability to edit the translation rules in plain text from the option page of the extension
- Add some more rules
- Port to Firefox, ideally build both extensions from the same core javascript code
- Ability to search other existing translations on MDN for similar terms. Makes it easier to learn how a particular expression is usually translated, or automate the translation of some paragraphs that are repeated throughout documents (like explanatory side notes or similar functions descriptions)

Enjoy !  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)