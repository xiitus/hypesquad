(async () => {
  const API = "https://discord.com/api/v9/hypesquad/online";
  const HOUSES = Object.freeze({
    bravery: 1,
    brilliance: 2,
    balance: 3,
  });
  const ACTIONS = [...Object.keys(HOUSES), "remove"];
  const SUCCESS_STATUS = 204;

  const normalize = (value) => value.trim().toLowerCase();
  const ask = (message, fallback = "") => {
    if (typeof prompt !== "function") {
      throw new Error("This script must be run from a browser developer-tools console.");
    }

    return prompt(message, fallback);
  };

  const readAction = () => {
    const input = ask(
      `Action? ${ACTIONS.join(" / ")}\nExample: bravery`,
      "bravery"
    );

    if (input === null) {
      throw new Error("Canceled.");
    }

    const action = normalize(input);

    if (!ACTIONS.includes(action)) {
      throw new Error(`Unknown action: ${input}`);
    }

    return action;
  };

  const readToken = () => {
    const token = ask(
      "Discord token\nPaste the Authorization value from the Network tab.",
      ""
    );

    if (token === null || token.trim() === "") {
      throw new Error("Token is required.");
    }

    return token.trim();
  };

  const readDryRun = () => {
    const input = ask("Dry run? yes / no", "no");

    if (input === null) {
      throw new Error("Canceled.");
    }

    return normalize(input) === "yes";
  };

  const maskToken = (token) =>
    `${token.slice(0, 4)}${"*".repeat(Math.max(0, token.length - 4))}`;

  const buildRequest = (action, token) => {
    const headers = {
      Authorization: token,
      "Content-Type": "application/json",
    };

    if (action === "remove") {
      return { method: "DELETE", headers };
    }

    return {
      method: "POST",
      headers,
      body: JSON.stringify({ house_id: HOUSES[action] }),
    };
  };

  const formatResult = (action, status, body) => {
    if (status === SUCCESS_STATUS) {
      return action === "remove"
        ? "Done: Removed (204)"
        : `Done: Set to ${action} (204)`;
    }

    const detail = body.trim();
    return detail
      ? `Failed (${status}): Unexpected response status. Expected 204 No Content. Response: ${detail}`
      : `Failed (${status}): Unexpected response status. Expected 204 No Content.`;
  };

  try {
    const action = readAction();
    const token = readToken();
    const dryRun = readDryRun();
    const request = buildRequest(action, token);

    if (dryRun) {
      console.log("[DRY RUN]", request.method, API);
      console.log("Action:", action);
      console.log("Token:", maskToken(token));
      if (request.body !== undefined) {
        console.log("Body:", request.body);
      }
      return;
    }

    const response = await fetch(API, {
      method: request.method,
      headers: request.headers,
      body: request.body ?? null,
    });
    const body = response.status === SUCCESS_STATUS ? "" : await response.text();

    console.log(formatResult(action, response.status, body));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
  }
})();
