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
		{ "name": "button", "properties": ["id", "color", "value", "class", "width", "height"] },
		{ "name": "input", "properties": ["id", "color", "value", "class", "width", "height"] },
		{ "name": "label", "properties": ["id", "color", "value", "class", "width", "height"] },
	]
}
module.exports = db_init_json;


