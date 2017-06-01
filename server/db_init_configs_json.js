//db_configs
const db_init_json = {
	"initialProperties": [
		{ "name": "id", "value": "" },
		{ "name": "color", "value": "" },
		{ "name": "width", "value": "100%" },
		{ "name": "height", "value": "50px" },
		{ "name": "class", "value": "" },
		{ "name": "magicHelper", "value": "" },
		{ "name": "value", "value": "" },
		{ "name": "src", "value": "" },
	],
	"initialComponents": [
		{ "name": "button", "properties": ["id", "color", "value", "class", "width", "height", "font-size","font-weight","font-family","text-align"] },
		{ "name": "input", "properties": ["id", "color", "value", "class", "width", "height", "font-size","font-weight","font-family","text-align"] },
		{ "name": "label", "properties": ["id", "color", "value", "class", "width", "height", "font-size","font-weight","font-family","text-align"] },
		{ "name": "link", "properties": ["id", "color", "value", "class", "width", "height","destination","font-size","font-weight","font-family","text-align"] },
		{ "name": "image", "properties": ["id", "color", "class", "width", "height","src"] },
		{ "name": "video", "properties": ["id", "color", "class", "width", "height","src"] },
		{ "name": "text", "properties": ["id", "color", "value", "class", "width", "height","font-size","font-weight","font-family","text-align"] },
		{ "name": "contactform", "properties": ["id", "class"] },

	]
}
module.exports = db_init_json;


