/** Format a date value as a US locale date string (mirrors the old `date` filter). */
export function formatDate(value: string | Date | undefined | null): string {
    if (!value) return "";
    return new Date(value).toLocaleDateString("en-US");
}
