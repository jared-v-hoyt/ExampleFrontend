import { useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import "./App.css";

export default function App() {
	const [product_list, set_product_list] = useState([]);
	const product_list_handler = (list) => set_product_list(list);

	const [is_loading, set_is_loading] = useState([false, false, false]);
	const is_loading_handler = (boolean_array) => set_is_loading(boolean_array);

	function fetch_order_list() {
		// TODO: implement
		return;
	}

	function fetch_order_item_list() {
		// TODO: implement
		return;
	}

	function fetch_product_list() {
		is_loading_handler([false, false, true]);

		// TODO: remove timeout. This is only here to demonstrate the CircularProgress component
		setTimeout(() => {
			var request_options = {
				method: "GET",
				redirect: "follow",
			};

			fetch("http://localhost:5134/products", request_options)
				.then((response) => response.json())
				.then((result) => {
					let list = [];
					result.forEach((product) => {
						list.push(<tr>{product.productName}</tr>);
					});
					product_list_handler(list);
				})
				.catch((error) => console.log("error", error))
				.finally(is_loading_handler([false, false, false]));
		}, 2000);
	}

	return (
		<Box className="app-wrapper">
			<Box className="button-group-wrapper">
				<Box className="button-group">
					<Button
						disabled={true} // TODO: implement fetch_order_list, then update this line of code
						onClick={fetch_order_list}
						variant="contained"
					>
						{is_loading[0] ? <CircularProgress size={24} /> : "Get Orders"}
					</Button>
					<Button
						disabled={true} // TODO: implement fetch_order_item_list, then update this line of code
						onClick={fetch_order_item_list}
						variant="contained"
					>
						{is_loading[1] ? <CircularProgress size={24} /> : "Get OrderItems"}
					</Button>
					<Button
						disabled={is_loading[2]}
						onClick={fetch_product_list}
						variant="contained"
					>
						{is_loading[2] ? <CircularProgress size={24} /> : "Get Products"}
					</Button>
				</Box>
			</Box>
			<Box className="response-wrapper">
				<table>{product_list}</table>
			</Box>
		</Box>
	);
}
