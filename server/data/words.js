/**
 * Word Bank Data for Hangman Game
 * Categories: Animals, Technology, Programming, Food, Sports, Countries, General Knowledge
 * Difficulty levels: Easy (4-6 letters), Medium (6-9 letters), Hard (8+ letters or rare terms)
 */

const wordBank = {
  animals: {
    easy: [
      { word: 'LION', hint: 'The king of the jungle' },
      { word: 'TIGER', hint: 'Striped apex predator cat' },
      { word: 'BEAR', hint: 'Large mammal that loves honey and fish' },
      { word: 'ZEBRA', hint: 'Black and white striped African mammal' },
      { word: 'PANDA', hint: 'Bamboo-eating bear from China' },
      { word: 'EAGLE', hint: 'Majestic bird of prey with keen eyesight' },
      { word: 'SHARK', hint: 'Ocean predator with cartilaginous skeleton' },
      { word: 'WHALE', hint: 'Largest mammal living in the ocean' },
      { word: 'HORSE', hint: 'Domesticated four-legged equine animal' },
      { word: 'KOALA', hint: 'Marsupial that eats eucalyptus leaves' }
    ],
    medium: [
      { word: 'DOLPHIN', hint: 'Highly intelligent marine mammal' },
      { word: 'KANGAROO', hint: 'Australian marsupial known for hopping' },
      { word: 'CHEETAH', hint: 'Fastest land animal on Earth' },
      { word: 'GIRAFFE', hint: 'Tallest living terrestrial animal' },
      { word: 'PENGUIN', hint: 'Flightless aquatic bird in cold regions' },
      { word: 'OCTOPUS', hint: 'Eight-armed ocean cephalopod' },
      { word: 'FLAMINGO', hint: 'Pink wading bird that stands on one leg' },
      { word: 'CROCODILE', hint: 'Large predatory aquatic reptile' },
      { word: 'SQUIRREL', hint: 'Small bushy-tailed rodent that hoards nuts' },
      { word: 'GORILLA', hint: 'Largest living primate species' }
    ],
    hard: [
      { word: 'CHAMELEON', hint: 'Lizard known for changing skin color' },
      { word: 'PLATYPUS', hint: 'Egg-laying venomous mammal with a duck bill' },
      { word: 'HEDGEHOG', hint: 'Small spiny mammal that curls into a ball' },
      { word: 'ARMADILLO', hint: 'Mammal with a tough leathery armor shell' },
      { word: 'RHINOCEROS', hint: 'Large horned herbivore with thick skin' },
      { word: 'HIPPOPOTAMUS', hint: 'Massive semi-aquatic African mammal' },
      { word: 'SALAMANDER', hint: 'Lizard-like amphibian with moist skin' },
      { word: 'WOODPECKER', hint: 'Bird known for tapping tree trunks' },
      { word: 'CHINCHILLA', hint: 'South American rodent with ultra-soft fur' },
      { word: 'ORANGUTAN', hint: 'Reddish-haired great ape native to Indonesia' }
    ]
  },
  technology: {
    easy: [
      { word: 'ROBOT', hint: 'Automated programmable mechanical machine' },
      { word: 'PHONE', hint: 'Handheld telecommunication device' },
      { word: 'CLOUD', hint: 'Remote internet servers for storage & compute' },
      { word: 'MOUSE', hint: 'Handheld hardware pointing device' },
      { word: 'DRONE', hint: 'Unmanned aerial vehicle' },
      { word: 'LASER', hint: 'Concentrated coherent beam of light' },
      { word: 'CYBER', hint: 'Prefix relating to computers and internet' },
      { word: 'SERVER', hint: 'Computer providing data and services to clients' },
      { word: 'RADAR', hint: 'Detection system using radio waves' },
      { word: 'MODEM', hint: 'Modulator-demodulator network device' }
    ],
    medium: [
      { word: 'COMPUTER', hint: 'Electronic machine for computing data' },
      { word: 'INTERNET', hint: 'Global system of interconnected networks' },
      { word: 'SOFTWARE', hint: 'Programs and operating information used by computers' },
      { word: 'HARDWARE', hint: 'Physical components of a computer system' },
      { word: 'DATABASE', hint: 'Structured set of organized electronic data' },
      { word: 'WIRELESS', hint: 'Telecommunications without cables' },
      { word: 'BLUETOOTH', hint: 'Short-range wireless communication standard' },
      { word: 'SATELLITE', hint: 'Artificial body placed in orbit round Earth' },
      { word: 'PROCESSOR', hint: 'The central computational brain of a PC' },
      { word: 'SECURITY', hint: 'Defense mechanisms protecting digital systems' }
    ],
    hard: [
      { word: 'CYBERSECURITY', hint: 'Protection of computer systems from cyberattacks' },
      { word: 'ARTIFICIAL', hint: 'Synthetic or machine-generated intelligence' },
      { word: 'BLOCKCHAIN', hint: 'Decentralized distributed digital ledger' },
      { word: 'MICROCHIP', hint: 'Tiny wafer of semiconductor material' },
      { word: 'QUANTUM', hint: 'Next-gen computing utilizing physics superposition' },
      { word: 'VIRTUALIZATION', hint: 'Creating software-based representation of hardware' },
      { word: 'NANOTECHNOLOGY', hint: 'Manipulation of matter on atomic or molecular scale' },
      { word: 'CRYPTOGRAPHY', hint: 'Art and science of writing and solving codes' },
      { word: 'NEURALNETWORK', hint: 'Computer system modeled on human brain neurons' },
      { word: 'BIOMETRICS', hint: 'Measurement of biological characteristics like fingerprints' }
    ]
  },
  programming: {
    easy: [
      { word: 'CODE', hint: 'Instructions written in a programming language' },
      { word: 'JAVA', hint: 'Popular OOP language slogan: Write once, run anywhere' },
      { word: 'LOOP', hint: 'Control structure that repeats statements' },
      { word: 'HTML', hint: 'Standard markup language for web browser pages' },
      { word: 'REACT', hint: 'Popular JavaScript UI library built by Facebook/Meta' },
      { word: 'NODE', hint: 'V8-powered JavaScript runtime environment' },
      { word: 'ARRAY', hint: 'Data structure storing sequential elements' },
      { word: 'BUG', hint: 'An error or flaw in a computer program' },
      { word: 'CONST', hint: 'JavaScript keyword for block-scoped read-only variable' },
      { word: 'GIT', hint: 'Distributed version control system created by Linus' }
    ],
    medium: [
      { word: 'JAVASCRIPT', hint: 'The scripting language that powers the web' },
      { word: 'FUNCTION', hint: 'A reusable block of code designed to perform a task' },
      { word: 'VARIABLE', hint: 'Named storage container for holding data values' },
      { word: 'COMPILER', hint: 'Translates high-level source code to machine code' },
      { word: 'BACKEND', hint: 'Server-side layer handling business logic and DB' },
      { word: 'FRONTEND', hint: 'Client-side UI layer users interact with' },
      { word: 'MONGOOSE', hint: 'Object Data Modeling library for MongoDB and Node' },
      { word: 'EXPRESS', hint: 'Minimalist web framework for Node.js' },
      { word: 'PROMISE', hint: 'JavaScript object representing future asynchronous result' },
      { word: 'CALLBACK', hint: 'Function passed as an argument to another function' }
    ],
    hard: [
      { word: 'POLYMORPHISM', hint: 'Core OOP concept where entities take multiple forms' },
      { word: 'ASYNCHRONOUS', hint: 'Operations executing without blocking the main thread' },
      { word: 'INHERITANCE', hint: 'Mechanism where an object inherits parent properties' },
      { word: 'ENCAPSULATION', hint: 'Bundling data and methods into a single class unit' },
      { word: 'RECURSION', hint: 'Function that calls itself until reaching base case' },
      { word: 'MIDDLEWARE', hint: 'Functions with access to req/res in Express pipeline' },
      { word: 'CONCURRENCY', hint: 'Execution of multiple instruction sequences simultaneously' },
      { word: 'ABSTRACTION', hint: 'Hiding internal complex details and showing only essentials' },
      { word: 'TYPESCRIPT', hint: 'Typed superset of JavaScript that compiles to plain JS' },
      { word: 'CONTAINERIZATION', hint: 'Packaging software code with all its dependencies' }
    ]
  },
  food: {
    easy: [
      { word: 'PIZZA', hint: 'Italian oven-baked flatbread with cheese & sauce' },
      { word: 'APPLE', hint: 'Crisp round red or green tree fruit' },
      { word: 'BREAD', hint: 'Baked staple food made of flour and water' },
      { word: 'CHEESE', hint: 'Dairy food produced in wide range of textures' },
      { word: 'TACO', hint: 'Mexican dish consisting of folded tortilla' },
      { word: 'SUSHI', hint: 'Japanese dish with seasoned rice and raw fish' },
      { word: 'SALAD', hint: 'Dish of mixed raw vegetables and dressing' },
      { word: 'MANGO', hint: 'Sweet tropical stone fruit with golden flesh' },
      { word: 'PASTA', hint: 'Italian dish made from wheat dough extruded into shapes' },
      { word: 'HONEY', hint: 'Sweet viscous liquid substance made by bees' }
    ],
    medium: [
      { word: 'BURGER', hint: 'Round patty of meat or veggies inside a bun' },
      { word: 'PANCAKE', hint: 'Thin flat round cake batter fried on griddle' },
      { word: 'SPAGHETTI', hint: 'Long, thin, cylindrical pasta noodles' },
      { word: 'SANDWICH', hint: 'Two slices of bread with filling in between' },
      { word: 'BURRITO', hint: 'Flour tortilla rolled around savory fillings' },
      { word: 'AVOCADO', hint: 'Green pear-shaped fruit high in healthy fats' },
      { word: 'CHOCOLATE', hint: 'Sweet confection prepared from roasted cacao beans' },
      { word: 'BARBECUE', hint: 'Cooking method using slow smoke and open fire' },
      { word: 'NOODLES', hint: 'Staple Asian food ribbon dough boiled in water' },
      { word: 'POPCORN', hint: 'Corn kernels that burst open into puffy puffs' }
    ],
    hard: [
      { word: 'CROISSANT', hint: 'Buttery flaky French crescent-shaped pastry' },
      { word: 'GUACAMOLE', hint: 'Mexican mashed avocado dip with lime and tomato' },
      { word: 'QUESADILLA', hint: 'Mexican toasted tortilla filled with melted cheese' },
      { word: 'RATATOUILLE', hint: 'Traditional French stewed vegetable casserole' },
      { word: 'BRUSCHETTA', hint: 'Italian antipasto grilled bread rubbed with garlic' },
      { word: 'TIRAMISU', hint: 'Coffee-flavoured Italian dessert with mascarpone' },
      { word: 'POMEGRANATE', hint: 'Fruit with jewel-like red seeds called arils' },
      { word: 'PROSCIUTTO', hint: 'Italian dry-cured ham served thinly sliced' },
      { word: 'CHEESECAKE', hint: 'Sweet dessert with thick fresh cheese layer' },
      { word: 'CHIMICHURRI', hint: 'Argentinian uncooked herb sauce for grilled meat' }
    ]
  },
  sports: {
    easy: [
      { word: 'SOCCER', hint: 'Global game played by kicking ball into net' },
      { word: 'TENNIS', hint: 'Racket sport played over a net on court' },
      { word: 'BOXING', hint: 'Combat sport where fighters wear padded gloves' },
      { word: 'RUGBY', hint: 'Oval-ball team contact sport with scrums' },
      { word: 'GOLF', hint: 'Club sport aiming balls into series of holes' },
      { word: 'JUDO', hint: 'Modern Japanese martial art and Olympic sport' },
      { word: 'SURF', hint: 'Riding breaking ocean waves on a board' },
      { word: 'POLO', hint: 'Team sport played on horseback with mallets' },
      { word: 'YOGA', hint: 'Ancient discipline of postures and breathing' },
      { word: 'DART', hint: 'Target game throwing small pointed missiles' }
    ],
    medium: [
      { word: 'BASEBALL', hint: 'Bat-and-ball game played between two 9-player teams' },
      { word: 'CRICKET', hint: 'Bat and ball game played on pitch with wickets' },
      { word: 'SWIMMING', hint: 'Self-propulsion through water as racing sport' },
      { word: 'VOLLEYBALL', hint: 'Two teams hit ball over high net with hands' },
      { word: 'BADMINTON', hint: 'Racquet sport played with feathered shuttlecock' },
      { word: 'ARCHERY', hint: 'Shooting arrows with bow at a circular target' },
      { word: 'HANDBALL', hint: 'Two teams pass ball with hands into goal' },
      { word: 'MARATHON', hint: 'Long-distance foot race of 26.2 miles' },
      { word: 'BOWLING', hint: 'Rolling heavy ball down lane to knock pins' },
      { word: 'SKATING', hint: 'Gliding on surfaces with bladed or wheeled shoes' }
    ],
    hard: [
      { word: 'BASKETBALL', hint: 'Dribbling and shooting ball through elevated hoop' },
      { word: 'GYMNASTICS', hint: 'Exercises displaying balance, strength, and agility' },
      { word: 'SNOWBOARDING', hint: 'Descending snow-covered slope on a single board' },
      { word: 'TAEKWONDO', hint: 'Korean martial art emphasizing high jumping kicks' },
      { word: 'TRIATHLON', hint: 'Multi-sport race with swimming, cycling, and running' },
      { word: 'WEIGHTLIFTING', hint: 'Strength sport involving barbell lifts like snatch' },
      { word: 'WRESTLING', hint: 'Grappling combat sport aiming to pin opponent' },
      { word: 'PENTATHLON', hint: 'Athletic contest comprising five distinct events' },
      { word: 'KITEBOARDING', hint: 'Extreme sport riding board propelled by power kite' },
      { word: 'MOUNTAINEERING', hint: 'Sport and activity of climbing mountains' }
    ]
  },
  countries: {
    easy: [
      { word: 'SPAIN', hint: 'European nation on the Iberian Peninsula' },
      { word: 'JAPAN', hint: 'Island nation in East Asia known for sushi & anime' },
      { word: 'INDIA', hint: 'South Asian nation known for Taj Mahal and culture' },
      { word: 'ITALY', hint: 'Boot-shaped European country famous for cuisine' },
      { word: 'CHINA', hint: 'Most populous country in East Asia with Great Wall' },
      { word: 'EGYPT', hint: 'Country linking northeast Africa with Middle East' },
      { word: 'CANADA', hint: 'North American country known for maple syrup' },
      { word: 'BRAZIL', hint: 'Largest South American country famous for Samba' },
      { word: 'FRANCE', hint: 'Home of Paris and the famous Eiffel Tower' },
      { word: 'MEXICO', hint: 'Country south of USA known for ancient Aztec ruins' }
    ],
    medium: [
      { word: 'GERMANY', hint: 'Central European country famous for Autobahn & engineering' },
      { word: 'AUSTRALIA', hint: 'Island continent country in Southern Hemisphere' },
      { word: 'ARGENTINA', hint: 'South American nation famous for Tango and Messi' },
      { word: 'PORTUGAL', hint: 'European country bordering Spain on Atlantic coast' },
      { word: 'SINGAPORE', hint: 'Modern island city-state in Southeast Asia' },
      { word: 'THAILAND', hint: 'Southeast Asian nation known for tropical beaches' },
      { word: 'COLOMBIA', hint: 'South American nation known for coffee and emeralds' },
      { word: 'INDONESIA', hint: 'Archipelago nation consisting of thousands of islands' },
      { word: 'MOROCCO', hint: 'North African country bordering Atlantic & Mediterranean' },
      { word: 'SWEDEN', hint: 'Scandinavian country known for northern lights & IKEA' }
    ],
    hard: [
      { word: 'SWITZERLAND', hint: 'Alpine country famous for chocolates, watches & Alps' },
      { word: 'MADAGASCAR', hint: 'Huge island nation off coast of southeast Africa' },
      { word: 'NETHERLANDS', hint: 'European country famous for tulip fields and windmills' },
      { word: 'PHILIPPINES', hint: 'Island archipelago country in Western Pacific' },
      { word: 'UZBEKISTAN', hint: 'Central Asian nation and former Soviet republic' },
      { word: 'LIECHTENSTEIN', hint: 'Tiny European principality nestled between Austria & Swiss' },
      { word: 'LUXEMBOURG', hint: 'Small European nation bordering Belgium, France, Germany' },
      { word: 'MOZAMBIQUE', hint: 'Southern African nation with long Indian Ocean coastline' },
      { word: 'KAZAKHSTAN', hint: 'World largest landlocked country spanning Central Asia' },
      { word: 'AZERBAIJAN', hint: 'Nation bounded by Caspian Sea and Caucasus mountains' }
    ]
  },
  general: {
    easy: [
      { word: 'PLANET', hint: 'Celestial body orbiting around a star' },
      { word: 'OCEAN', hint: 'Huge continuous body of saltwater covering Earth' },
      { word: 'FOREST', hint: 'Large area covered chiefly with trees and undergrowth' },
      { word: 'CASTLE', hint: 'Fortified medieval residence of lords or royalty' },
      { word: 'DESERT', hint: 'Arid barren area of landscape where little precipitation falls' },
      { word: 'BRIDGE', hint: 'Structure built to span physical obstacle like a river' },
      { word: 'ISLAND', hint: 'Tract of land surrounded completely by water' },
      { word: 'GALAXY', hint: 'System of millions or billions of stars held by gravity' },
      { word: 'RAINBOW', hint: 'Meteorological phenomenon showing arc of colored light' },
      { word: 'VOLCANO', hint: 'Rupture in crust of Earth that allows hot lava to escape' }
    ],
    medium: [
      { word: 'PYRAMID', hint: 'Monumental triangular structure built by ancient civilizations' },
      { word: 'TELESCOPE', hint: 'Optical instrument designed to view distant objects' },
      { word: 'GRAVITY', hint: 'Universal force of attraction between all matter' },
      { word: 'ATMOSPHERE', hint: 'Envelope of gases surrounding a planet' },
      { word: 'HORIZON', hint: 'Line at which Earth surface and sky appear to meet' },
      { word: 'SOLARSYSTEM', hint: 'The collection of eight planets orbiting the Sun' },
      { word: 'METEORITE', hint: 'Piece of space debris that survives fall through atmosphere' },
      { word: 'MICROSCOPE', hint: 'Optical instrument used for viewing very small objects' },
      { word: 'GLACIER', hint: 'Persistent body of dense ice moving under own weight' },
      { word: 'ECOSYSTEM', hint: 'Biological community of interacting organisms' }
    ],
    hard: [
      { word: 'RENAISSANCE', hint: 'Fervent period of European cultural and artistic rebirth' },
      { word: 'ARCHAEOLOGY', hint: 'Study of human history through excavation of sites' },
      { word: 'CONSTELLATION', hint: 'Recognizable configuration of stars named after mythological form' },
      { word: 'METAMORPHOSIS', hint: 'Biological process of physical transformation after birth' },
      { word: 'PHOTOSYNTHESIS', hint: 'Process plants use to convert sunlight into food chemical energy' },
      { word: 'PALEONTOLOGY', hint: 'Branch of science concerned with fossil animals and plants' },
      { word: 'STRATOSPHERE', hint: 'Second major layer of Earth atmosphere above troposphere' },
      { word: 'BIODIVERSITY', hint: 'Variety of plant and animal life in world or particular habitat' },
      { word: 'SEISMOLOGY', hint: 'Branch of science concerned with earthquakes' },
      { word: 'PHILOSOPHY', hint: 'Study of fundamental nature of knowledge, reality, existence' }
    ]
  }
};

/**
 * Helper to pick a random word given category and difficulty.
 * If category is 'general knowledge' or unknown, defaults to 'general'.
 */
function getRandomWord(category = 'general', difficulty = 'medium') {
  const normalizedCategory = category.toLowerCase().replace(/\s+/g, '');
  const catKey = wordBank[normalizedCategory] ? normalizedCategory : 
    (wordBank[category.toLowerCase()] ? category.toLowerCase() : 'general');
  
  const diffKey = ['easy', 'medium', 'hard'].includes(difficulty.toLowerCase()) 
    ? difficulty.toLowerCase() 
    : 'medium';

  const wordList = wordBank[catKey][diffKey];
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
}

module.exports = {
  wordBank,
  getRandomWord
};
