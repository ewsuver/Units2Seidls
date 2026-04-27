// Conversion constants
const SEIDL_LENGTH_METERS = 1.7272; // 5'8" in meters
const SEIDL_TIME_SECONDS = 36 * 365.25 * 24 * 3600; // 36 years in seconds
const SEIDL_VOLUME_CUBIC_METERS = Math.pow(SEIDL_LENGTH_METERS, 3); // cubic seidls
const SEIDL_AREA_SQUARE_METERS = Math.pow(SEIDL_LENGTH_METERS, 2); // square seidls

// Conversion factors for distance (to meters)
const distanceFactors = {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    foot: 0.3048,
    inch: 0.0254,
    yard: 0.9144,
    mile: 1609.34,
    nautical_mile: 1852,
    micrometer: 1e-6,
    nanometer: 1e-9
};

// Conversion factors for area (to square meters)
const areaFactors = {
    square_meter: 1,
    square_kilometer: 1e6,
    square_centimeter: 1e-4,
    hectare: 10000,
    square_foot: 0.092903,
    square_inch: 0.00064516,
    square_yard: 0.836127,
    square_mile: 2.58999e6,
    acre: 4046.86
};

// Conversion factors for speed (to meters per second)
const speedFactors = {
    meter_per_second: 1,
    kilometer_per_hour: 1 / 3.6,
    miles_per_hour: 0.44704,
    feet_per_second: 0.3048,
    knots: 0.51444,
    feet_per_hour: 0.3048 / 3600
};

// Conversion factors for time (to seconds)
const timeFactors = {
    second: 1,
    minute: 60,
    hour: 3600,
    day: 86400,
    week: 604800,
    month: 2592000, // 30 days
    year: 31536000,
    decade: 315360000,
    century: 3153600000
};

// Conversion factors for volume (to cubic meters)
const volumeFactors = {
    cubic_meter: 1,
    cubic_centimeter: 1e-6,
    liter: 0.001,
    milliliter: 1e-6,
    gallon_us: 0.00378541,
    gallon_imperial: 0.00454609,
    cubic_foot: 0.0283168,
    cubic_inch: 1.63871e-5,
    fluid_ounce_us: 2.95735e-5,
    pint: 0.000473176
};

// Conversion factors for mass (to kilograms)
const massFactors = {
    kilogram: 1,
    gram: 0.001,
    milligram: 1e-6,
    pound: 0.453592,
    ounce: 0.0283495,
    ton_metric: 1000,
    ton_us: 907.185,
    stone: 6.35029
};

// Unit display names
const displayNames = {
    // Distance
    meter: 'meters',
    kilometer: 'km',
    centimeter: 'cm',
    millimeter: 'mm',
    foot: 'feet',
    inch: 'inches',
    yard: 'yards',
    mile: 'miles',
    nautical_mile: 'nm',
    micrometer: 'μm',
    nanometer: 'nm',
    // Area
    square_meter: 'm²',
    square_kilometer: 'km²',
    square_centimeter: 'cm²',
    hectare: 'hectares',
    square_foot: 'ft²',
    square_inch: 'in²',
    square_yard: 'yd²',
    square_mile: 'mi²',
    acre: 'acres',
    // Speed
    meter_per_second: 'm/s',
    kilometer_per_hour: 'km/h',
    miles_per_hour: 'mph',
    feet_per_second: 'ft/s',
    knots: 'knots',
    feet_per_hour: 'ft/h',
    // Time
    second: 'seconds',
    minute: 'minutes',
    hour: 'hours',
    day: 'days',
    week: 'weeks',
    month: 'months',
    year: 'years',
    decade: 'decades',
    century: 'centuries',
    // Volume
    cubic_meter: 'm³',
    cubic_centimeter: 'cm³',
    liter: 'liters',
    milliliter: 'ml',
    gallon_us: 'US gal',
    gallon_imperial: 'imp gal',
    cubic_foot: 'ft³',
    cubic_inch: 'in³',
    fluid_ounce_us: 'fl oz',
    pint: 'pints',
    // Mass
    kilogram: 'kg',
    gram: 'g',
    milligram: 'mg',
    pound: 'lbs',
    ounce: 'oz',
    ton_metric: 'metric tons',
    ton_us: 'US tons',
    stone: 'stones'
};

// Format number for display
function formatNumber(num) {
    if (num === 0) return '0';
    
    const absNum = Math.abs(num);
    
    // For very small numbers, use scientific notation
    if (absNum < 1e-6 && absNum > 0) {
        return num.toExponential(6);
    }
    
    // For very large numbers, use scientific notation
    if (absNum >= 1e7) {
        return num.toExponential(6);
    }
    
    // For regular numbers, use fixed notation with appropriate decimals
    if (absNum < 0.01) {
        return num.toFixed(10).replace(/\.?0+$/, '');
    }
    if (absNum < 1) {
        return num.toFixed(6).replace(/\.?0+$/, '');
    }
    if (absNum < 1000) {
        return num.toFixed(4).replace(/\.?0+$/, '');
    }
    
    return num.toFixed(2).replace(/\.?0+$/, '');
}

