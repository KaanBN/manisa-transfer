export type SizeUnit = 'B' | 'KB' | 'MB' | 'GB';

export const UNIT_MULTIPLIERS: Record<SizeUnit, number> = {
    B: 1,
    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024
};

/**
 * Converts a byte value to the specified unit
 * @param bytes The size in bytes
 * @param unit The target unit to convert to
 * @returns The converted value in the target unit, or undefined if input is null/undefined
 */
export const convertFromBytes = (bytes: number | null | undefined, unit: SizeUnit): number | undefined => {
    if (bytes === null || bytes === undefined) return undefined;
    return bytes / UNIT_MULTIPLIERS[unit];
};

/**
 * Converts a value from the specified unit to bytes
 * @param value The value in the specified unit
 * @param unit The source unit
 * @param round Whether to round the result to the nearest integer (default: true)
 * @returns The value converted to bytes, or undefined if input is null/undefined
 */
export const convertToBytes = (
    value: number | null | undefined,
    unit: SizeUnit,
    round: boolean = true
): number | undefined => {
    if (value === null || value === undefined) return undefined;
    const result = value * UNIT_MULTIPLIERS[unit];
    return round ? Math.floor(result) : result;
};

/**
 * Converts a value from one unit to another
 * @param value The value to convert
 * @param fromUnit The source unit
 * @param toUnit The target unit
 * @returns The converted value, or undefined if input is null/undefined
 */
export const convertBetweenUnits = (
    value: number | null | undefined,
    fromUnit: SizeUnit,
    toUnit: SizeUnit
): number | undefined => {
    if (value === null || value === undefined) return undefined;
    const bytes = convertToBytes(value, fromUnit, false);
    return bytes !== undefined ? convertFromBytes(bytes, toUnit) : undefined;
};

/**
 * Formats a byte value to a human-readable string with appropriate unit
 * @param bytes The size in bytes
 * @param decimalPlaces Number of decimal places to include (default: 2)
 * @returns A formatted string representation of the size
 */
export const formatFileSize = (bytes: number | null | undefined, decimalPlaces: number = 2): string => {
    if (bytes === null || bytes === undefined) return '0 B';
    if (bytes === 0) return '0 B';

    const units: SizeUnit[] = ['B', 'KB', 'MB', 'GB'];
    let unitIndex = 0;
    let size = Math.abs(bytes);

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return `${size.toFixed(decimalPlaces)} ${units[unitIndex]}`;
};

/**
 * Gets the most appropriate unit for a byte value
 * @param bytes The size in bytes
 * @returns The most appropriate unit for the given size
 */
export const getBestUnit = (bytes: number | null | undefined): SizeUnit => {
    if (bytes === null || bytes === undefined || bytes === 0) return 'B';

    const units: SizeUnit[] = ['B', 'KB', 'MB', 'GB'];
    let unitIndex = 0;
    let size = Math.abs(bytes);

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return units[unitIndex];
};

/**
 * Parses a human-readable file size string into bytes
 * @param sizeStr A string like "15 MB" or "1.5GB"
 * @returns The size in bytes, or undefined if the format is invalid
 */
export const parseSizeString = (sizeStr: string): number | undefined => {
    const normalized = sizeStr.replace(/\s+/g, '').toUpperCase();

    const match = normalized.match(/^(\d*\.?\d+)([KMGT]?B)?$/);
    if (!match) return undefined;

    const value = parseFloat(match[1]);
    const unit = (match[2] || 'B') as SizeUnit;

    return convertToBytes(value, unit);
};