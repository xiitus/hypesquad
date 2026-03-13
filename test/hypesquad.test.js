import test from "node:test";
import assert from "node:assert/strict";

import {
  HttpStatus,
  expectedStatusForAction,
  formatFailure,
  formatResult,
  isExpectedStatus,
  isMainModule,
} from "../hypesquad.js";

test("expectedStatusForAction requires 204 No Content for every action", () => {
  assert.equal(expectedStatusForAction("bravery"), HttpStatus.NoContent);
  assert.equal(expectedStatusForAction("brilliance"), HttpStatus.NoContent);
  assert.equal(expectedStatusForAction("balance"), HttpStatus.NoContent);
  assert.equal(expectedStatusForAction("remove"), HttpStatus.NoContent);
});

test("isExpectedStatus only accepts the expected status", () => {
  assert.equal(isExpectedStatus("bravery", HttpStatus.NoContent), true);
  assert.equal(isExpectedStatus("bravery", 200), false);
  assert.equal(isExpectedStatus("remove", 202), false);
});

test("formatFailure explains the expected status when the response is empty", () => {
  assert.equal(
    formatFailure({
      body: "",
      expectedStatus: 204,
    }),
    "Unexpected response status. Expected 204 No Content."
  );
});

test("formatFailure appends the API response body when present", () => {
  assert.equal(
    formatFailure({
      body: "{\"message\":\"401: Unauthorized\",\"code\":0}",
      expectedStatus: 204,
    }),
    "Unexpected response status. Expected 204 No Content. Response: {\"message\":\"401: Unauthorized\",\"code\":0}"
  );
});

test("formatResult keeps the stricter failure details intact", () => {
  assert.equal(
    formatResult("balance", {
      ok: false,
      status: 200,
      body: "Unexpected response status. Expected 204 No Content.",
    }),
    "Failed (200): Unexpected response status. Expected 204 No Content."
  );
});

test("isMainModule only matches the executed entrypoint", () => {
  assert.equal(
    isMainModule("file:///tmp/hypesquad.ts", ["node", "/tmp/hypesquad.ts"]),
    true
  );
  assert.equal(
    isMainModule("file:///tmp/hypesquad.ts", ["node", "/tmp/hypesquad.test.ts"]),
    false
  );
});
