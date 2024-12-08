import { Event, trackEvent } from "@/lib/events";

export default function useClipboard() {
  async function copyToClipboardWithMeta(value: string, event?: Event) {
    navigator.clipboard.writeText(value);
    if (event) trackEvent(event);
  }

  return { copyToClipboardWithMeta };
}
