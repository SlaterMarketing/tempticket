"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type SelectedPlace = { code: string; label: string };

type PlaceSlim = {
  code: string;
  label: string;
  type: string;
  name: string;
  subtitle: string | null;
};

const fieldShell =
  "rounded-xl border-2 border-[color:var(--brand-blue)]/12 bg-white/90 shadow-sm transition focus-within:border-[color:var(--brand-blue)]/35 focus-within:shadow-md";

type PlaceAutocompleteProps = {
  id: string;
  label: string;
  /** IATA city or airport code used for API calls */
  value: SelectedPlace | null;
  onValueChange: (place: SelectedPlace | null) => void;
  placeholder?: string;
  className?: string;
};

export function PlaceAutocomplete({
  id,
  label,
  value,
  onValueChange,
  placeholder = "City, country, or airport",
  className,
}: PlaceAutocompleteProps) {
  const t = useTranslations("PlaceAutocomplete");
  const listId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState(value?.label ?? "");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<PlaceSlim[]>([]);
  const [active, setActive] = useState(-1);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setText(value?.label ?? "");
  }, [value?.label, value?.code]);

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.length < 2) {
      setItems([]);
      setFetchError(null);
      return;
    }
    setLoading(true);
    setFetchError(null);
    try {
      const res = await fetch(
        `/api/places/suggest?q=${encodeURIComponent(q)}`,
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setItems([]);
        setFetchError(
          (typeof data.error === "string" && data.error) ||
            t("couldNotSearch"),
        );
        return;
      }
      setItems(Array.isArray(data.places) ? data.places : []);
      setFetchError(null);
    } catch {
      setItems([]);
      setFetchError(t("couldNotSearch"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function scheduleSuggest(q: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      void fetchSuggestions(q);
    }, 260);
  }

  function pick(p: PlaceSlim) {
    onValueChange({ code: p.code, label: p.label });
    setText(p.label);
    setOpen(false);
    setItems([]);
    setActive(-1);
    setFetchError(null);
  }

  return (
    <div ref={wrapRef} className={cn("relative space-y-2", className)}>
      <Label htmlFor={id} className="text-[color:var(--brand-blue)]">
        {label}
      </Label>
      <div className="relative">
        <MapPin
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[color:var(--brand-blue)]/45"
          aria-hidden
        />
        <Input
          id={id}
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls={listId}
          aria-expanded={open}
          placeholder={placeholder}
          value={text}
          className={cn("h-11 pl-10", fieldShell)}
          onChange={(e) => {
            const v = e.target.value;
            setText(v);
            if (value && v !== value.label) {
              onValueChange(null);
            }
            setOpen(true);
            setActive(-1);
            scheduleSuggest(v);
            if (v.length < 2) {
              setItems([]);
              setFetchError(null);
            }
          }}
          onFocus={() => {
            setOpen(true);
            if (text.length >= 2) scheduleSuggest(text);
          }}
          onKeyDown={(e) => {
            if (!open || !items.length) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((i) => (i + 1) % items.length);
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((i) => (i <= 0 ? items.length - 1 : i - 1));
            } else if (e.key === "Enter" && active >= 0 && items[active]) {
              e.preventDefault();
              pick(items[active]!);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
        />
        {open &&
        (items.length > 0 || loading || fetchError || text.trim().length >= 2) ? (
          <ul
            id={listId}
            role="listbox"
            className="absolute z-50 mt-1 max-h-64 w-full overflow-auto rounded-xl border border-[color:var(--brand-blue)]/15 bg-white py-1 shadow-lg ring-1 ring-black/5"
          >
            {loading && !items.length && !fetchError ? (
              <li className="px-3 py-2.5 text-sm text-muted-foreground">
                {t("searching")}
              </li>
            ) : null}
            {fetchError ? (
              <li className="px-3 py-2.5 text-sm text-destructive">
                {fetchError}
              </li>
            ) : null}
            {!loading && !fetchError && text.trim().length >= 2 && !items.length ? (
              <li className="px-3 py-2.5 text-sm text-muted-foreground">
                {t("empty")}
              </li>
            ) : null}
            {items.map((p, idx) => (
              <li key={`${p.code}-${idx}`} role="option">
                <button
                  type="button"
                  className={cn(
                    "flex w-full flex-col gap-0.5 px-3 py-2.5 text-left transition",
                    idx === active
                      ? "bg-[color:var(--brand-blue)]/8"
                      : "hover:bg-[color:var(--brand-blue)]/6",
                  )}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => pick(p)}
                >
                  <span className="text-sm font-semibold text-[color:var(--brand-blue)]">
                    {p.name}{" "}
                    <span className="font-mono text-xs font-bold text-[color:var(--brand-green)]">
                      {p.code}
                    </span>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {p.type === "city" ? t("city") : t("airport")}
                    {p.subtitle ? ` · ${p.subtitle}` : null}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
