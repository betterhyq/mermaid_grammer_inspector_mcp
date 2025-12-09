import { expect, test } from "vitest";
import { add } from "./add";

test("adds 1 + 2 to equal 3", () => {
	expect(
		add({
			a: 1,
			b: 2,
		}),
	).toBe("3");
});
