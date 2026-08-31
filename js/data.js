// Edit YEAR, COUPLE_NAMES, and each moment's title/blurb/story below.
// blurb = short text shown on the back of the card when flipped.
// story = the longer text shown on that moment's own diary page.

const YEAR = 2026;
const COUPLE_NAMES = "Mohammed & Aya";
const CLOSING_NOTE = "Thanks for looking through our little museum.\nHere's to many more moments like these.";

// The passcode for the lock screen, as digits only (e.g. "0517" for a
// May 17th birthday, or "05171998" if you want month+day+year). The
// keypad on the lock screen will automatically show this many dots.
const SITE_PASSCODE = "192002";

// Background music, played via the little vinyl-record companion that
// floats near the top of the page — click it to play/pause. Drop your
// mp3 file in the music/ folder and point this at it. Leave this blank
// (empty string) and the music companion just won't appear at all.
const MUSIC_SRC = "music/theme.mp3"; // TODO: add your mp3 to the music/ folder

// Shown as an intro card at the top of the Timeline page, before the
// grid of moments — your "how it started" note.
const ORIGIN_STORY = {
  label: "Encounter",
  date: "2026.04.10",
  title: "Meeting the right you at the right time.",
  text: "It will be the most beautiful red roses I will ever encounter."
};

// One write-up per DAY that has multiple photos — shown as that day's
// "album" description on the Timeline page. Key = "month-day" (e.g. "5-8"
// for May 8th). Days with only one photo just reuse that photo's own
// story text automatically, so you don't need an entry here for those.
const DAY_STORIES = {
  "5-8": "The day we were officially engaged doing the engagement the way we wanted with only our beloved families having our sweet moments together.",
  "7-11": "The day I realized that sunsets aren’t just beautiful; they’re somehow so much more magical when I’m watching them with you.",
  "7-16": "3ammo please momkn tsebna nenzl the whole week together :D",
  "7-19": "The day I wanted to express how much your dreams and goals mean to me and they instantly become my to-do list.",
  "8-14": "Flowers, Rose Paris Coffee, Italian Pasta, Us <3"
};

