"use client";

import { useState } from "react";
import {
  profileSchema,
  housingStatusValues,
  PROFILE_FIELDS,
  type ProfileField,
} from "@/src/schemas/profile";

export type ProfileValues = {
  housingStatus: string | null;
  budgetMin: number | null;
  budgetMax: number | null;
  areas: string[] | null;
  moveInDate: string | null;
  tenancyLengthMonths: number | null;
  selfDescription: string | null;
  profilePaused: boolean;
  publicFields: string[] | null;
};

const FIELD_LABELS: Record<ProfileField, string> = {
  housingStatus: "Housing status",
  budgetMin: "Budget (from)",
  budgetMax: "Budget (to)",
  areas: "Areas",
  moveInDate: "Move-in date",
  tenancyLengthMonths: "Tenancy length",
  selfDescription: "About you",
};

type Errors = Partial<Record<string, string>>;

export function ProfileForm({ initial }: { initial: ProfileValues }) {
  const [values, setValues] = useState(initial);
  const [areaDraft, setAreaDraft] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  function set<K extends keyof ProfileValues>(key: K, value: ProfileValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    setSaved(false);
  }

  function addArea() {
    const next = areaDraft.trim();
    if (!next) return;
    const current = values.areas ?? [];
    if (current.includes(next)) {
      setAreaDraft("");
      return;
    }
    set("areas", [...current, next]);
    setAreaDraft("");
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});

    // The same schema the API validates with, so the form cannot disagree with the server.
    const candidate = {
      housingStatus: values.housingStatus,
      budgetMin: values.budgetMin,
      budgetMax: values.budgetMax,
      areas: values.areas,
      moveInDate: values.moveInDate,
      tenancyLengthMonths: values.tenancyLengthMonths,
      selfDescription: values.selfDescription ?? "",
    };
    const parsed = profileSchema.safeParse(candidate);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        next[key] ??= issue.message;
      }
      setErrors(next);
      return;
    }

    setSaving(true);
    const response = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    setSaving(false);
    if (response.ok) {
      setSaved(true);
      return;
    }
    setErrors({ form: "That did not save. Check the fields and try again." });
  }

  async function setPaused(paused: boolean) {
    const response = await fetch(
      `/api/profile/${paused ? "pause" : "unpause"}`,
      { method: "POST" },
    );
    if (response.ok) set("profilePaused", paused);
  }

  async function toggleVisible(field: ProfileField, visible: boolean) {
    const current = values.publicFields ?? [...PROFILE_FIELDS];
    const next = visible
      ? [...new Set([...current, field])]
      : current.filter((f) => f !== field);
    const response = await fetch("/api/profile/visibility", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicFields: next }),
    });
    if (response.ok) set("publicFields", next);
  }

  const visible = (field: ProfileField) =>
    (values.publicFields ?? [...PROFILE_FIELDS]).includes(field);

  return (
    <form onSubmit={save} className="profile">
      {errors.form ? (
        <p className="error" role="alert">
          {errors.form}
        </p>
      ) : null}

      <fieldset className="group">
        <legend className="legend">Where you stand</legend>
        <div className="statuses">
          {housingStatusValues.map((status) => {
            const chosen = values.housingStatus === status;
            const hasPlace = status === "has a place";
            return (
              <label
                key={status}
                className={`status ${chosen ? "status--chosen" : ""}`}
              >
                <input
                  type="radio"
                  name="housingStatus"
                  value={status}
                  checked={chosen}
                  onChange={() => set("housingStatus", status)}
                  className="visually-hidden"
                />
                <span className="status-slots" aria-hidden="true">
                  {hasPlace ? (
                    <>
                      <span className="slot slot--sm" />
                      <span className="slot slot--sm" />
                      <span className="slot slot--sm slot--open" />
                    </>
                  ) : (
                    <span className="slot slot--sm slot--open" />
                  )}
                </span>
                <span className="status-name">
                  {hasPlace ? "I have a place" : "I need a place"}
                </span>
                <span className="status-note">
                  {hasPlace
                    ? "You have somewhere, and room for others."
                    : "You are looking — on your own or with a household."}
                </span>
              </label>
            );
          })}
        </div>
        {errors.housingStatus ? (
          <p className="field-error">{errors.housingStatus}</p>
        ) : null}
      </fieldset>

      <fieldset className="group">
        <legend className="legend">What would rule you out</legend>
        <p className="help help--tight">
          These are hard limits. People outside them are not shown to you, and
          you are not shown to them.
        </p>

        <div className="row">
          <label className="field">
            <span className="label">Budget from (£ a month)</span>
            <input
              className="input"
              type="number"
              inputMode="numeric"
              min={0}
              max={9999}
              value={values.budgetMin ?? ""}
              onChange={(e) =>
                set("budgetMin", e.target.value === "" ? null : Number(e.target.value))
              }
            />
          </label>
          <label className="field">
            <span className="label">Budget to (£ a month)</span>
            <input
              className="input"
              type="number"
              inputMode="numeric"
              min={0}
              max={9999}
              value={values.budgetMax ?? ""}
              onChange={(e) =>
                set("budgetMax", e.target.value === "" ? null : Number(e.target.value))
              }
            />
          </label>
        </div>
        {errors.budgetMin || errors.budgetMax ? (
          <p className="field-error">{errors.budgetMin ?? errors.budgetMax}</p>
        ) : null}

        <label className="field">
          <span className="label">Areas you would live in</span>
          <div className="chips">
            {(values.areas ?? []).map((area) => (
              <button
                key={area}
                type="button"
                className="chip"
                onClick={() =>
                  set("areas", (values.areas ?? []).filter((a) => a !== area))
                }
                aria-label={`Remove ${area}`}
              >
                {area} <span aria-hidden="true">×</span>
              </button>
            ))}
          </div>
          <input
            className="input"
            value={areaDraft}
            onChange={(e) => setAreaDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault();
                addArea();
              }
            }}
            onBlur={addArea}
            placeholder="Fallowfield, then Enter"
          />
        </label>
        {errors.areas ? <p className="field-error">{errors.areas}</p> : null}

        <div className="row">
          <label className="field">
            <span className="label">Move-in date</span>
            <input
              className="input"
              type="date"
              value={values.moveInDate ?? ""}
              onChange={(e) => set("moveInDate", e.target.value || null)}
            />
          </label>
          <label className="field">
            <span className="label">Tenancy length (months)</span>
            <input
              className="input"
              type="number"
              inputMode="numeric"
              min={1}
              max={24}
              value={values.tenancyLengthMonths ?? ""}
              onChange={(e) =>
                set(
                  "tenancyLengthMonths",
                  e.target.value === "" ? null : Number(e.target.value),
                )
              }
            />
          </label>
        </div>
        {errors.moveInDate || errors.tenancyLengthMonths ? (
          <p className="field-error">
            {errors.moveInDate ?? errors.tenancyLengthMonths}
          </p>
        ) : null}
      </fieldset>

      <fieldset className="group">
        <legend className="legend">In your own words</legend>
        <label className="field">
          <span className="label">
            About you
            <span className="counter">
              {(values.selfDescription ?? "").length} / 5000
            </span>
          </span>
          <textarea
            className="input textarea"
            rows={6}
            maxLength={5000}
            value={values.selfDescription ?? ""}
            onChange={(e) => set("selfDescription", e.target.value)}
            placeholder="What are you like to live with?"
          />
        </label>
        {errors.selfDescription ? (
          <p className="field-error">{errors.selfDescription}</p>
        ) : null}
      </fieldset>

      <div className="actions">
        <button className="button" type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save profile"}
        </button>
        {saved ? (
          <span className="saved" role="status">
            Saved
          </span>
        ) : null}
      </div>

      <fieldset className="group group--quiet">
        <legend className="legend">Who sees what</legend>
        <p className="help help--tight">
          Before you match, other students see only what you tick here.
        </p>
        <ul className="visibility">
          {PROFILE_FIELDS.map((field) => (
            <li key={field}>
              <label className="check">
                <input
                  type="checkbox"
                  checked={visible(field)}
                  onChange={(e) => toggleVisible(field, e.target.checked)}
                />
                <span>{FIELD_LABELS[field]}</span>
              </label>
            </li>
          ))}
        </ul>

        <label className="check check--pause">
          <input
            type="checkbox"
            checked={values.profilePaused}
            onChange={(e) => setPaused(e.target.checked)}
          />
          <span>
            Pause my profile — nobody can see me, and nothing is deleted.
          </span>
        </label>
      </fieldset>
    </form>
  );
}
