/*
This file to be included in every document via navbar and accesible in every page.
Do not include onclick/event handlers here, only functions.
*/


/*
==============================================================================
Adds a parameter to the URL without reloading the page. Useful for creating shareable links i.e. for dashboards.
------------------------------------------------------------------------------ 
Input Variables:
    - key: (string) the query  
    - value: (string) the query parameter
Output:
    - none
Notes:
    This affects the browser history state, and will create a new entry.
==============================================================================
*/
function insertUrlParam(key, value) {
    let currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set(key, value);
    // Set the new URL in the browser without reloading the page.
    window.history.replaceState({}, document.title, currentUrl.toString());
}

/*
==============================================================================
Removes multiple parameters from the URL without reloading the page. Useful for creating shareable links i.e. for dashboards.
------------------------------------------------------------------------------ 
Input Variables:
    - key: ( [strings], or "string") the queries
Output:
    - true/false if query exists (and thus, removed)
Notes:
    This affects the browser history state, and will create a new entry.
==============================================================================
*/
function removeUrlParam(keys) {
    let currentUrl = new URL(window.location.href);
    //convert to array if single value passed
    if (!Array.isArray(keys)) {
        keys = [keys];
    }
    for (const key of keys) {
        currentUrl.searchParams.delete(key);
    }
    // Set the new URL in the browser without reloading the page.
    window.history.replaceState({}, document.title, currentUrl.toString());
}


/*
==============================================================================
Get value of a query parameter from url.
------------------------------------------------------------------------------ 
Input Variables:
    - key: (string) the query param
Output:
    - the value if found, else null
==============================================================================
*/
function getUrlParam(key) {
    const urlParams = new URLSearchParams(window.location.search);
    let value = urlParams.get(key);
    return value;
}


/*
==============================================================================
Get timezone abbreviation string from date + region strings.
------------------------------------------------------------------------------ 
Input Variables:
    - date_str: (string) i.e. "Sep 12, 2024"
    - region_str: (string) a timezone region i.e. "America/Los_Angeles"
Output:
    - timezode code i.e. "PST", "PDT", "EST", "GMT+2"
    NOTE: time zones codes outside of the Americas don't appear to be natively
        supported in JS and will return as difference from GMT. i.e. CEST -> "GMT+2" 
==============================================================================
*/
function getTimezoneAbbr(date_str, region_str) {
    if (!date_str || !region_str) {
        return null;
    }

    let date = new Date(date_str);
    let timezone_code = date.toLocaleTimeString(undefined, { timeZone: region_str, timeZoneName: 'short' }).split(' ')[2];

    return timezone_code;
}