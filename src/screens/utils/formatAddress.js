export default function formatAddress(addr) {
  if (!addr) return "Unknown location";

  const line1 = [addr.street, addr.streetNumber]
    .filter(Boolean)
    .join(" ");

  const line2 = [addr.postalCode, addr.city]
    .filter(Boolean)
    .join(" ");

  const line3 = addr.country ?? "";

  return [line1, line2, line3]
    .filter(Boolean)
    .join("\n");
}