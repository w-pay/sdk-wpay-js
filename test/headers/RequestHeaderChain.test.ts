import { assertThat, is } from "hamjest";
import { anything, instance, mock, when } from "ts-mockito";

import { RequestHeaderChain, RequestHeaderFactory } from "../../src/headers";

describe("Request Header Chain", function () {
	it("should add headers from factories", function () {
		const factories = (function () {
			const factories: RequestHeaderFactory[] = [];

			for (let i = 0; i < 3; i++) {
				const factory = mock<RequestHeaderFactory>();
				when(factory.addHeaders(anything())).thenCall((headers) => {
					headers.set(`factory${i}`, `value${i}`);
				});

				factories.push(factory);
			}

			return factories;
		})();

		const chain = new RequestHeaderChain(factories.map((f) => instance(f)));
		const headers = chain.createHeaders();

		for (let i = 0; i < 3; i++) {
			assertThat(headers.get(`factory${i}`), is(`value${i}`));
		}
	});
});
