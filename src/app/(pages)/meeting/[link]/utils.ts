import { IMeeting } from "@/app/interfaces/meeting.type";
import moment from "moment";

// write a function which accepts meeting and check if the meeting has  started and meeting isnot ended
// if the meeting has started and meeting is not ended return true else return false
// if the meeting has not started return false
// if the meeting has ended return false
export function isMeetingActive(meeting: IMeeting) {
    const current = moment();
    const start = moment(meeting.startDate);
    const end = moment(meeting.endDate);
    return current.isBetween(start, end);
}
