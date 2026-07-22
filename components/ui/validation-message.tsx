import { Body } from "st-peter-ui";

/* -----------------------------------------------------------------------------
 * ValidationMessage — renders the first non-empty message (validation error,
 * server error, etc.) as red inline copy, or nothing when there's none.
 *
 * Replaces the repeated inline pattern:
 *   {(validationError || error) && (
 *     <Body color="red.500">{validationError ?? error}</Body>
 *   )}
 *
 * Usage:
 *   <ValidationMessage message={validationError ?? error} />
 *   <ValidationMessage messages={[validationError, error]} />  // first truthy wins
 * -------------------------------------------------------------------------- */
type ValidationMessageProps = {
  /** A single message; renders when truthy. */
  message?: string | null;
  /** Several candidate messages; the first truthy one is shown (in order). */
  messages?: Array<string | null | undefined>;
  /** Override the text color (defaults to the error red). */
  color?: string;
};

export default function ValidationMessage({
  message,
  messages,
  color = "red.500",
}: ValidationMessageProps) {
  const text = message || messages?.find(Boolean) || null;

  if (!text) return null;

  return (
    <Body color={color} role="alert">
      {text}
    </Body>
  );
}
