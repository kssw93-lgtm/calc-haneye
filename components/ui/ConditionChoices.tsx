"use client";

type Props = { name: string; value?: string; defaultValue?: string; options: readonly { value: string; label: string }[]; onChange?: (value: string) => void };
export function ConditionChoices({ name, value, defaultValue, options, onChange }: Props) {
  return <div className="flex flex-wrap gap-2">{options.map(option => <label key={option.value} className="cursor-pointer">
    <input type="radio" name={name} value={option.value} checked={value === undefined ? undefined : value === option.value} defaultChecked={value === undefined ? option.value === (defaultValue ?? options[0]?.value) : undefined} onChange={() => onChange?.(option.value)} className="peer sr-only" />
    <span className="inline-flex min-h-11 items-center rounded-lg border border-hairline bg-white px-3 py-2 text-sm text-ink peer-checked:border-brand peer-checked:bg-brand-light peer-checked:font-bold peer-checked:text-brand peer-focus-visible:ring-2 peer-focus-visible:ring-brand peer-focus-visible:ring-offset-2">{option.label}</span>
  </label>)}</div>;
}
