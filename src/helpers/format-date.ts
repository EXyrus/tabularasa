export const formatDate = (dateString: string | null): string => {
    if (!dateString) return ''; // handle empty or undefined dateString

    const date = new Date(dateString);

    // Define the options object with DateTimeFormatOptions type
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };

    const formattedDate = date.toLocaleDateString('en-GB', options);

    // Add suffix to the day (e.g., 1st, 2nd, 3rd, etc.)
    const day = date.getDate();
    let daySuffix: string;

    switch (day % 10) {
        case 1:
            daySuffix = 'st';
            break;
        case 2:
            daySuffix = 'nd';
            break;
        case 3:
            daySuffix = 'rd';
            break;
        default:
            daySuffix = 'th';
    }

    return formattedDate.replace(
        /\d+(?=(st|nd|rd|th))/,
        match => match + daySuffix
    );
};
