

export const animalNames = {
  animals: [
    'ant-eater', 'bear-',     'bear',       'beaver',
    'boar',      'bull',      'camel',      'chameleon',
    'cheetah',   'crocodile', 'deer',       'donkey',
    'duck',      'eagle',     'elephant',   'elk',
    'fox',       'frog',      'giraffe',    'goat-',
    'goat',      'goose',     'gorilla',    'hamster',
    'hedgehog',  'hippo',     'horse',      'kangaroo',
    'koala',     'lemur',     'lion',       'llama',
    'meerkat',   'monkey',    'ostrich',    'owl',
    'panda',     'parrot',    'penguin',    'puma',
    'rabbit',    'raccoon',   'rhinoceros', 'sloth',
    'snake',     'tiger',     'turtle',     'walrus',
    'wolf',      'zebra'
  ],
  animalTranslation: {
    'ant-eater' : "Ameisenbär", 'bear-' : "Bär",     'bear': "Bär",       'beaver': "Biber",
    'boar': "Wildschwein",      'bull': "Stier",      'camel': "Kamel",      'chameleon': "Chamäleon",
    'cheetah': "Gepard",   'crocodile': "Krokodil", 'deer': "Hirsch",       'donkey': "Esel",
    'duck': "Ente",      'eagle': "Adler",     'elephant': "Elefant",   'elk': "Elch",
    'fox': "Fuchs",       'frog': "Frosch",      'giraffe': "Giraffe",    'goat-': "Ziege",
    'goat': "Ziege",      'goose': "Gans",     'gorilla': "Gorilla",    'hamster': "Hamster",
    'hedgehog': "Iegel",  'hippo': "Nilpferd",     'horse': "Pferd",      'kangaroo': "Känguru",
    'koala': "Koala",     'lemur': "Lemur",     'lion': "Löwe",       'llama': "Lama",
    'meerkat': "Erdmännchen",   'monkey': "Affe",    'ostrich': "Strauß",    'owl': "Eule",
    'panda': "Panda",     'parrot': "Papagei",    'penguin': "Pinguin",    'puma': "Puma",
    'rabbit': "Hase",    'raccoon': "Waschbär",   'rhinoceros': "Nashorn", 'sloth': "Faultier",
    'snake': "Schlange",     'tiger': "Tiger",     'turtle': "Schildkröte",     'walrus': "Walross",
    'wolf': "Wolf",      'zebra': "Zebra", "dragon" : "Drache"
  }
}

export const getRandomAnimal = () => {
  if (Math.random() > 0.99) return "dragon";
  return animalNames.animals[Math.floor(Math.random()*animalNames.animals.length)];
}

export const translateAnimalName = (name : string) => {
  // @ts-ignore
  return animalNames.animalTranslation[name];
}
