import { useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import "./App.css";

export default function App() {
	const [product_list, set_product_list] = useState([]);
	const product_list_handler = (list) => set_product_list(list);

	const [disabled_buttons, set_disabled_buttons] = useState([
		false,
		true,
		true,
	]);
	const disabled_buttons_handler = (button_states) =>
		set_disabled_buttons(button_states);

	const [is_loading, set_is_loading] = useState(false);
	const is_loading_handler = (bool) => set_is_loading(bool);

	function parse_product_list(result) {
		let list = [];

		result.forEach((product) => {
			list.push(<tr>{product.productName}</tr>);
		});

		product_list_handler(list);
	}

	function fetch_product_list() {
		is_loading_handler(true);

		// TODO: remove timeout. This is only here to demonstrate the CircularProgress component
		setTimeout(() => {
			var request_options = {
				method: "GET",
				redirect: "follow",
			};

			fetch("http://localhost:5134/products", request_options)
				.then((response) => response.json())
				.then((result) => {
					parse_product_list(result);
					is_loading_handler(false);
				})
				.catch((error) => console.log("error", error))
				.finally(is_loading_handler(false));
		}, 2000);
	}

	return (
		<Box className="app-wrapper">
			<Box className="button-group-wrapper">
				<Box className="button-group">
					<Button
						variant="contained"
						disabled={disabled_buttons[0]}
						onClick={fetch_product_list}
					>
						Get Products
					</Button>
					<Button
						variant="contained"
						disabled={disabled_buttons[1]}
					>
						Get OrderItems
					</Button>
					<Button
						variant="contained"
						disabled={disabled_buttons[2]}
					>
						Get Orders
					</Button>
				</Box>
			</Box>
			<Box className="response-wrapper">
				{is_loading ? <CircularProgress /> : <table>{product_list}</table>}
			</Box>
		</Box>
	);
}
