export const MAX_TITLE_LENGTH = 20;
export const MAX_DESCRIPTION_LENGTH = 60;

export const truncateTitle = (title: string) => {
    return title.length > MAX_TITLE_LENGTH
        ? title.substring(0, MAX_TITLE_LENGTH) + '...'
        : title;
};

export const truncateDescription = (description: string) => {
    return description.length > MAX_DESCRIPTION_LENGTH
        ? description.substring(0, MAX_DESCRIPTION_LENGTH) + '...'
        : description;
};
