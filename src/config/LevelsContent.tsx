"use client";
import { useGT } from "gt-next";

export function useTranslatedLevels() {
  const t = useGT();

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

  return [
    {
      id: 2,
      title: t("Level 1"),
      href: "Level_1",
      desc: t("Learn about the Cupola and its role"),
      Voice: "/voices/level_1.mp3",
      teacher: teacher.msStar,
      content: [
        {
          title: t(
            " Level 1 – Cupola’s Role in Natural Disasters: Example – Hurricane Harvey (2017) "
          ),
          desc: t(
            ` Welcome to Level One: Cupola’s Role in Natural Disasters. The Cupola isn’t just a window in space — it’s a powerful observation point that helps scientists study what’s happening on Earth. Today, we’ll see how it helped during Hurricane Harvey in 2017. `
          ),
        },
        {
          title: t("Step 1 — Spotting the Storm"),
          desc: t(
            `When Hurricane Harvey started forming over the ocean, scientists on Earth tracked it using satellites. But to get clearer, real-time images, they asked the astronauts on the International Space Station to observe it through the Cupola.  `
          ),
        },
        {
          title: t("Step 2 — Getting Ready Inside "),
          desc: t(`Astronaut Jack Fischer prepared the Cupola for observation. 
He opened the protective shutters and mounted a camera on a special tracker that keeps it stable as the ISS moves around Earth. 
`),
        },
        {
          title: t("Step 3 — Taking the Photos "),
          desc: t(`Through the Cupola’s wide windows, he used a high-zoom lens to capture the hurricane’s eye and cloud structure in great detail. 
Each image gave scientists new insights into how the storm was evolving. 
`),
        },
        {
          title: t("Step 4 — Sending the Photos to Earth"),
          desc: t(`After taking the pictures, the data was transmitted to NASA’s mission control. 
Experts analyzed the images and added coordinates, making them ready for emergency teams and researchers on the ground. 
`),
        },
        {
          title: t("Step 5 — Helping on the Ground "),
          desc: t(`By combining these Cupola images with satellite data, scientists built detailed flood maps. 
These maps helped rescuers know which areas were underwater and which routes were still safe to use. 
`),
        },
        {
          title: t("Closing: "),
          desc: t(
            "So, the Cupola played an important role in understanding and responding to Hurricane Harvey. "
          ),
        },
      ],
      videoLink:
        "https://drive.google.com/file/d/10JpVvz-88HPp0KP98tJ2mAQ_Q8ggnnc-/preview",
      questions: [
        {
          id: 1,
          question: t(
            "What is the main role of the Cupola in natural disaster monitoring?"
          ),
          options: [
            t("Acting as a lookout to observe natural disasters on Earth"),
            t("Measuring temperatures on other planets"),
            t("Testing new space cameras"),
            t("Tracking stars in the galaxy"),
          ],
          correct: t(
            "Acting as a lookout to observe natural disasters on Earth"
          ),
        },
        {
          id: 2,
          question: t(
            "How do astronauts use the Cupola during natural disasters?"
          ),
          options: [
            t("Taking pictures of disasters to send to scientists"),
            t("Building weather satellites"),
            t("Studying moon craters"),
            t("Monitoring space station orbits"),
          ],
          correct: t("Taking pictures of disasters to send to scientists"),
        },
        {
          id: 3,
          question: t(
            "What equipment helps astronauts in the Cupola capture disaster images?"
          ),
          options: [
            t("Using a special camera and tracker to capture steady images"),
            t("Using a telescope to view distant storms"),
            t("Operating a robotic arm for photos"),
            t("Measuring wind speeds with sensors"),
          ],
          correct: t(
            "Using a special camera and tracker to capture steady images"
          ),
        },
        {
          id: 4,
          question: t(
            "What do astronauts photograph from the Cupola during disasters?"
          ),
          options: [
            t("Features of disasters like storm clouds and hurricane eyes"),
            t("Stars and constellations"),
            t("Ocean currents"),
            t("Space station components"),
          ],
          correct: t(
            "Features of disasters like storm clouds and hurricane eyes"
          ),
        },
        {
          id: 5,
          question: t("What happens to Cupola photos after they are taken?"),
          options: [
            t(
              "They are sent to Earth for experts to analyze and add location data"
            ),
            t("They are stored on the ISS for astronauts"),
            t("They are used to navigate the ISS"),
            t("They are shared with other planets"),
          ],
          correct: t(
            "They are sent to Earth for experts to analyze and add location data"
          ),
        },
      ],
    },
    {
      id: 3,
      title: t("Level 2"),
      href: "Level_2",
      desc: t("Natural disaster observation"),
      Voice: "/voices/level_2.mp3",
      teacher: teacher.mrComet,
      content: [
        {
          title: t(
            "Welcome to Level Two — the Cupola’s Role in Climate Change Monitoring. "
          ),
          desc: t(`
      From the International Space Station, astronauts and instruments work together to study how Earth’s climate is changing over time. 

The Cupola gives astronauts a perfect observation point to take detailed photos of Earth’s atmosphere, oceans, and land. 
These photos are used to compare changes in weather patterns, vegetation, and ice coverage across years. `),
        },
        {
          title: t("How the ISS Studies Climate "),
          desc: t(`Outside the ISS, there are several instruments that constantly monitor Earth. 
For example, ECOSTRESS measures how plants respond to heat and drought. 
GEDI uses laser technology to create 3D maps of forests and track how much carbon they store. 

And OCO-3 studies carbon dioxide levels in the atmosphere — one of the hardest gases to measure accurately. 
Other instruments like DESIS, TSIS-1, and HISUI observe sunlight, colors, and surface changes to show how ecosystems evolve.`),
        },
        {
          title: t("Why Carbon Dioxide Is Difficult to Track "),
          desc: t(`Some gases, like ozone or water vapor, change a lot when pollution occurs, so they’re easy to notice. 
But carbon dioxide changes very little — sometimes less than one part per million. 
That’s why instruments like OCO-3 need to be extremely precise. 

Even these tiny measurements help scientists understand how human activity affects Earth’s balance and temperature.`),
        },
        {
          title: t(" Sediment Science — What Microgravity Teaches Us "),
          desc: t(`Scientists have also used the ISS to study how sediments — small bits of soil or minerals — behave in microgravity. 
Without gravity, they could observe how particles naturally stick together — something hard to see on Earth. 

This research helps build better models of how rivers move, how carbon travels through oceans, and how erosion affects coastal areas. 

Shape `),
        },
        {
          title: t(" Real Climate Photos from Space "),
          desc: t(`Astronauts also take photos that help document climate patterns over time. 
For instance, Perth in Australia shows a Mediterranean climate — dry summers and green winters. 
And Pyramid Lake in Nevada used to be part of a massive Ice Age lake. 

Now it’s much smaller because of a warmer, drier climate — proof of how Earth’s surface keeps changing. `),
        },
        {
          title: t("Closing:"),
          desc: t(`So, the Cupola isn’t just for observation — it’s a vital part of studying our planet’s long-term health. 
Every photo, every measurement from space helps us protect Earth’s future. 
That’s the true power of the Cupola. `),
        },
      ],
      videoLink:
        "https://drive.google.com/file/d/1uw5mEE8hX8ICh8oFUfmAag9Bkm9Q59UY/preview",
      questions: [
        {
          id: 1,
          question: t(
            "What is the main role of the Cupola and the ISS in climate change research?"
          ),
          options: [
            t(
              "To collect long-term data about Earth's climate and environment"
            ),
            t("To track asteroids near Earth"),
            t("To test rockets and satellites"),
            t("To study the Moon’s atmosphere"),
          ],
          correct: t(
            "To collect long-term data about Earth's climate and environment"
          ),
        },
        {
          id: 2,
          question: t(
            "Which instrument studies how plants handle heat and water?"
          ),
          options: [t("ECOSTRESS"), t("OCO-3"), t("GEDI"), t("TSIS-1")],
          correct: t("ECOSTRESS"),
        },
        {
          id: 3,
          question: t("What makes OCO-3 so important for climate monitoring?"),
          options: [
            t("It precisely measures carbon dioxide in the atmosphere"),
            t("It captures 3D images of forests"),
            t("It detects underwater currents"),
            t("It measures wind speed on the ISS"),
          ],
          correct: t("It precisely measures carbon dioxide in the atmosphere"),
        },
        {
          id: 4,
          question: t(
            "Why do scientists study sediment (tiny dirt particles on the ISS?"
          ),
          options: [
            t(
              "To understand how particles stick and move in rivers and oceans"
            ),
            t("To test how soil grows in space farms"),
            t("To find new minerals on the Moon"),
            t("To clean up pollution from space debris"),
          ],
          correct: t(
            "To understand how particles stick and move in rivers and oceans"
          ),
        },
        {
          id: 5,
          question: t(
            "How do astronaut photos from the ISS help climate scientists?"
          ),
          options: [
            t(
              "They show real examples of environmental change, like shrinking lakes and wildfires"
            ),
            t("They are used only for public outreach"),
            t("They replace satellite images completely"),
            t("They help astronauts train for photography contests"),
          ],
          correct: t(
            "They show real examples of environmental change, like shrinking lakes and wildfires"
          ),
        },
      ],
    },
    {
      id: 4,
      title: t("Level 3"),
      href: "Level_3",
      desc: t("Working with astronauts and cameras"),
      Voice: "/voices/level_3.mp3",

      teacher: teacher.msStar,

      content: [
        {
          title: t("Level 3 – Observing Earth from Space "),
          desc: t(`Welcome to Level Three — Observing Earth from Space. 
Every time I look at our planet from the Cupola, I feel like it’s alive — breathing, changing, and moving in endless harmony. 
But this view isn’t just for admiration. It’s also a scientific window that helps us understand how Earth works.`),
        },
        {
          title: t("Studying Earth from Above "),
          desc: t(`From the International Space Station, astronauts observe weather systems, oceans, forests, and even cities growing over time. 
The ISS carries advanced instruments that collect real-time data about our planet’s behavior. 

For example, ECOSTRESS measures how plants respond to heat and water stress — showing where vegetation is thriving and where it’s struggling. 
This helps scientists understand droughts and predict wildfires. Farmers also use that data to conserve water and protect crops. 

Another tool, HICO — the Hyperspectral Imager for the Coastal Ocean, studied the oceans in incredible detail, capturing more than 10,000 images of coastal waters. 
Those images helped identify harmful algal blooms — the “red tides” that can poison marine life and affect coastal communities. `),
        },
        {
          title: t("Seeing Change Happen"),
          desc: t(`Through the Cupola’s wide windows, astronauts have captured powerful, emotional moments of our planet’s transformation. 
One famous example is the Betsiboka Estuary in Madagascar — its bright red waters are actually sediment from deforestation washing into the sea. 
Astronauts described it as if Madagascar was “bleeding into the ocean.” 
It’s a dramatic reminder of how deeply connected land and water truly are. 

After the 2004 tsunami in Indonesia, astronauts also photographed the coastline before and after the disaster — creating a visual record of how natural events reshape Earth. 
These images aren’t just pictures. They’re stories — combining emotion and data in every frame.`),
        },
        {
          title: t("Earth’s Subtle Details "),
          desc: t(`One of the most breathtaking examples is the “Meeting of the Waters” in the Amazon — where the dark Rio Negro meets the tan Solimões River, flowing side by side without mixing. 
Even from 400 kilometers above, color, texture, and movement reveal nature’s delicate balance. 

From space, we track deforestation, glacier retreat, pollution, and climate shifts — all in real time. 
Every observation helps us make smarter, kinder choices for our planet’s future. `),
        },
        {
          title: t("Closing:"),
          desc: t(`So, the Cupola isn’t just a window — it’s a bridge between space and Earth science. 
It allows us not only to see Earth’s beauty but to understand its challenges… and protect it for generations to come. 

And speaking of challenges — what about the astronauts themselves? 
What happens to the human body out here, beyond gravity’s pull? 
That’s what’s next: Level Four — exploring how life in space teaches us to care for life on Earth. `),
        },
      ],
      videoLink:
        "https://drive.google.com/file/d/17fuaaN-h-19CZ56STUXDWVUJ38oKn1zg/preview",
      questions: [
        {
          id: 1,
          question: t("What is ECOSTRESS used for on the ISS?"),
          options: [
            t("To measure how plants handle heat and water stress"),
            t("To monitor ocean waves"),
            t("To detect asteroids near Earth"),
            t("To measure gravity changes on the Moon"),
          ],
          correct: t("To measure how plants handle heat and water stress"),
        },
        {
          id: 2,
          question: t("What does HICO help scientists detect?"),
          options: [
            t("Harmful algal blooms in the ocean"),
            t("Forest fires in the Amazon"),
            t("Temperature changes in deserts"),
            t("Snow levels in the Arctic"),
          ],
          correct: t("Harmful algal blooms in the ocean"),
        },
        {
          id: 3,
          question: t(
            "What did astronauts observe in the Betsiboka estuary in Madagascar?"
          ),
          options: [
            t("Red-colored waters caused by soil washing into the sea"),
            t("Coral reefs growing rapidly"),
            t("Melting icebergs from Antarctica"),
            t("New volcanic islands forming"),
          ],
          correct: t("Red-colored waters caused by soil washing into the sea"),
        },
        {
          id: 4,
          question: t(
            "How do photos from the ISS help scientists after disasters like tsunamis?"
          ),
          options: [
            t(
              "They show how coastlines and landforms change after major events"
            ),
            t("They measure the temperature of the ocean floor"),
            t("They replace earthquake warning systems"),
            t("They study the Moon’s tides"),
          ],
          correct: t(
            "They show how coastlines and landforms change after major events"
          ),
        },
        {
          id: 5,
          question: t(
            "What’s the overall mission of observing Earth from space on the ISS?"
          ),
          options: [
            t(
              "To understand and protect our planet through continuous observation"
            ),
            t("To prepare for future moon missions"),
            t("To study alien life forms"),
            t("To test new astronaut suits"),
          ],
          correct: t(
            "To understand and protect our planet through continuous observation"
          ),
        },
      ],
    },
    {
      id: 5,
      title: t("Level 4"),
      href: "Level_4",
      desc: t("Final mission challenge!"),
      Voice: "/voices/level_4.mp3",
      teacher: teacher.mrComet,
      content: [
        {
          title: t(
            "Level 4 — Cupola’s Role in Healthcare and Social Benefits "
          ),
          desc: t(`Welcome to Level Four — the Cupola’s Role in Healthcare and Social Benefits. 
The International Space Station isn’t just a window to Earth — it’s also a window into the human body. 
Up here, scientists study how life itself reacts when gravity disappears. 

Inside the ISS, astronauts and experiments float together to uncover how our bodies adapt to space. 
Muscles weaken, bones lose minerals, and the immune system changes — all because gravity is gone. 
By studying these effects, researchers back on Earth can understand conditions like osteoporosis, aging, and heart disease much better.`),
        },
        {
          title: t("Cancer and Disease Research"),
          desc: t(`The ISS National Lab plays a major role in medical discovery. 
For example, scientists from Angiex study how cancer cells grow without gravity — helping them design treatments that might stop tumors from spreading. 

In microgravity, proteins form crystals that are purer and easier to analyze. 
By studying those crystals, researchers can build medicines that work more effectively and with fewer side effects. 
The same environment that challenges astronauts also gives doctors and scientists a clearer view of how life works at its deepest levels. `),
        },
        {
          title: t("Modeling Human Diseases "),
          desc: t(`Another powerful part of space research is disease modeling. 
In just a few months, astronauts experience biological changes that would take years to appear on Earth. 
That means scientists can test treatments faster and see how the body reacts more clearly. 

Space acts like a “time accelerator” for biology — helping us study aging, muscle loss, and recovery safely and efficiently. 
It’s one of the few places where science can literally speed up time. `),
        },
        {
          title: t("Molecular and Genetic Discoveries "),
          desc: t(`Even at the microscopic level, space changes everything. 
Microgravity affects how genes switch on and off — not only in humans but also in plants and bacteria. 
These genetic studies can help us grow better crops, develop new medicines, and understand how life adapts beyond Earth. 
It’s like reading the instruction manual of life, written in zero gravity. `),
        },
        {
          title: t("Social and Global Impact "),
          desc: t(`All this research goes far beyond space exploration. 
Findings from the ISS have led to advances in medicine, stronger materials, improved agriculture, and even better food production. 

And there’s a human side too: education and cooperation. 
The ISS brings together scientists, engineers, and students from all around the world — proving that teamwork can go beyond borders, and even beyond gravity. `),
        },
        {
          title: t("Final Closing "),
          desc: t(`Miss Star: 
So, we’ve reached the final stop of our journey through the Cupola — from disaster monitoring to climate research, and finally, to healthcare and human progress. 

Mr. Comet: 
Every image, every experiment, and every discovery connects space to life back home. 

Miss Star: 
You’ve completed your mission as a Cupola Explorer! 
Remember — curiosity and science are what keep humanity moving forward. 

Mr. Comet: 
And who knows? Maybe one day, your research will float up here too. 

Both (smiling): 
See you among the stars.  `),
        },
      ],
      videoLink:
        "https://drive.google.com/file/d/1YhimEC_TWhyCZQbtfeXFzj_0ckjQi-RD/preview",
      questions: [
        {
          id: 1,
          question: t(
            "What is the main role of the Cupola in natural disaster monitoring? "
          ),
          options: [
            t("Acting as a lookout to observe natural disasters on Earth"),
            t("Measuring temperatures on other planets"),
            t("Testing new space cameras "),
            t("Tracking stars in the galaxy"),
          ],
          correct: t(
            "Acting as a lookout to observe natural disasters on Earth"
          ),
        },
        {
          id: 2,
          question: t(
            "How do astronauts use the Cupola during natural disasters?"
          ),
          options: [
            t("Taking pictures of disasters to send to scientists"),
            t("Building weather satellites"),
            t(" Studying moon craters"),
            t("Monitoring space station orbits"),
          ],
          correct: t("Taking pictures of disasters to send to scientists"),
        },
        {
          id: 3,
          question: t(
            "What equipment helps astronauts in the Cupola capture disaster images?"
          ),
          options: [
            t("Using a special camera and tracker to capture steady images"),
            t("Using a telescope to view distant storms"),
            t("Operating a robotic arm for photos"),
            t("Measuring wind speeds with sensors"),
          ],
          correct: t(
            "Using a special camera and tracker to capture steady images"
          ),
        },
        {
          id: 4,
          question: t(
            "What do astronauts photograph from the Cupola during disasters?"
          ),
          options: [
            t("Features of disasters like storm clouds and hurricane eyes"),
            t("Stars and constellations"),
            t("Ocean currents "),
            t(" Space station components"),
          ],
          correct: t(
            "Features of disasters like storm clouds and hurricane eyes"
          ),
        },
        {
          id: 5,
          question: t("What happens to Cupola photos after they are taken?"),
          options: [
            t(
              "They are sent to Earth for experts to analyze and add location data"
            ),
            t("They are stored on the ISS for astronauts "),
            t("They are used to navigate the ISS"),
            t("They are shared with other planets"),
          ],
          correct: t(
            "They are sent to Earth for experts to analyze and add location data"
          ),
        },
      ],
    },
  ];
}
