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
		{ "name": "button", "properties": ["id", "color", "value", "class", "width", "height", "font-size", "font-weight", "font-family", "text-align"] },
		{ "name": "input", "properties": ["id", "color", "value", "class", "width", "height", "font-size", "font-weight", "font-family", "text-align"] },
		{ "name": "label", "properties": ["id", "color", "value", "class", "width", "height", "font-size", "font-weight", "font-family", "text-align"] },
		{ "name": "link", "properties": ["id", "color", "value", "class", "width", "height", "destination", "font-size", "font-weight", "font-family", "text-align"] },
		{ "name": "image", "properties": ["id", "color", "class", "width", "height", "src"] },
		{ "name": "video", "properties": ["id", "color", "class", "width", "height", "src"] },
		{ "name": "text", "properties": ["id", "color", "value", "class", "width", "height", "font-size", "font-weight", "font-family", "text-align"] },
		{ "name": "contactform", "properties": ["id", "class"] },

	],
	"homePageStructure": [
		{
			"index": "4",
			"row": "1",
			"cell": "5",
			"cellWidth": "4",
			"cellHeight": "50px",
			"cell_content": "labelM",
			"cell_content_style": {
				"cellWidth": "4",
				"width": "100%",
				"value": "Welcome to MernAct",
				"height": "",
				"font-weight": "bold",
				"font-size": "20px",
				"text-align": "center"
			}
		},
		{
			"index": "21",
			"row": "2",
			"cell": "10",
			"cellWidth": "12",
			"cellHeight": "50px",
			"cell_content": "textM",
			"cell_content_style": {
				"cellWidth": "12",
				"text-align": "center",
				"font-weight": "bold",
				"font-size": "16",
				"value": "The Most Complete and Flexible CMS System Written Ever. Enjoy the speed and beauty of React, Node, MongoDB, Express and Bootstrap!"
			}
		},
		{
			"index": "34",
			"row": "3",
			"cell": "11",
			"cellWidth": "12",
			"cellHeight": "50px",
			"cell_content": "textM",
			"cell_content_style": {
				"value": "We provide all controls that you need!",
				"cellWidth": "12",
				"text-align": "center",
				"font-size": "16",
				"font-weight": "Bold"
			}
		},
		{
			"index": "47",
			"row": "4",
			"cell": "12",
			"cellWidth": "2",
			"cellHeight": "50px",
			"cell_content": "textM",
			"cell_content_style": {
				"cellWidth": "2",
				"value": "A lot of typings and styles",
				"color": "green",
				"font-size": "16",
				"font-weight": "",
				"font-family": "times"
			}
		},
		{
			"index": "49",
			"row": "5",
			"cell": "2",
			"cellWidth": "2",
			"cellHeight": "50px",
			"cell_content": "buttonM",
			"cell_content_style": {
				"value": "Buttons",
				"cellWidth": "2",
				"width": "100%",
				"cellHeight": "",
				"height": "48px",
				"class": "btn-success"
			}
		},
		{
			"index": "51",
			"row": "5",
			"cell": "4",
			"cellWidth": "2",
			"cellHeight": "50px",
			"cell_content": "buttonM",
			"cell_content_style": {
				"value": "Smaller ones",
				"cellWidth": "2",
				"class": "btn-danger"
			}
		},
		{
			"index": "53",
			"row": "5",
			"cell": "6",
			"cellWidth": "1",
			"cellHeight": "50px",
			"cell_content": "labelM",
			"cell_content_style": {
				"class": "label-info",
				"font-weight": "",
				"font-size": "12",
				"value": "Labels"
			}
		},
		{
			"index": "55",
			"row": "5",
			"cell": "8",
			"cellWidth": "1",
			"cellHeight": "50px",
			"cell_content": "textM",
			"cell_content_style": {
				"color": "red",
				"font-family": "courier",
				"font-weight": "bold",
				"value": "courier typing"
			}
		},
		{
			"index": "71",
			"row": "6",
			"cell": "12",
			"cellWidth": "3",
			"cellHeight": "50px",
			"cell_content": "linkM",
			"cell_content_style": {
				"text-align": "",
				"cellWidth": "3",
				"width": "200%",
				"value": "Control Panel Link",
				"color": "",
				"class": "btn-warning",
				"destination": "admin_login/."
			}
		},
		{
			"index": "82",
			"row": "7",
			"cell": "11",
			"cellWidth": "2",
			"cellHeight": "50px",
			"cell_content": "labelM",
			"cell_content_style": {
				"cellWidth": "2",
				"value": "Images",
				"width": "200%"
			}
		},
		{
			"index": "92",
			"row": "8",
			"cell": "9",
			"cellWidth": "6",
			"cellHeight": "200px",
			"cell_content": "imageM",
			"cell_content_style": {
				"cellWidth": "6",
				"cellHeight": "200px",
				"src": "https://images.pexels.com/photos/414801/pexels-photo-414801.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb",
				"width": "100%",
				"height": "200"
			}
		},
		{
			"index": "121",
			"row": "11",
			"cell": "2",
			"cellWidth": "4",
			"cellHeight": "50px",
			"cell_content": "labelM",
			"cell_content_style": {
				"cellWidth": "4",
				"text-align": "center",
				"width": "100%",
				"height": "",
				"class": "label-success",
				"value": "Videos and Many More"
			}
		},
		{
			"index": "129",
			"row": "11",
			"cell": "10",
			"cellWidth": "6",
			"cellHeight": "200px",
			"cell_content": "videoM",
			"cell_content_style": {
				"cellWidth": "6",
				"height": "160px",
				"cellHeight": "200px"
			}
		},
	],
}
module.exports = db_init_json;


