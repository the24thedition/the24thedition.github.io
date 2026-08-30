// Edit YEAR, COUPLE_NAMES, and each moment's title/blurb/story below.
// blurb = short text shown on the back of the card when flipped.
// story = the longer text shown on that moment's own diary page.

const YEAR = 2026; // TODO: confirm the actual year
const COUPLE_NAMES = "Mohammed & Aya"; // TODO: edit
const CLOSING_NOTE = "Thanks for looking through our little museum.\nHere's to many more moments like these."; // TODO: edit

// The passcode for the lock screen, as digits only (e.g. "0517" for a
// May 17th birthday, or "05171998" if you want month+day+year). The
// keypad on the lock screen will automatically show this many dots.
const SITE_PASSCODE = "192002"; // TODO: set this to her birthday

// Background music, played via the little vinyl-record companion that
// floats near the top of the page — click it to play/pause. Drop your
// mp3 file in the music/ folder and point this at it. Leave this blank
// (empty string) and the music companion just won't appear at all.
const MUSIC_SRC = "music/theme.mp3"; // TODO: add your mp3 to the music/ folder

// Shown as an intro card at the top of the Timeline page, before the
// grid of moments — your "how it started" note.
const ORIGIN_STORY = {
  label: "Encounter",
  date: "2024.10.13", // TODO: edit to your actual meeting date
  title: "Meeting the right you at the right time.",
  text: "Although there wasn't a movie-like encounter, with so many people in the world, meeting at all is a miracle." // TODO: edit
};

// One write-up per DAY that has multiple photos — shown as that day's
// "album" description on the Timeline page. Key = "month-day" (e.g. "5-8"
// for May 8th). Days with only one photo just reuse that photo's own
// story text automatically, so you don't need an entry here for those.
const DAY_STORIES = {
  "5-8": "✏️ Write the story of this whole day here — this is the write-up shown next to the stack of all the engagement day photos.",
  "7-11": "✏️ Write about this day together.",
  "7-16": "✏️ Write about this day together.",
  "7-19": "✏️ Write about this day together.",
  "8-14": "✏️ Write about this day together."
};

const MOMENTS = [
  {
    "id": 1,
    "image": "photos/01.jpg",
    "day": 30,
    "month": 4,
    "monthName": "April",
    "title": "First Visit",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 2,
    "image": "photos/02.jpg",
    "day": 2,
    "month": 5,
    "monthName": "May",
    "title": "Before Anything",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 3,
    "image": "photos/03.jpg",
    "day": 5,
    "month": 5,
    "monthName": "May",
    "title": "✏️ Add a title",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 4,
    "image": "photos/04.jpg",
    "day": 6,
    "month": 5,
    "monthName": "May",
    "title": "Not Revealed Yet",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 5,
    "image": "photos/05.jpg",
    "day": 7,
    "month": 5,
    "monthName": "May",
    "title": "First Time Out",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 6,
    "image": "photos/06.jpg",
    "day": 8,
    "month": 5,
    "monthName": "May",
    "title": "Engagement Day",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 7,
    "image": "photos/07.jpg",
    "day": 8,
    "month": 5,
    "monthName": "May",
    "title": "Engagement Day",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 8,
    "image": "photos/08.jpg",
    "day": 8,
    "month": 5,
    "monthName": "May",
    "title": "Engagement Day",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 9,
    "image": "photos/09.jpg",
    "day": 8,
    "month": 5,
    "monthName": "May",
    "title": "Engagement Day",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 10,
    "image": "photos/10.jpg",
    "day": 8,
    "month": 5,
    "monthName": "May",
    "title": "Engagement Day",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 11,
    "image": "photos/11.jpg",
    "day": 8,
    "month": 5,
    "monthName": "May",
    "title": "Engagement Day",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 12,
    "image": "photos/12.jpg",
    "day": 8,
    "month": 5,
    "monthName": "May",
    "title": "Engagement Day",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 13,
    "image": "photos/13.jpg",
    "day": 25,
    "month": 5,
    "monthName": "May",
    "title": "Second Time Out",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 14,
    "image": "photos/14.jpg",
    "day": 30,
    "month": 5,
    "monthName": "May",
    "title": "✏️ Add a title",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 15,
    "image": "photos/15.jpg",
    "day": 27,
    "month": 6,
    "monthName": "June",
    "title": "✏️ Add a title",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 16,
    "image": "photos/16.jpg",
    "day": 4,
    "month": 7,
    "monthName": "July",
    "title": "✏️ Add a title",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 17,
    "image": "photos/17.jpg",
    "day": 11,
    "month": 7,
    "monthName": "July",
    "title": "✏️ Add a title",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 18,
    "image": "photos/18.jpg",
    "day": 11,
    "month": 7,
    "monthName": "July",
    "title": "✏️ Add a title",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 19,
    "image": "photos/19.jpg",
    "day": 11,
    "month": 7,
    "monthName": "July",
    "title": "✏️ Add a title",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 20,
    "image": "photos/20.jpg",
    "day": 12,
    "month": 7,
    "monthName": "July",
    "title": "After Midnight",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 21,
    "image": "photos/21.jpg",
    "day": 15,
    "month": 7,
    "monthName": "July",
    "title": "✏️ Add a title",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 22,
    "image": "photos/22.jpg",
    "day": 16,
    "month": 7,
    "monthName": "July",
    "title": "✏️ Add a title",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 23,
    "image": "photos/23.jpg",
    "day": 16,
    "month": 7,
    "monthName": "July",
    "title": "✏️ Add a title",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 24,
    "image": "photos/24.jpg",
    "day": 16,
    "month": 7,
    "monthName": "July",
    "title": "✏️ Add a title",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 25,
    "image": "photos/25.jpg",
    "day": 17,
    "month": 7,
    "monthName": "July",
    "title": "✏️ Add a title",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 26,
    "image": "photos/26.jpg",
    "day": 19,
    "month": 7,
    "monthName": "July",
    "title": "✏️ Add a title",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 27,
    "image": "photos/27.jpg",
    "day": 19,
    "month": 7,
    "monthName": "July",
    "title": "✏️ Add a title",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 28,
    "image": "photos/28.jpg",
    "day": 19,
    "month": 7,
    "monthName": "July",
    "title": "✏️ Add a title",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 29,
    "image": "photos/29.jpg",
    "day": 19,
    "month": 7,
    "monthName": "July",
    "title": "✏️ Add a title",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 30,
    "image": "photos/30.jpg",
    "day": 19,
    "month": 7,
    "monthName": "July",
    "title": "✏️ Add a title",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 31,
    "image": "photos/31.jpg",
    "day": 14,
    "month": 8,
    "monthName": "August",
    "title": "✏️ Add a title",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 32,
    "image": "photos/32.jpg",
    "day": 14,
    "month": 8,
    "monthName": "August",
    "title": "✏️ Add a title",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 33,
    "image": "photos/33.jpg",
    "day": 14,
    "month": 8,
    "monthName": "August",
    "title": "✏️ Add a title",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  },
  {
    "id": 34,
    "image": "photos/34.jpg",
    "day": 14,
    "month": 8,
    "monthName": "August",
    "title": "✏️ Add a title",
    "blurb": "✏️ Write a short line for the back of this photo.",
    "story": "✏️ Write the full story of this moment here. This shows up on the dedicated diary page — as long as you'd like."
  }
];
