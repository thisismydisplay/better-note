// function to adjust date format and presentation
export const dateAdjustLogic = (resource) => {
    let createdAt = resource.createdAt.toString();
    let cIndex = createdAt.indexOf("GMT");
    let updatedAt = resource.updatedAt.toString();
    let uIndex = updatedAt.indexOf("GMT");

    // generate short strings of date info and attach to resource
    createdAt = createdAt.slice(0, cIndex - 1);
    updatedAt = updatedAt.slice(0, uIndex - 1);
    resource.createdAtShort = createdAt;
    resource.updatedAtShort = updatedAt;
    let now = new Date();

    let updatedDate = new Date(resource.updatedAt);

    // handle singular and plural
    const adjustString = (type, string) => {
        return `${type} ${string}${type > 1 ? "s" : ""} ago`;
    };

    //find diference in milliseconds between stored time and now
    let diffTime = now.getTime() - updatedDate.getTime();

    //check time in increasingly smaller increments and return appropriate measure

    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (days) return adjustString(days, "day");
    const hrs = Math.floor(diffTime / (1000 * 60 * 60));
    if (hrs) return adjustString(hrs, "hr");
    const minutes = Math.floor(diffTime / (1000 * 60));
    if (minutes) return adjustString(minutes, "minute");
    const seconds = Math.floor(diffTime / 1000);

    if (seconds) return adjustString(seconds, "second");
    return "just now";
}
export default function dateAdjust(resourcesObject) {

    // check if single resource or array of resource and call dateAdjustLogic accordingly
    if (resourcesObject.length) {
        resourcesObject.forEach((resource) => {
            resource.timeAgo = dateAdjustLogic(resource);
        });
        // You have to explicitly state what to do if the resObj is 0 otherwise it'll throw a TypeError.
    } else if (resourcesObject.length === 0) {
        return resourcesObject;
    } else {
        resourcesObject.timeAgo = dateAdjustLogic(resourcesObject);
    }
}
