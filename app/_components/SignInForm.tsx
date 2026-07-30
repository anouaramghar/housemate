"use client";

import { useId, useState } from "react";

type Status = "idle" | "sending" | "sent";

export function SignInForm({ acceptedDomain }: { acceptedDomain: string }) {
  const fieldId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function requestLink(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setStatus("sending");

    try {
      const response = await fetch("/api/auth/sign-in/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, callbackURL: "/welcome" }),
      });

      if (response.ok) {
        setStatus("sent");
        return;
      }

      // The campus requirement is stated by the server, which owns the rule.
      const body: unknown = await response.json().catch(() => null);
      const message =
        body && typeof body === "object" && "message" in body
          ? String((body as { message: unknown }).message)
          : `That address was not accepted. Use your ${acceptedDomain} university email.`;
      setError(message);
      setStatus("idle");
    } catch {
      setError("We could not reach the server. Check your connection and try again.");
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <div className="sent" role="status">
        <h2>Check your inbox</h2>
        <p className="help">
          We sent a sign-in link to your university email. Open it on any device
          — it works from anywhere in the world.
        </p>
        <p className="help">
          Nothing arrived, or the link expired?{" "}
          <button
            type="button"
            className="link"
            onClick={() => {
              setStatus("idle");
              setError(null);
            }}
          >
            Send another
          </button>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={requestLink} noValidate>
      {error ? (
        <p className="error" role="alert">
          {error}
        </p>
      ) : null}

      <label className="field" htmlFor={fieldId}>
        <span className="label">University email</span>
        <input
          id={fieldId}
          className="input"
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={`you@your-university.${acceptedDomain}`}
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          required
        />
      </label>

      <button className="button" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send me a link"}
      </button>

      <p className="help">
        No password. We email you a link that signs you in.
      </p>
    </form>
  );
}
