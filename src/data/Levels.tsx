const teacher = {
  mrComet: {
    name: `Mr Comet `,
    image: "/MsComet.png",
  },
  msStar: {
    name: `Ms Star `,
    image: "/MissStar.jpg",
  },
};
export const Levels = [
  // {
  //   id: 1,
  //   title: "The Basics",
  //   href: "The_Basics",
  //   desc: "Learn about the Cupola and its role",
  //   content: [],
  // },
  {
    id: 2,
    title: "Level 1",
    href: "Level_1",
    desc: "Learn about the Cupola and its role",
    Voice: "/voices/level_1.mp3",
    teacher: teacher.msStar,
    content: [
      {
        title:
          " Level 1 – Cupola’s Role in Natural Disasters: Example – Hurricane Harvey (2017) ",
        desc: " Welcome to Level One: Cupola’s Role in Natural Disasters. The Cupola isn’t just a window in space — it’s a powerful observation point that helps scientists study what’s happening on Earth. Today, we’ll see how it helped during Hurricane Harvey in 2017. ",
      },
      {
        title: "Step 1 — Spotting the Storm",
        desc: `When Hurricane Harvey started forming over the ocean, scientists on Earth tracked it using satellites. But to get clearer, real-time images, they asked the astronauts on the International Space Station to observe it through the Cupola.  `,
      },
      {
        title: "Step 2 — Getting Ready Inside ",
        desc: `Astronaut Jack Fischer prepared the Cupola for observation. 
He opened the protective shutters and mounted a camera on a special tracker that keeps it stable as the ISS moves around Earth. 
`,
      },
      {
        title: "Step 3 — Taking the Photos ",
        desc: `Through the Cupola’s wide windows, he used a high-zoom lens to capture the hurricane’s eye and cloud structure in great detail. 
Each image gave scientists new insights into how the storm was evolving. 
`,
      },
      {
        title: "Step 4 — Sending the Photos to Earth",
        desc: `After taking the pictures, the data was transmitted to NASA’s mission control. 
Experts analyzed the images and added coordinates, making them ready for emergency teams and researchers on the ground. 
`,
      },
      {
        title: "Step 5 — Helping on the Ground ",
        desc: `By combining these Cupola images with satellite data, scientists built detailed flood maps. 
These maps helped rescuers know which areas were underwater and which routes were still safe to use. 
`,
      },
      {
        title: "Closing: ",
        desc: "So, the Cupola played an important role in understanding and responding to Hurricane Harvey. ",
      },
    ],
    videoLink:
      "https://drive.google.com/file/d/10JpVvz-88HPp0KP98tJ2mAQ_Q8ggnnc-/preview",
    questions: [
      {
        id: 1,
        question:
          "What is the main role of the Cupola in natural disaster monitoring?",
        options: [
          "Acting as a lookout to observe natural disasters on Earth",
          "Measuring temperatures on other planets",
          "Testing new space cameras",
          "Tracking stars in the galaxy",
        ],
        correct: "Acting as a lookout to observe natural disasters on Earth",
      },
      {
        id: 2,
        question: "How do astronauts use the Cupola during natural disasters?",
        options: [
          "Taking pictures of disasters to send to scientists",
          "Building weather satellites",
          "Studying moon craters",
          "Monitoring space station orbits",
        ],
        correct: "Taking pictures of disasters to send to scientists",
      },
      {
        id: 3,
        question:
          "What equipment helps astronauts in the Cupola capture disaster images?",
        options: [
          "Using a special camera and tracker to capture steady images",
          "Using a telescope to view distant storms",
          "Operating a robotic arm for photos",
          "Measuring wind speeds with sensors",
        ],
        correct: "Using a special camera and tracker to capture steady images",
      },
      {
        id: 4,
        question:
          "What do astronauts photograph from the Cupola during disasters?",
        options: [
          "Features of disasters like storm clouds and hurricane eyes",
          "Stars and constellations",
          "Ocean currents",
          "Space station components",
        ],
        correct: "Features of disasters like storm clouds and hurricane eyes",
      },
      {
        id: 5,
        question: "What happens to Cupola photos after they are taken?",
        options: [
          "They are sent to Earth for experts to analyze and add location data",
          "They are stored on the ISS for astronauts",
          "They are used to navigate the ISS",
          "They are shared with other planets",
        ],
        correct:
          "They are sent to Earth for experts to analyze and add location data",
      },
    ],
  },
  {
    id: 3,
    title: "Level 2",
    href: "Level_2",
    desc: "Natural disaster observation",
    Voice: "/voices/level_2.mp3",
    teacher: teacher.mrComet,
    content: [
      {
        title:
          "Welcome to Level Two — the Cupola’s Role in Climate Change Monitoring. ",
        desc: `
      From the International Space Station, astronauts and instruments work together to study how Earth’s climate is changing over time. 

The Cupola gives astronauts a perfect observation point to take detailed photos of Earth’s atmosphere, oceans, and land. 
These photos are used to compare changes in weather patterns, vegetation, and ice coverage across years. `,
      },
      {
        title: "How the ISS Studies Climate ",
        desc: `Outside the ISS, there are several instruments that constantly monitor Earth. 
For example, ECOSTRESS measures how plants respond to heat and drought. 
GEDI uses laser technology to create 3D maps of forests and track how much carbon they store. 

And OCO-3 studies carbon dioxide levels in the atmosphere — one of the hardest gases to measure accurately. 
Other instruments like DESIS, TSIS-1, and HISUI observe sunlight, colors, and surface changes to show how ecosystems evolve.`,
      },
      {
        title: "Why Carbon Dioxide Is Difficult to Track ",
        desc: `Some gases, like ozone or water vapor, change a lot when pollution occurs, so they’re easy to notice. 
But carbon dioxide changes very little — sometimes less than one part per million. 
That’s why instruments like OCO-3 need to be extremely precise. 

Even these tiny measurements help scientists understand how human activity affects Earth’s balance and temperature.`,
      },
      {
        title: " Sediment Science — What Microgravity Teaches Us ",
        desc: `Scientists have also used the ISS to study how sediments — small bits of soil or minerals — behave in microgravity. 
Without gravity, they could observe how particles naturally stick together — something hard to see on Earth. 

This research helps build better models of how rivers move, how carbon travels through oceans, and how erosion affects coastal areas. 

Shape `,
      },
      {
        title: " Real Climate Photos from Space ",
        desc: `Astronauts also take photos that help document climate patterns over time. 
For instance, Perth in Australia shows a Mediterranean climate — dry summers and green winters. 
And Pyramid Lake in Nevada used to be part of a massive Ice Age lake. 

Now it’s much smaller because of a warmer, drier climate — proof of how Earth’s surface keeps changing. `,
      },
      {
        title: "Closing:",
        desc: `So, the Cupola isn’t just for observation — it’s a vital part of studying our planet’s long-term health. 
Every photo, every measurement from space helps us protect Earth’s future. 
That’s the true power of the Cupola. `,
      },
    ],
    videoLink:
      "https://drive.google.com/file/d/1uw5mEE8hX8ICh8oFUfmAag9Bkm9Q59UY/preview",
    questions: [
      {
        id: 1,
        question:
          "What is the main role of the Cupola and the ISS in climate change research?",
        options: [
          "To collect long-term data about Earth's climate and environment",
          "To track asteroids near Earth",
          "To test rockets and satellites",
          "To study the Moon’s atmosphere",
        ],
        correct:
          "To collect long-term data about Earth's climate and environment",
      },
      {
        id: 2,
        question: "Which instrument studies how plants handle heat and water?",
        options: ["ECOSTRESS", "OCO-3", "GEDI", "TSIS-1"],
        correct: "ECOSTRESS",
      },
      {
        id: 3,
        question: "What makes OCO-3 so important for climate monitoring?",
        options: [
          "It precisely measures carbon dioxide in the atmosphere",
          "It captures 3D images of forests",
          "It detects underwater currents",
          "It measures wind speed on the ISS",
        ],
        correct: "It precisely measures carbon dioxide in the atmosphere",
      },
      {
        id: 4,
        question:
          "Why do scientists study sediment (tiny dirt particles on the ISS?",
        options: [
          "To understand how particles stick and move in rivers and oceans",
          "To test how soil grows in space farms",
          "To find new minerals on the Moon",
          "To clean up pollution from space debris",
        ],
        correct:
          "To understand how particles stick and move in rivers and oceans",
      },
      {
        id: 5,
        question:
          "How do astronaut photos from the ISS help climate scientists?",
        options: [
          "They show real examples of environmental change, like shrinking lakes and wildfires",
          "They are used only for public outreach",
          "They replace satellite images completely",
          "They help astronauts train for photography contests",
        ],
        correct:
          "They show real examples of environmental change, like shrinking lakes and wildfires",
      },
    ],
  },
  {
    id: 4,
    title: "Level 3",
    href: "Level_3",
    desc: "Working with astronauts and cameras",
    Voice: "/voices/level_3.mp3",

    teacher: teacher.msStar,

    content: [
      {
        title: "Level 3 – Observing Earth from Space ",
        desc: `Welcome to Level Three — Observing Earth from Space. 
Every time I look at our planet from the Cupola, I feel like it’s alive — breathing, changing, and moving in endless harmony. 
But this view isn’t just for admiration. It’s also a scientific window that helps us understand how Earth works.`,
      },
      {
        title: "Studying Earth from Above ",
        desc: `From the International Space Station, astronauts observe weather systems, oceans, forests, and even cities growing over time. 
The ISS carries advanced instruments that collect real-time data about our planet’s behavior. 

For example, ECOSTRESS measures how plants respond to heat and water stress — showing where vegetation is thriving and where it’s struggling. 
This helps scientists understand droughts and predict wildfires. Farmers also use that data to conserve water and protect crops. 

Another tool, HICO — the Hyperspectral Imager for the Coastal Ocean, studied the oceans in incredible detail, capturing more than 10,000 images of coastal waters. 
Those images helped identify harmful algal blooms — the “red tides” that can poison marine life and affect coastal communities. `,
      },
      {
        title: "Seeing Change Happen",
        desc: `Through the Cupola’s wide windows, astronauts have captured powerful, emotional moments of our planet’s transformation. 
One famous example is the Betsiboka Estuary in Madagascar — its bright red waters are actually sediment from deforestation washing into the sea. 
Astronauts described it as if Madagascar was “bleeding into the ocean.” 
It’s a dramatic reminder of how deeply connected land and water truly are. 

After the 2004 tsunami in Indonesia, astronauts also photographed the coastline before and after the disaster — creating a visual record of how natural events reshape Earth. 
These images aren’t just pictures. They’re stories — combining emotion and data in every frame.`,
      },
      {
        title: "Earth’s Subtle Details ",
        desc: `One of the most breathtaking examples is the “Meeting of the Waters” in the Amazon — where the dark Rio Negro meets the tan Solimões River, flowing side by side without mixing. 
Even from 400 kilometers above, color, texture, and movement reveal nature’s delicate balance. 

From space, we track deforestation, glacier retreat, pollution, and climate shifts — all in real time. 
Every observation helps us make smarter, kinder choices for our planet’s future. `,
      },
      {
        title: "Closing:",
        desc: `So, the Cupola isn’t just a window — it’s a bridge between space and Earth science. 
It allows us not only to see Earth’s beauty but to understand its challenges… and protect it for generations to come. 

And speaking of challenges — what about the astronauts themselves? 
What happens to the human body out here, beyond gravity’s pull? 
That’s what’s next: Level Four — exploring how life in space teaches us to care for life on Earth. `,
      },
    ],
    videoLink:
      "https://drive.google.com/file/d/17fuaaN-h-19CZ56STUXDWVUJ38oKn1zg/preview",
    questions: [
      {
        id: 1,
        question: "What is ECOSTRESS used for on the ISS?",
        options: [
          "To measure how plants handle heat and water stress",
          "To monitor ocean waves",
          "To detect asteroids near Earth",
          "To measure gravity changes on the Moon",
        ],
        correct: "To measure how plants handle heat and water stress",
      },
      {
        id: 2,
        question: "What does HICO help scientists detect?",
        options: [
          "Harmful algal blooms in the ocean",
          "Forest fires in the Amazon",
          "Temperature changes in deserts",
          "Snow levels in the Arctic",
        ],
        correct: "Harmful algal blooms in the ocean",
      },
      {
        id: 3,
        question:
          "What did astronauts observe in the Betsiboka estuary in Madagascar?",
        options: [
          "Red-colored waters caused by soil washing into the sea",
          "Coral reefs growing rapidly",
          "Melting icebergs from Antarctica",
          "New volcanic islands forming",
        ],
        correct: "Red-colored waters caused by soil washing into the sea",
      },
      {
        id: 4,
        question:
          "How do photos from the ISS help scientists after disasters like tsunamis?",
        options: [
          "They show how coastlines and landforms change after major events",
          "They measure the temperature of the ocean floor",
          "They replace earthquake warning systems",
          "They study the Moon’s tides",
        ],
        correct:
          "They show how coastlines and landforms change after major events",
      },
      {
        id: 5,
        question:
          "What’s the overall mission of observing Earth from space on the ISS?",
        options: [
          "To understand and protect our planet through continuous observation",
          "To prepare for future moon missions",
          "To study alien life forms",
          "To test new astronaut suits",
        ],
        correct:
          "To understand and protect our planet through continuous observation",
      },
    ],
  },
  {
    id: 5,
    title: "Level 4",
    href: "Level_4",
    desc: "Final mission challenge!",
    Voice: "/voices/level_4.mp3",
    teacher: teacher.mrComet,
    content: [
      {
        title: "Level 4 — Cupola’s Role in Healthcare and Social Benefits ",
        desc: `Welcome to Level Four — the Cupola’s Role in Healthcare and Social Benefits. 
The International Space Station isn’t just a window to Earth — it’s also a window into the human body. 
Up here, scientists study how life itself reacts when gravity disappears. 

Inside the ISS, astronauts and experiments float together to uncover how our bodies adapt to space. 
Muscles weaken, bones lose minerals, and the immune system changes — all because gravity is gone. 
By studying these effects, researchers back on Earth can understand conditions like osteoporosis, aging, and heart disease much better.`,
      },
      {
        title: "Cancer and Disease Research",
        desc: `The ISS National Lab plays a major role in medical discovery. 
For example, scientists from Angiex study how cancer cells grow without gravity — helping them design treatments that might stop tumors from spreading. 

In microgravity, proteins form crystals that are purer and easier to analyze. 
By studying those crystals, researchers can build medicines that work more effectively and with fewer side effects. 
The same environment that challenges astronauts also gives doctors and scientists a clearer view of how life works at its deepest levels. `,
      },
      {
        title: "Modeling Human Diseases ",
        desc: `Another powerful part of space research is disease modeling. 
In just a few months, astronauts experience biological changes that would take years to appear on Earth. 
That means scientists can test treatments faster and see how the body reacts more clearly. 

Space acts like a “time accelerator” for biology — helping us study aging, muscle loss, and recovery safely and efficiently. 
It’s one of the few places where science can literally speed up time. `,
      },
      {
        title: "Molecular and Genetic Discoveries ",
        desc: `Even at the microscopic level, space changes everything. 
Microgravity affects how genes switch on and off — not only in humans but also in plants and bacteria. 
These genetic studies can help us grow better crops, develop new medicines, and understand how life adapts beyond Earth. 
It’s like reading the instruction manual of life, written in zero gravity. `,
      },
      {
        title: "Social and Global Impact ",
        desc: `All this research goes far beyond space exploration. 
Findings from the ISS have led to advances in medicine, stronger materials, improved agriculture, and even better food production. 

And there’s a human side too: education and cooperation. 
The ISS brings together scientists, engineers, and students from all around the world — proving that teamwork can go beyond borders, and even beyond gravity. `,
      },
      {
        title: "Final Closing ",
        desc: `Miss Star: 
So, we’ve reached the final stop of our journey through the Cupola — from disaster monitoring to climate research, and finally, to healthcare and human progress. 

Mr. Comet: 
Every image, every experiment, and every discovery connects space to life back home. 

Miss Star: 
You’ve completed your mission as a Cupola Explorer! 
Remember — curiosity and science are what keep humanity moving forward. 

Mr. Comet: 
And who knows? Maybe one day, your research will float up here too. 

Both (smiling): 
See you among the stars.  `,
      },
    ],
    videoLink:
      "https://drive.google.com/file/d/1YhimEC_TWhyCZQbtfeXFzj_0ckjQi-RD/preview",
    questions: [
      {
        id: 1,
        question:
          "What is the main role of the Cupola in natural disaster monitoring? ",
        options: [
          "Acting as a lookout to observe natural disasters on Earth",
          "Measuring temperatures on other planets",
          "Testing new space cameras ",
          "Tracking stars in the galaxy",
        ],
        correct: "Acting as a lookout to observe natural disasters on Earth",
      },
      {
        id: 2,
        question: "How do astronauts use the Cupola during natural disasters?",
        options: [
          "Taking pictures of disasters to send to scientists",
          "Building weather satellites",
          " Studying moon craters",
          "Monitoring space station orbits",
        ],
        correct: "Taking pictures of disasters to send to scientists",
      },
      {
        id: 3,
        question:
          "What equipment helps astronauts in the Cupola capture disaster images?",
        options: [
          "Using a special camera and tracker to capture steady images",
          "Using a telescope to view distant storms",
          "Operating a robotic arm for photos",
          "Measuring wind speeds with sensors",
        ],
        correct: "Using a special camera and tracker to capture steady images",
      },
      {
        id: 4,
        question:
          "What do astronauts photograph from the Cupola during disasters?",
        options: [
          "Features of disasters like storm clouds and hurricane eyes",
          "Stars and constellations",
          "Ocean currents ",
          " Space station components",
        ],
        correct: "Features of disasters like storm clouds and hurricane eyes",
      },
      {
        id: 5,
        question: "What happens to Cupola photos after they are taken?",
        options: [
          "They are sent to Earth for experts to analyze and add location data",
          "They are stored on the ISS for astronauts ",
          "They are used to navigate the ISS",
          "They are shared with other planets",
        ],
        correct:
          "They are sent to Earth for experts to analyze and add location data",
      },
    ],
  },
];
