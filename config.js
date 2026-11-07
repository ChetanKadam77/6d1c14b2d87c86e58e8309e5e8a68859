// ============================================================
//  EDIT ME: personalise the whole site from this one file
// ============================================================
window.CONFIG = {
  name: "Ms. Sayeeksha",                       // shown in the hero and page title ("Aarohi" also means "one who climbs")
  role: "Pediatrician \u00B7 Mountain Soul",
  birthday: "2026-11-07",                   // her birthday, YYYY-MM-DD (only month/day matter for the countdown)
  age: 21,                                  // age she is turning (PLACEHOLDER)

  // Birthday wishes: [tone, text, from]. Use {name} where her name should appear.
  wishes: [
    ["funny", "Happy Birthday, {name}! Another year older, but still the only doctor who treats cranky toddlers and 4,000 m passes with the same calm.", "Your Trek Gang"],
    ["funny", "{name}, we'd light all the candles, but at this altitude the oxygen is needed for the cake.", "The Base Camp Crew"],
    ["funny", "Happy Birthday {name}! Prescription for today: two slices of cake, one long nap, repeat as needed. No refills required, we'll bring more.", "Your Patients' Parents"],
    ["funny", "{name}, you're not getting older, you're just gaining altitude. The view keeps getting better.", "Your Friends"],
    ["heartfelt", "{name}, thank you for caring for the little ones the way you do. Every child who meets you leaves a bit braver. Happy Birthday!", "A Grateful Parent"],
    ["heartfelt", "Happy Birthday, {name}! Your patience and warmth make hard days lighter, in the clinic and on the trail.", "All of Us"],
    ["heartfelt", "To {name}: may this year bring you rest after long shifts, summits after long climbs and joy all along the way.", "Someone Who Believes in You"],
    ["heartfelt", "{name}, the world is healthier and happier with you in it. Wishing you a year full of love and good health.", "Your Family"],
    ["mountain", "May your year be like your best trek, {name}: steady climbs, clear skies and a view that takes your breath away. Happy Birthday!", "The Himalaya"],
    ["mountain", "Happy Birthday {name}! May every pass you cross this year have sunshine on the top and hot chai waiting at camp.", "Your Trail Buddies"],
    ["mountain", "{name}, wishing you fresh snow, golden sunrises over the Dhauladhar and a Valley of Flowers in full bloom all year long.", "Garhwal & Kumaon"],
    ["mountain", "Happy Birthday {name}! The mountains are calling and, as always, you're already packing. Go slow, sleep low and enjoy every step.", "Nanda Devi"]
  ],

  // Put your 3 photos in the "photos" folder with these names (or change the paths).
  // Until a file exists, a "click to add photo" placeholder is shown instead.
  photos: [
    { src: "photos/photo1.jpg", caption: "" },
    { src: "photos/photo2.jpg", caption: "" },
    { src: "photos/photo3.jpg", caption: "" }
  ],

  taglines: [
    "Healing little hearts in the valley, chasing big skies on the ridge.",
    "Prescription: fresh air, a steep trail and plenty of chai.",
    "From stethoscope to trekking pole in one long weekend.",
    "Every child deserves a healthy start. Every grown-up deserves a summit.",
    "Dhauladhar dawns, Garhwal glaciers and a bag full of band-aids."
  ],

  about: [
    "She runs for clarity, does yoga for balance, chases sunsets for perspective, and lets music fix the rest.",
    "She loves meaningful conversations, short hikes, languages, cultures.",
    "Weekdays are for tiny patients: tummy aches, first words, growth charts and the occasional sticker negotiation. Weekends belong to the Himalaya.",
    "The same habits serve both worlds: stay calm, watch carefully, listen to what is not being said, and always know when to turn around. The mountains are the best clinic for the soul.",
    "P.S : She is scared of Horror Movies and loves Smooth Operator Song :P ."
  ],

  // Stats removed. Add entries as [label, number] to show them again.
  stats: [],

  // Flip cards: [title, front line, back text]
  tips: [
    ["Go slow, sleep low", "The golden rule of altitude",
      "Above about 3,000 m, avoid big jumps in the height where you sleep. A common guide is to gain no more than about 500 m per night, with a rest day every few days."],
    ["Little ones can't say it", "Kids show altitude trouble differently",
      "Young children can't say \u201Cmy head hurts\u201D. Unusual fussiness, poor feeding, vomiting or restless sleep can be early signs. If in doubt, don't go higher. Go down."],
    ["Water is the best snack", "Dry cold air dries kids out fast",
      "Offer fluids often, warm drinks are great, and keep small snacks coming. Children get tired and cranky long before they get thirsty."],
    ["UV is stronger up high", "Snow reflects the sun right back",
      "UV exposure rises with altitude and snow bounces it back at you. Use sunscreen, wide-brim hats and UV-rated sunglasses, and keep babies in shade and covered."],
    ["Layers, not bulk", "Base, warmth, shell",
      "A wicking base layer, a warm mid-layer and a windproof shell beat one heavy coat. Protect hands, feet and ears, and check for cold, pale or numb fingers and toes."],
    ["Know your exit", "Plan the way down first",
      "Carry a first-aid kit, know the nearest health centre, and remember that descending is the best treatment for altitude illness. Talk to your own pediatrician before taking infants or children with heart or lung conditions high up."]
  ],

  // The altitude ladder: [name, metres, range / region, state, note]
  peaks: [
    ["Kangchenjunga", 8586, "Eastern Himalaya", "Sikkim \u2013 Nepal border", "Third highest mountain on Earth and the highest point in India, shared with Nepal."],
    ["Nanda Devi", 7816, "Garhwal Himalaya", "Uttarakhand", "The highest peak lying entirely inside India. It guards the Nanda Devi sanctuary, a UNESCO World Heritage Site."],
    ["Kamet", 7756, "Zanskar range", "Uttarakhand", "Second highest in Uttarakhand. In 1931 it became the first 7,000 m+ summit ever climbed."],
    ["Chaukhamba I", 7138, "Garhwal Himalaya", "Uttarakhand", "A four-pillared giant (its name means exactly that) rising above Badrinath."],
    ["Trishul", 7120, "Kumaon Himalaya", "Uttarakhand", "Three peaks side by side, named after Shiva's trident."],
    ["Leo Pargil", 6816, "Kinnaur Himalaya", "Himachal Pradesh", "Among the highest peaks of Himachal, close to the Tibetan border."],
    ["Kinner Kailash", 6050, "Kinnaur Kailash range", "Himachal Pradesh", "Sacred peak with a natural rock pillar said to resemble a Shiva Linga."],
    ["Hanuman Tibba", 5982, "Pir Panjal", "Himachal Pradesh", "The big white pyramid you see above Solang and Manali."],
    ["Indrahar Pass", 4342, "Dhauladhar range", "Himachal Pradesh", "A classic high crossing above McLeod Ganj with huge views of the Pir Panjal."],
    ["Rohtang Pass", 3978, "Pir Panjal", "Himachal Pradesh", "Doorway from the green Kullu valley into the dry, high Lahaul."]
  ],

  // Quiz pool. The FIRST answer is always the correct one (options get shuffled when shown).
  // Each round draws 10 random questions from this pool.
  quiz: [
    { lvl: "Easy", q: "Which range rises like a white wall behind Dharamshala and McLeod Ganj?",
      a: ["Dhauladhar", "Shivalik", "Karakoram", "Aravalli"],
      fact: "\u201CDhauladhar\u201D means the White Range. Its snowy ridges tower over the Kangra valley." },
    { lvl: "Easy", q: "Rohtang Pass, the gateway from Kullu to Lahaul, lies in which range?",
      a: ["Pir Panjal", "Karakoram", "Dhauladhar", "Vindhya"],
      fact: "Rohtang sits at about 3,978 m in the Pir Panjal and has long separated the green Kullu valley from dry Lahaul." },
    { lvl: "Medium", q: "Which is the southernmost, outermost range of the Himalaya, running along the foothills?",
      a: ["Shivalik", "Himadri (Greater Himalaya)", "Zanskar", "Pir Panjal"],
      fact: "The Shivaliks form the Outer Himalaya. North of them come the Lesser Himalaya, then the Greater Himalaya (Himadri)." },
    { lvl: "Easy", q: "Nanda Devi (7,816 m), the highest peak lying wholly inside India, is in which state?",
      a: ["Uttarakhand", "Himachal Pradesh", "Sikkim", "Jammu & Kashmir"],
      fact: "Nanda Devi stands in the Garhwal Himalaya of Uttarakhand. Kangchenjunga is higher but shared with Nepal." },
    { lvl: "Medium", q: "The name \u201CSpiti\u201D is commonly translated as...",
      a: ["The Middle Land", "Land of Snow", "Valley of the Gods", "The Silver Path"],
      fact: "Spiti is \u201Cthe middle land\u201D between India and Tibet, a high-altitude cold desert in Himachal." },
    { lvl: "Medium", q: "Gaumukh, the snout from where the Bhagirathi emerges, belongs to which glacier?",
      a: ["Gangotri", "Siachen", "Pindari", "Milam"],
      fact: "Gangotri Glacier in Uttarkashi feeds the Bhagirathi, which meets the Alaknanda at Devprayag to form the Ganga." },
    { lvl: "Medium", q: "Which of these is NOT one of the Chota Char Dham shrines of Uttarakhand?",
      a: ["Amarnath", "Yamunotri", "Kedarnath", "Badrinath"],
      fact: "The Chota Char Dham are Yamunotri, Gangotri, Kedarnath and Badrinath. Amarnath is in Jammu & Kashmir." },
    { lvl: "Medium", q: "The Hampta Pass trek (about 4,270 m) links the Kullu valley with which valley?",
      a: ["Lahaul", "Kangra", "Pangi", "Kinnaur"],
      fact: "Hampta crosses the Pir Panjal from lush Kullu into the stark landscapes of Lahaul, close to Chandra Tal." },
    { lvl: "Easy", q: "Roopkund, the mysterious \u201CSkeleton Lake\u201D, is found in which state?",
      a: ["Uttarakhand", "Himachal Pradesh", "Sikkim", "Arunachal Pradesh"],
      fact: "Roopkund lies near 5,000 m in Chamoli, Uttarakhand, in the shadow of the Trishul massif." },
    { lvl: "Hard", q: "Kamet (7,756 m), Uttarakhand's second-highest peak, belongs to which range?",
      a: ["Zanskar", "Pir Panjal", "Dhauladhar", "Shivalik"],
      fact: "Kamet is in the Zanskar range, and its 1931 first ascent made it the first 7,000 m+ peak ever climbed." },
    { lvl: "Medium", q: "Chandra Tal, the \u201CMoon Lake\u201D, is a short distance from which high pass?",
      a: ["Kunzum La", "Rohtang La", "Zoji La", "Nathu La"],
      fact: "Chandra Tal sits at about 4,300 m, a short drive and walk from Kunzum La in Lahaul and Spiti." },
    { lvl: "Hard", q: "The Valley of Flowers National Park shares its UNESCO World Heritage listing with which park?",
      a: ["Nanda Devi National Park", "Jim Corbett National Park", "Rajaji National Park", "Govind Pashu Vihar"],
      fact: "Together they form the Nanda Devi and Valley of Flowers National Parks, a UNESCO site in Chamoli, Uttarakhand." },
    { lvl: "Easy", q: "K2, the second-highest mountain on Earth, belongs to which range?",
      a: ["Karakoram", "Zanskar", "Pir Panjal", "Garhwal Himalaya"],
      fact: "K2 (8,611 m) is in the Karakoram, the range that also holds the Siachen Glacier at the top of India." },
    { lvl: "Medium", q: "Kinner Kailash, famous for its Shiva Linga rock pillar, is in which Himachal district?",
      a: ["Kinnaur", "Kullu", "Chamba", "Sirmaur"],
      fact: "Kinner Kailash (about 6,050 m) rises above the Kinnaur valley and is the focus of a sacred parikrama." },
    { lvl: "Hard", q: "Zoji La is the pass that connects Srinagar with which region?",
      a: ["Ladakh", "Spiti", "Garhwal", "Kinnaur"],
      fact: "Zoji La, about 3,500 m, links the Kashmir valley with Ladakh and is often called the gateway to Ladakh." }
  ],

  notesSeed: [
    ["A grateful parent", "Thank you for always making the scariest clinic day feel like a small adventure."],
    ["Trail buddy", "Next stop: Hampta Pass. Pack the chai flask."]
  ]
};