const MOMENTS = [
  {
    "id": 1,
    "image": "photos/01.jpg",
    "day": 30,
    "month": 4,
    "monthName": "April",
    "title": "First Visit & First Photo",
    "blurb": "When Somia and Menna forced us to take this photo :D",
    "story": "That was our first bouquet; after standing on the balcony for a long time searching for a topic to talk about then going to witness the most simple jewelry in the entire world!"
  },
  {
    "id": 2,
    "image": "photos/02.jpg",
    "day": 2,
    "month": 5,
    "monthName": "May",
    "title": "Zircon or Glass",
    "blurb": "Doubting every single stone store in Mansheya.",
    "story": "When we decided to mimic the ring and try to find the perfect stone to use."
  },
  {
    "id": 3,
    "image": "photos/03.jpg",
    "day": 5,
    "month": 5,
    "monthName": "May",
    "title": "Da wala La",
    "blurb": "Searching for a comfortable fine-looking engagement ring.",
    "story": "In one of the days where I was going to Mansheya to continue looking for the stone I stopped by an old local store with old 3ammo waiting inside for any customer and said let's buy my ring from this 3ammo."
  },
  {
    "id": 4,
    "image": "photos/04.jpg",
    "day": 6,
    "month": 5,
    "monthName": "May",
    "title": "Not Revealed Yet",
    "blurb": "Grey or Beige",
    "story": "I hesitated to send you this photo that day and then I thought let's save it as a surprise instead :D"
  },
  {
    "id": 5,
    "image": "photos/05.jpg",
    "day": 7,
    "month": 5,
    "monthName": "May",
    "title": "First Time Out",
    "blurb": "The good pasta and the bad pizza",
    "story": "It was our first time going out, I was quite nervous that the spot is not good enough for you."
  },
  {
    "id": 6,
    "image": "photos/06.jpg",
    "day": 8,
    "month": 5,
    "monthName": "May",
    "title": "Our Engagement Day",
    "blurb": "Yalla bena?",
    "story": "Before coming to our engagement and of course I was nervous. What should I say? What should we do? What are your expectations?"
  },
  {
    "id": 7,
    "image": "photos/07.jpg",
    "day": 8,
    "month": 5,
    "monthName": "May",
    "title": "Our Engagement Day",
    "blurb": "The second bouquet",
    "story": "I always dreamt of taking this photo with the right one for me! I guess that day came Alhamdullah."
  },
  {
    "id": 8,
    "image": "photos/08.jpg",
    "day": 8,
    "month": 5,
    "monthName": "May",
    "title": "Our Engagement Day",
    "blurb": "Kefaya Sowar ya gama3a :D",
    "story": "Sora b3enwan marra wahed se3edy :D"
  },
  {
    "id": 9,
    "image": "photos/09.jpg",
    "day": 8,
    "month": 5,
    "monthName": "May",
    "title": "Our Engagement Day",
    "blurb": "Save the date w kda",
    "story": "After wondering what photos else we should take and then finding this beautiful idea."
  },
  {
    "id": 10,
    "image": "photos/10.jpg",
    "day": 8,
    "month": 5,
    "monthName": "May",
    "title": "Our Engagement Day",
    "blurb": "Authentic w harakat",
    "story": "After some quite not to much lots of (Cringe laa msh hatsawar de) :D"
  },
  {
    "id": 11,
    "image": "photos/11.jpg",
    "day": 8,
    "month": 5,
    "monthName": "May",
    "title": "Our Engagement Day",
    "blurb": "KFAYA CHOCOLATE YABNY",
    "story": "You trying to convince me that he's not a hyperactive child and this is only the chocolate effect :D"
  },
  {
    "id": 12,
    "image": "photos/12.jpg",
    "day": 8,
    "month": 5,
    "monthName": "May",
    "title": "Our Engagement Day",
    "blurb": "Beautiful one",
    "story": "I find this one of our most beautiful photos we have I love it and I love how we look, you were so beautiful and will always be <3."
  },
  {
    "id": 13,
    "image": "photos/13.jpg",
    "day": 25,
    "month": 5,
    "monthName": "May",
    "title": "Second Time Out",
    "blurb": "Waiting for you to arrive",
    "story": "We were trying to get to know each other more and discussing some of our what ifs"
  },
  {
    "id": 14,
    "image": "photos/14.jpg",
    "day": 30,
    "month": 5,
    "monthName": "May",
    "title": "Coffee forever",
    "blurb": "A bit overrated w meen el nas de kolaha",
    "story": "Ammar every five minutes (ana 3aref el bnt de) (ya gama3a ento bayneen fl sora) and then he found out that I was in one of his colleagues stories :D"
  },
  {
    "id": 15,
    "image": "photos/15.jpg",
    "day": 27,
    "month": 6,
    "monthName": "June",
    "title": "Let's try Tim's coffee",
    "blurb": "After telling you that I found a new spot that I'd like us to try",
    "story": "On that day you told me that you were happy that I knew myself what kind of flower wraps you like the most and I was really happy that you liked them <3."
  },
  {
    "id": 16,
    "image": "photos/16.jpg",
    "day": 4,
    "month": 7,
    "monthName": "July",
    "title": "Hanlbes eh",
    "blurb": "We were trying to be matchy matchy",
    "story": "Rose paris? rose paris. This is one of the photos that I love."
  },
  {
    "id": 17,
    "image": "photos/17.jpg",
    "day": 11,
    "month": 7,
    "monthName": "July",
    "title": "Museum? Lunch? Bowling?",
    "blurb": "I now see flowers differently because of you.",
    "story": "I thought let's have a planned day and do some activities together. We discovered that the museum is overrated and Ammar can play bowling :D"
  },
  {
    "id": 18,
    "image": "photos/18.jpg",
    "day": 11,
    "month": 7,
    "monthName": "July",
    "title": "Sunset and us",
    "blurb": "Scattering colors of the sky.",
    "story": "Let's sit down a little and watch the sunset together <3."
  },
  {
    "id": 19,
    "image": "photos/19.jpg",
    "day": 11,
    "month": 7,
    "monthName": "July",
    "title": "Our most precious moments",
    "blurb": "We will always love having this moments together.",
    "story": "I was asking myself how I will be able to witness these moments again alone after that moment."
  },
  {
    "id": 20,
    "image": "photos/20.jpg",
    "day": 11,
    "month": 7,
    "monthName": "July",
    "title": "After Midnight",
    "blurb": "Had ran 3aleko wala lesa? :D",
    "story": "We were waiting for our turn to play bowling :D."
  },
  {
    "id": 21,
    "image": "photos/21.jpg",
    "day": 15,
    "month": 7,
    "monthName": "July",
    "title": "Villa 9 spot",
    "blurb": "Helwa el meraya de yalla netsawar",
    "story": "After going around to know where we can pray and then finally found the spot."
  },
  {
    "id": 22,
    "image": "photos/22.jpg",
    "day": 16,
    "month": 7,
    "monthName": "July",
    "title": "The best cup of tea",
    "blurb": "Where we had our best photo our tea and the sunset",
    "story": "This is one of the most beautiful moments that we had and to many more."
  },
  {
    "id": 23,
    "image": "photos/23.jpg",
    "day": 16,
    "month": 7,
    "monthName": "July",
    "title": "Meen dool",
    "blurb": "Ya tara kaman sana hanb2a feen?",
    "story": "Our first video ever waiting for Ammar to try on tshirts <3."
  },
  {
    "id": 24,
    "image": "photos/24.jpg",
    "day": 16,
    "month": 7,
    "monthName": "July",
    "title": "Howa da elkalaam",
    "blurb": "Where we had our best photo our tea and the sunset",
    "story": "Msh ma32ol ahla shay fl donia wallahi f kobayat ta2m senny :D"
  },
  {
    "id": 25,
    "image": "photos/25.jpg",
    "day": 16,
    "month": 7,
    "monthName": "July",
    "title": "LC Waikiki and us",
    "blurb": "Also you trying to figure out what should you get me as a present :D",
    "story": "After having some coffee and trying to do shopping AKA find what I liked <3."
  },
  {
    "id": 26,
    "image": "photos/26.jpg",
    "day": 19,
    "month": 7,
    "monthName": "July",
    "title": "The Bouquet and The Yacht",
    "blurb": "I thought today baby flowers only.",
    "story": "This is the day that you discoverd (Msh 3arfa ezay baba w ammar msh radyeen y2ololy hagaaa) :D"
  },
  {
    "id": 27,
    "image": "photos/27.jpg",
    "day": 19,
    "month": 7,
    "monthName": "July",
    "title": "Arriving to the yacht",
    "blurb": "Shaklna lwahdna fl yacht da wala eh :D",
    "story": "Feeling the pure air around us with the sea waiting for a topic."
  },
  {
    "id": 28,
    "image": "photos/28.jpg",
    "day": 19,
    "month": 7,
    "monthName": "July",
    "title": "Captain's cabin",
    "blurb": "Eh da we can have a look here?",
    "story": "We had so much fun in this cabin wondering around capturing everything around us :D"
  },
  {
    "id": 29,
    "image": "photos/29.jpg",
    "day": 19,
    "month": 7,
    "monthName": "July",
    "title": "Meen sahbet el eid melad",
    "blurb": "Also another sunset together <3",
    "story": "The moment we were waiting for on that day."
  },
  {
    "id": 30,
    "image": "photos/30.jpg",
    "day": 19,
    "month": 7,
    "monthName": "July",
    "title": "The sunset and us",
    "blurb": "Bos ya ammar o2af hna w emsk el mobile kda",
    "story": "We were trying to capture the sunset with us :D"
  },
  {
    "id": 31,
    "image": "photos/31.jpg",
    "day": 14,
    "month": 8,
    "monthName": "August",
    "title": "Last time before traveling",
    "blurb": "Enta btsawar eh?",
    "story": "On that day I had a lot of mixed feelings happiness, gratefulness and so much more."
  },
  {
    "id": 32,
    "image": "photos/32.jpg",
    "day": 14,
    "month": 8,
    "monthName": "August",
    "title": "Maria and The Italian Chef",
    "blurb": "Hatgebo eh yatara?",
    "story": "I think that was one of the moments that you really realized how much good food means to me :D."
  },
  {
    "id": 33,
    "image": "photos/33.jpg",
    "day": 14,
    "month": 8,
    "monthName": "August",
    "title": "After Pasta",
    "blurb": "Pastaaaa Forevaaaaaa",
    "story": "I will always love having pasta with you. Each time we have pasta together I realize more that my most favorite pasta is with you."
  },
  {
    "id": 34,
    "image": "photos/34.jpg",
    "day": 14,
    "month": 8,
    "monthName": "August",
    "title": "Trying to catch the sunset",
    "blurb": "Ella salaty ma akhaleha",
    "story": "After having a long walk from Maria to Elqa2ed Ebrahim to pray Maghrib."
  }
];