// Distance converter
function convertDistance() {
    const value = parseFloat(document.getElementById('distanceValue').value);
    const unit = document.getElementById('distanceUnit').value;
    const resultEl = document.getElementById('distanceResult');
    
    if (!value || value === 0) {
        resultEl.textContent = 'Enter a value to convert';
        return;
    }
    
    const meters = value * distanceFactors[unit];
    const seidls = meters / SEIDL_LENGTH_METERS;
    
    resultEl.textContent = `${formatNumber(seidls)} Seidls (length)`;
    resultEl.parentElement.classList.add('updating');
    setTimeout(() => resultEl.parentElement.classList.remove('updating'), 300);
}

// Area converter
function convertArea() {
    const value = parseFloat(document.getElementById('areaValue').value);
    const unit = document.getElementById('areaUnit').value;
    const resultEl = document.getElementById('areaResult');
    
    if (!value || value === 0) {
        resultEl.textContent = 'Enter a value to convert';
        return;
    }
    
    const squareMeters = value * areaFactors[unit];
    const seidls = squareMeters / SEIDL_AREA_SQUARE_METERS;
    
    resultEl.textContent = `${formatNumber(seidls)} Seidls² (area)`;
    resultEl.parentElement.classList.add('updating');
    setTimeout(() => resultEl.parentElement.classList.remove('updating'), 300);
}

// Speed converter
function convertSpeed() {
    const value = parseFloat(document.getElementById('speedValue').value);
    const unit = document.getElementById('speedUnit').value;
    const resultEl = document.getElementById('speedResult');
    
    if (!value || value === 0) {
        resultEl.textContent = 'Enter a value to convert';
        return;
    }
    
    const metersPerSecond = value * speedFactors[unit];
    const seidlsPerTime = metersPerSecond / SEIDL_LENGTH_METERS * SEIDL_TIME_SECONDS;
    
    resultEl.textContent = `${formatNumber(seidlsPerTime)} Seidls/time (36 years)`;
    resultEl.parentElement.classList.add('updating');
    setTimeout(() => resultEl.parentElement.classList.remove('updating'), 300);
}

// Time converter
function convertTime() {
    const value = parseFloat(document.getElementById('timeValue').value);
    const unit = document.getElementById('timeUnit').value;
    const resultEl = document.getElementById('timeResult');
    
    if (!value || value === 0) {
        resultEl.textContent = 'Enter a value to convert';
        return;
    }
    
    const seconds = value * timeFactors[unit];
    const seidls = seconds / SEIDL_TIME_SECONDS;
    
    resultEl.textContent = `${formatNumber(seidls)} Seidls (time / 36 years)`;
    resultEl.parentElement.classList.add('updating');
    setTimeout(() => resultEl.parentElement.classList.remove('updating'), 300);
}

// Volume converter
function convertVolume() {
    const value = parseFloat(document.getElementById('volumeValue').value);
    const unit = document.getElementById('volumeUnit').value;
    const resultEl = document.getElementById('volumeResult');
    
    if (!value || value === 0) {
        resultEl.textContent = 'Enter a value to convert';
        return;
    }
    
    const cubicMeters = value * volumeFactors[unit];
    const seidls = cubicMeters / SEIDL_VOLUME_CUBIC_METERS;
    
    resultEl.textContent = `${formatNumber(seidls)} Seidls³ (volume)`;
    resultEl.parentElement.classList.add('updating');
    setTimeout(() => resultEl.parentElement.classList.remove('updating'), 300);
}

// Mass converter
function convertMass() {
    const value = parseFloat(document.getElementById('massValue').value);
    const unit = document.getElementById('massUnit').value;
    const resultEl = document.getElementById('massResult');
    
    if (!value || value === 0) {
        resultEl.textContent = 'Enter a value to convert';
        return;
    }
    
    const kilograms = value * massFactors[unit];
    
    // Display mass in Seidls equivalent (using length as proxy for mass density)
    // This is a creative conversion based on the seidl length unit
    const seidlMass = kilograms / (SEIDL_LENGTH_METERS * 1000); // Arbitrary scaling
    
    resultEl.textContent = `${formatNumber(kilograms)} kg (Mass is not a Seidl unit)`;
    resultEl.parentElement.classList.add('updating');
    setTimeout(() => resultEl.parentElement.classList.remove('updating'), 300);
}

// Event listeners
document.getElementById('distanceValue').addEventListener('input', convertDistance);
document.getElementById('distanceUnit').addEventListener('change', convertDistance);

document.getElementById('areaValue').addEventListener('input', convertArea);
document.getElementById('areaUnit').addEventListener('change', convertArea);

document.getElementById('speedValue').addEventListener('input', convertSpeed);
document.getElementById('speedUnit').addEventListener('change', convertSpeed);

document.getElementById('timeValue').addEventListener('input', convertTime);
document.getElementById('timeUnit').addEventListener('change', convertTime);

document.getElementById('volumeValue').addEventListener('input', convertVolume);
document.getElementById('volumeUnit').addEventListener('change', convertVolume);

document.getElementById('massValue').addEventListener('input', convertMass);
document.getElementById('massUnit').addEventListener('change', convertMass);
