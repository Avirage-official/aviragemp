import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.aspectInfo.deleteMany();
  await prisma.houseInfo.deleteMany();
  await prisma.planetInfo.deleteMany();
  await prisma.astrologySignInfo.deleteMany();
  await prisma.numerologyInfo.deleteMany();

  console.log('Seeding astrology and numerology reference data...');

  ////////////////////////
  // ASTROLOGY - ZODIAC SIGNS
  ////////////////////////

  const zodiacSigns = [
    {
      sign: 'Aries',
      symbol: '♈',
      dateRange: 'Mar 21 - Apr 19',
      description:
        'Aries is the first sign of the zodiac, known for being bold, courageous, and pioneering. As a fire sign ruled by Mars, Aries natives are natural leaders with a strong desire to initiate new projects and ventures. They are energetic, passionate, and competitive, always ready to face challenges head-on. However, they can sometimes be impulsive and impatient, wanting immediate results.',
      traits: [
        'Bold',
        'Courageous',
        'Pioneer',
        'Energetic',
        'Passionate',
        'Confident',
        'Impulsive',
        'Competitive',
      ],
      strengths: [
        'Leadership',
        'Courage',
        'Confidence',
        'Initiative',
        'Passion',
        'Determination',
      ],
      weaknesses: [
        'Impulsiveness',
        'Impatience',
        'Aggressiveness',
        'Recklessness',
        'Selfishness',
      ],
      element: 'Fire',
      modality: 'Cardinal',
      rulingPlanet: 'Mars',
      compatibleSigns: ['Leo', 'Sagittarius', 'Aries'],
      luckyNumbers: [1, 9, 16, 25],
      luckyColors: ['Red', 'Scarlet', 'Orange'],
      luckyDays: ['Tuesday'],
      bodyPart: 'Head, Brain',
      anatomy:
        'Aries rules the head and brain, governing mental processes and sensory perception.',
    },
    {
      sign: 'Taurus',
      symbol: '♉',
      dateRange: 'Apr 20 - May 20',
      description:
        'Taurus is an earth sign ruled by Venus, representing stability, reliability, and material comfort. Taurus natives are grounded, practical, and sensual, with a deep appreciation for beauty and comfort. They are loyal, honest, and determined, often described as the most reliable of the zodiac. However, they can be stubborn and possessive, resistant to change.',
      traits: [
        'Stable',
        'Reliable',
        'Sensual',
        'Practical',
        'Grounded',
        'Loyal',
        'Determined',
        'Stubborn',
      ],
      strengths: [
        'Loyalty',
        'Dependability',
        'Practicality',
        'Honesty',
        'Persistence',
        'Sensibility',
      ],
      weaknesses: [
        'Stubbornness',
        'Possessiveness',
        'Materialism',
        'Resistance to change',
        'Laziness',
      ],
      element: 'Earth',
      modality: 'Fixed',
      rulingPlanet: 'Venus',
      compatibleSigns: ['Virgo', 'Capricorn', 'Taurus'],
      luckyNumbers: [2, 6, 15, 24],
      luckyColors: ['Green', 'Pink', 'Earth Tones'],
      luckyDays: ['Friday', 'Monday'],
      bodyPart: 'Neck, Throat, Ears',
      anatomy: 'Taurus rules the throat, neck, and ears, affecting communication and hearing.',
    },
    {
      sign: 'Gemini',
      symbol: '♊',
      dateRange: 'May 21 - Jun 20',
      description:
        'Gemini is an air sign ruled by Mercury, symbolizing communication, intellect, and curiosity. Gemini natives are intellectually driven, adaptable, and versatile. They excel in communication and thrive in dynamic, stimulating environments. Quick-witted and social, they are natural communicators and storytellers. However, they can be indecisive, superficial, and prone to restlessness.',
      traits: [
        'Intellectual',
        'Communicative',
        'Versatile',
        'Curious',
        'Adaptable',
        'Witty',
        'Restless',
        'Indecisive',
      ],
      strengths: [
        'Communication',
        'Adaptability',
        'Intelligence',
        'Wit',
        'Versatility',
        'Charm',
      ],
      weaknesses: [
        'Indecision',
        'Inconsistency',
        'Superficiality',
        'Nervousness',
        'Scattered',
      ],
      element: 'Air',
      modality: 'Mutable',
      rulingPlanet: 'Mercury',
      compatibleSigns: ['Libra', 'Aquarius', 'Gemini'],
      luckyNumbers: [3, 5, 14, 23],
      luckyColors: ['Yellow', 'Green', 'Light Blue'],
      luckyDays: ['Wednesday'],
      bodyPart: 'Lungs, Hands, Nervous System',
      anatomy: 'Gemini governs the lungs, hands, and nervous system, affecting breathing and dexterity.',
    },
    {
      sign: 'Cancer',
      symbol: '♋',
      dateRange: 'Jun 21 - Jul 22',
      description:
        'Cancer is a water sign ruled by the Moon, embodying emotional depth, intuition, and nurturing. Cancer natives are sensitive, protective, and deeply connected to their emotions and family. They are empathetic and caring, with strong protective instincts. However, they can be moody, overly sensitive, and clingy in relationships.',
      traits: [
        'Emotional',
        'Intuitive',
        'Nurturing',
        'Protective',
        'Sensitive',
        'Loyal',
        'Moody',
        'Clingy',
      ],
      strengths: [
        'Loyalty',
        'Emotional intelligence',
        'Protectiveness',
        'Intuition',
        'Compassion',
        'Tenacity',
      ],
      weaknesses: [
        'Moodiness',
        'Oversensitivity',
        'Clinginess',
        'Insecurity',
        'Manipulation',
      ],
      element: 'Water',
      modality: 'Cardinal',
      rulingPlanet: 'Moon',
      compatibleSigns: ['Scorpio', 'Pisces', 'Cancer'],
      luckyNumbers: [2, 7, 11, 29],
      luckyColors: ['Silver', 'White', 'Pale Blue'],
      luckyDays: ['Monday'],
      bodyPart: 'Chest, Stomach, Breasts',
      anatomy:
        'Cancer rules the chest, stomach, and digestive organs, reflecting emotional and nutritional needs.',
    },
    {
      sign: 'Leo',
      symbol: '♌',
      dateRange: 'Jul 23 - Aug 22',
      description:
        'Leo is a fire sign ruled by the Sun, representing confidence, creativity, and self-expression. Leo natives are natural performers who love the spotlight and admiration. They are generous, warm-hearted, and creative, with a strong sense of pride and dignity. However, they can be arrogant, overly dramatic, and excessively needy for attention.',
      traits: [
        'Confident',
        'Creative',
        'Generous',
        'Warm-hearted',
        'Proud',
        'Dramatic',
        'Arrogant',
        'Attention-seeking',
      ],
      strengths: [
        'Confidence',
        'Creativity',
        'Leadership',
        'Generosity',
        'Warmth',
        'Charisma',
      ],
      weaknesses: [
        'Pride',
        'Arrogance',
        'Need for attention',
        'Stubbornness',
        'Vanity',
      ],
      element: 'Fire',
      modality: 'Fixed',
      rulingPlanet: 'Sun',
      compatibleSigns: ['Aries', 'Sagittarius', 'Leo'],
      luckyNumbers: [1, 4, 10, 19],
      luckyColors: ['Gold', 'Orange', 'Red'],
      luckyDays: ['Sunday'],
      bodyPart: 'Heart, Spine, Circulatory System',
      anatomy: 'Leo rules the heart and spine, connected to strength, courage, and vitality.',
    },
    {
      sign: 'Virgo',
      symbol: '♍',
      dateRange: 'Aug 23 - Sep 22',
      description:
        'Virgo is an earth sign ruled by Mercury, symbolizing analysis, practicality, and attention to detail. Virgo natives are meticulous, analytical, and health-conscious. They have a keen eye for detail and are organized perfectionists who strive for improvement. However, they can be overcritical, anxious, and overly focused on flaws.',
      traits: [
        'Analytical',
        'Practical',
        'Perfectionist',
        'Modest',
        'Health-conscious',
        'Organized',
        'Critical',
        'Anxious',
      ],
      strengths: [
        'Attention to detail',
        'Reliability',
        'Analytical mind',
        'Practical wisdom',
        'Helpfulness',
        'Integrity',
      ],
      weaknesses: [
        'Overcritical',
        'Perfectionism',
        'Anxiety',
        'Shyness',
        'Overworking',
      ],
      element: 'Earth',
      modality: 'Mutable',
      rulingPlanet: 'Mercury',
      compatibleSigns: ['Taurus', 'Capricorn', 'Virgo'],
      luckyNumbers: [3, 6, 12, 21],
      luckyColors: ['Green', 'Brown', 'Gray'],
      luckyDays: ['Wednesday'],
      bodyPart: 'Digestive System, Intestines',
      anatomy: 'Virgo governs the digestive system and intestines, reflecting processing and discernment.',
    },
    {
      sign: 'Libra',
      symbol: '♎',
      dateRange: 'Sep 23 - Oct 22',
      description:
        'Libra is an air sign ruled by Venus, representing balance, harmony, and relationships. Libra natives are diplomatic, social, and aesthetic, with a deep appreciation for beauty and fairness. They are natural mediators who strive for equilibrium in all aspects of life. However, they can be indecisive, people-pleasing, and prone to superficiality.',
      traits: [
        'Diplomatic',
        'Balanced',
        'Social',
        'Aesthetic',
        'Fair-minded',
        'Indecisive',
        'People-pleasing',
        'Superficial',
      ],
      strengths: [
        'Diplomacy',
        'Fairness',
        'Social grace',
        'Creativity',
        'Balance',
        'Cooperation',
      ],
      weaknesses: [
        'Indecision',
        'People-pleasing',
        'Superficiality',
        'Passivity',
        'Avoidance',
      ],
      element: 'Air',
      modality: 'Cardinal',
      rulingPlanet: 'Venus',
      compatibleSigns: ['Gemini', 'Aquarius', 'Libra'],
      luckyNumbers: [4, 6, 13, 22],
      luckyColors: ['Blue', 'Green', 'Pink'],
      luckyDays: ['Friday', 'Wednesday'],
      bodyPart: 'Kidneys, Lumbar Region',
      anatomy: 'Libra rules the kidneys and lower back, relating to balance and elimination.',
    },
    {
      sign: 'Scorpio',
      symbol: '♏',
      dateRange: 'Oct 23 - Nov 21',
      description:
        'Scorpio is a water sign ruled by Pluto, representing transformation, intensity, and power. Scorpio natives are mysterious, intuitive, and deeply passionate. They possess powerful willpower and are capable of profound transformation. Known for their loyalty and dedication, they form deep emotional bonds. However, they can be jealous, vindictive, and overly secretive.',
      traits: [
        'Intense',
        'Mysterious',
        'Powerful',
        'Secretive',
        'Passionate',
        'Loyal',
        'Jealous',
        'Vindictive',
      ],
      strengths: [
        'Determination',
        'Loyalty',
        'Intuition',
        'Power',
        'Courage',
        'Resilience',
      ],
      weaknesses: [
        'Jealousy',
        'Vindictiveness',
        'Secrecy',
        'Obsessiveness',
        'Manipulation',
      ],
      element: 'Water',
      modality: 'Fixed',
      rulingPlanet: 'Pluto',
      compatibleSigns: ['Cancer', 'Pisces', 'Scorpio'],
      luckyNumbers: [2, 8, 11, 29],
      luckyColors: ['Red', 'Maroon', 'Black'],
      luckyDays: ['Tuesday'],
      bodyPart: 'Reproductive System, Genitals',
      anatomy: 'Scorpio rules the reproductive organs and genitals, connected to sexuality and transformation.',
    },
    {
      sign: 'Sagittarius',
      symbol: '♐',
      dateRange: 'Nov 22 - Dec 21',
      description:
        'Sagittarius is a fire sign ruled by Jupiter, embodying optimism, adventure, and philosophy. Sagittarius natives are expansive, adventurous, and philosophical, always seeking truth and wisdom. They are optimistic, honest, and have a great love for freedom and exploration. However, they can be overconfident, tactless, and impatient with limitations.',
      traits: [
        'Optimistic',
        'Adventurous',
        'Philosophical',
        'Outspoken',
        'Restless',
        'Free-spirited',
        'Overconfident',
        'Tactless',
      ],
      strengths: [
        'Optimism',
        'Honesty',
        'Enthusiasm',
        'Wisdom',
        'Open-mindedness',
        'Justice',
      ],
      weaknesses: [
        'Overconfidence',
        'Tactlessness',
        'Impatience',
        'Restlessness',
        'Irresponsibility',
      ],
      element: 'Fire',
      modality: 'Mutable',
      rulingPlanet: 'Jupiter',
      compatibleSigns: ['Aries', 'Leo', 'Sagittarius'],
      luckyNumbers: [3, 9, 12, 21],
      luckyColors: ['Purple', 'Blue', 'Orange'],
      luckyDays: ['Thursday'],
      bodyPart: 'Hips, Thighs, Liver',
      anatomy: 'Sagittarius governs the hips, thighs, and liver, connected to movement and expansion.',
    },
    {
      sign: 'Capricorn',
      symbol: '♑',
      dateRange: 'Dec 22 - Jan 19',
      description:
        'Capricorn is an earth sign ruled by Saturn, representing discipline, responsibility, and ambition. Capricorn natives are practical, disciplined, and goal-oriented. They are hardworking, patient, and have a strong sense of duty. Capable climbers of the mountain of success, they understand delayed gratification. However, they can be pessimistic, rigid, and emotionally cold.',
      traits: [
        'Ambitious',
        'Disciplined',
        'Responsible',
        'Practical',
        'Reserved',
        'Pessimistic',
        'Rigid',
        'Cold',
      ],
      strengths: [
        'Responsibility',
        'Discipline',
        'Ambition',
        'Practicality',
        'Patience',
        'Reliability',
      ],
      weaknesses: [
        'Pessimism',
        'Rigidity',
        'Coldness',
        'Unforgivingness',
        'Excessive seriousness',
      ],
      element: 'Earth',
      modality: 'Cardinal',
      rulingPlanet: 'Saturn',
      compatibleSigns: ['Taurus', 'Virgo', 'Capricorn'],
      luckyNumbers: [1, 8, 10, 19],
      luckyColors: ['Black', 'Gray', 'Brown'],
      luckyDays: ['Saturday'],
      bodyPart: 'Bones, Joints, Knees',
      anatomy: 'Capricorn rules bones and joints, reflecting structure, support, and aging.',
    },
    {
      sign: 'Aquarius',
      symbol: '♒',
      dateRange: 'Jan 20 - Feb 18',
      description:
        'Aquarius is an air sign ruled by Uranus, symbolizing innovation, individuality, and humanitarianism. Aquarius natives are forward-thinking, innovative, and fiercely independent. They are intellectually driven and often ahead of their time, with a deep commitment to humanitarian ideals. However, they can be detached, aloof, and unpredictable.',
      traits: [
        'Innovative',
        'Independent',
        'Intellectual',
        'Humanitarian',
        'Eccentric',
        'Detached',
        'Unpredictable',
        'Aloof',
      ],
      strengths: [
        'Innovation',
        'Independence',
        'Humanitarianism',
        'Intellect',
        'Originality',
        'Progress-minded',
      ],
      weaknesses: [
        'Detachment',
        'Unpredictability',
        'Aloofness',
        'Coldness',
        'Inflexibility',
      ],
      element: 'Air',
      modality: 'Fixed',
      rulingPlanet: 'Uranus',
      compatibleSigns: ['Gemini', 'Libra', 'Aquarius'],
      luckyNumbers: [4, 7, 11, 29],
      luckyColors: ['Electric Blue', 'Blue', 'Silver'],
      luckyDays: ['Wednesday', 'Saturday'],
      bodyPart: 'Shins, Ankles, Circulatory System',
      anatomy: 'Aquarius rules the shins, ankles, and circulatory system, connected to flow and connection.',
    },
    {
      sign: 'Pisces',
      symbol: '♓',
      dateRange: 'Feb 19 - Mar 20',
      description:
        'Pisces is a water sign ruled by Neptune, embodying intuition, spirituality, and compassion. Pisces natives are artistic, intuitive, and deeply empathetic. They are dreamers with a strong connection to the spiritual and imaginative realms. Adaptable and compassionate, they seek to transcend boundaries. However, they can be escapist, overly sensitive, and prone to confusion.',
      traits: [
        'Intuitive',
        'Artistic',
        'Compassionate',
        'Escapist',
        'Dreamy',
        'Sensitive',
        'Adaptable',
        'Idealistic',
      ],
      strengths: [
        'Intuition',
        'Creativity',
        'Compassion',
        'Adaptability',
        'Spiritual awareness',
        'Empathy',
      ],
      weaknesses: [
        'Escapism',
        'Hypersensitivity',
        'Lack of boundaries',
        'Naivety',
        'Confusion',
      ],
      element: 'Water',
      modality: 'Mutable',
      rulingPlanet: 'Neptune',
      compatibleSigns: ['Cancer', 'Scorpio', 'Pisces'],
      luckyNumbers: [3, 7, 12, 21],
      luckyColors: ['Sea Green', 'Purple', 'Teal'],
      luckyDays: ['Thursday', 'Monday'],
      bodyPart: 'Feet, Lymphatic System',
      anatomy:
        'Pisces rules the feet and lymphatic system, relating to grounding and immune function.',
    },
  ];

  for (const sign of zodiacSigns) {
    await prisma.astrologySignInfo.create({
      data: sign as any,
    });
  }

  console.log('✓ Zodiac signs seeded');

  ////////////////////////
  // PLANETS
  ////////////////////////

  const planets = [
    {
      name: 'Sun',
      symbol: '☉',
      description:
        'The Sun represents the core essence of the self—your identity, will power, ego, and life force. It is your fundamental nature and what drives you forward.',
      meaning:
        'Your Sun sign is who you are at your core. It represents your conscious will, your central sense of self, and your basic identity. The Sun is about purpose, creativity, and the life force within you.',
      rulesOver: ['Identity', 'Will power', 'Ego', 'Life force', 'Core essence'],
      traits: [
        'Confident',
        'Creative',
        'Generous',
        'Proud',
        'Authoritative',
        'Vital',
        'Brave',
        'Expressive',
      ],
      daysOfWeek: ['Sunday'],
      colors: ['Gold', 'Yellow', 'Orange'],
      metals: ['Gold'],
    },
    {
      name: 'Moon',
      symbol: '☽',
      description:
        'The Moon governs emotions, instincts, the subconscious mind, and inner emotional world. It represents your private self and emotional needs.',
      meaning:
        'Your Moon sign represents how you feel, your emotional nature, and your private self. It governs your instincts, intuition, and the way you react emotionally to life. The Moon is nurturing and introspective.',
      rulesOver: [
        'Emotions',
        'Instincts',
        'Subconscious',
        'Intuition',
        'Nurturing',
        'Family',
      ],
      traits: [
        'Emotional',
        'Intuitive',
        'Nurturing',
        'Moody',
        'Sensitive',
        'Protective',
        'Receptive',
        'Imaginative',
      ],
      daysOfWeek: ['Monday'],
      colors: ['White', 'Silver', 'Pale Blue'],
      metals: ['Silver'],
    },
    {
      name: 'Mercury',
      symbol: '☿',
      description:
        'Mercury is the planet of communication, intellect, logic, and travel. It governs how you think, speak, write, and process information.',
      meaning:
        'Mercury is about communication, reasoning, and the exchange of ideas. It rules your mind, how you express yourself, and how you perceive the world through language and logic.',
      rulesOver: [
        'Communication',
        'Intellect',
        'Logic',
        'Travel',
        'Commerce',
        'Perception',
        'Writing',
      ],
      traits: [
        'Communicative',
        'Intellectual',
        'Curious',
        'Analytical',
        'Quick-witted',
        'Versatile',
        'Clever',
        'Restless',
      ],
      daysOfWeek: ['Wednesday'],
      colors: ['Yellow', 'Green', 'Orange'],
      metals: ['Mercury'],
    },
    {
      name: 'Venus',
      symbol: '♀',
      description:
        'Venus is the planet of love, beauty, values, and pleasure. It governs relationships, attraction, and what you find beautiful and valuable.',
      meaning:
        'Venus represents what you love and what attracts you. It is the planet of relationships, sensuality, artistic expression, and material values. Venus is about pleasure and harmony.',
      rulesOver: [
        'Love',
        'Beauty',
        'Values',
        'Pleasure',
        'Relationships',
        'Attraction',
        'Art',
        'Money',
      ],
      traits: [
        'Loving',
        'Artistic',
        'Sensual',
        'Diplomatic',
        'Pleasure-seeking',
        'Harmonious',
        'Attractive',
        'Materialistic',
      ],
      daysOfWeek: ['Friday'],
      colors: ['Green', 'Pink', 'Cyan'],
      metals: ['Copper'],
    },
    {
      name: 'Mars',
      symbol: '♂',
      description:
        'Mars is the planet of passion, action, aggression, and sexuality. It governs your drive, ambition, and how you assert yourself.',
      meaning:
        'Mars is about your will to act, your passion, and your assertiveness. It represents your sexual energy, competitive drive, and courage. Mars is action-oriented and passionate.',
      rulesOver: ['Passion', 'Action', 'Aggression', 'Sexuality', 'Drive', 'Courage', 'War'],
      traits: [
        'Aggressive',
        'Passionate',
        'Action-oriented',
        'Ambitious',
        'Courageous',
        'Sexual',
        'Competitive',
        'Assertive',
      ],
      daysOfWeek: ['Tuesday'],
      colors: ['Red', 'Scarlet', 'Orange'],
      metals: ['Iron'],
    },
    {
      name: 'Jupiter',
      symbol: '♃',
      description:
        'Jupiter is the planet of expansion, luck, abundance, wisdom, and growth. It represents optimism and the pursuit of higher knowledge.',
      meaning:
        'Jupiter is the planet of luck, expansion, and good fortune. It represents your ability to grow, learn, and expand horizons. Jupiter brings optimism, generosity, and opportunities.',
      rulesOver: [
        'Expansion',
        'Luck',
        'Abundance',
        'Wisdom',
        'Growth',
        'Philosophy',
        'Higher learning',
      ],
      traits: [
        'Optimistic',
        'Generous',
        'Wise',
        'Expansive',
        'Lucky',
        'Philosophical',
        'Enthusiastic',
        'Excessive',
      ],
      daysOfWeek: ['Thursday'],
      colors: ['Purple', 'Blue', 'Green'],
      metals: ['Tin'],
    },
    {
      name: 'Saturn',
      symbol: '♄',
      description:
        'Saturn is the planet of limitation, discipline, karma, and responsibility. It represents time, boundaries, and the lessons we learn through experience.',
      meaning:
        'Saturn teaches discipline and responsibility. It represents your limitations, fears, and karmic lessons. Saturn brings maturity, structure, and the need to work for what you want.',
      rulesOver: [
        'Limitation',
        'Discipline',
        'Karma',
        'Responsibility',
        'Time',
        'Structure',
        'Boundaries',
      ],
      traits: [
        'Disciplined',
        'Responsible',
        'Serious',
        'Practical',
        'Patient',
        'Rigid',
        'Pessimistic',
        'Ambitious',
      ],
      daysOfWeek: ['Saturday'],
      colors: ['Black', 'Gray', 'Brown'],
      metals: ['Lead'],
    },
    {
      name: 'Uranus',
      symbol: '♅',
      description:
        'Uranus is the planet of innovation, revolution, and sudden change. It represents individuality, technology, and breaking free from conventions.',
      meaning:
        'Uranus is about innovation and revolution. It breaks down what is stale and creates something new. Uranus represents sudden change, individual freedom, and technological advancement.',
      rulesOver: [
        'Innovation',
        'Revolution',
        'Change',
        'Individuality',
        'Technology',
        'Freedom',
        'Rebellion',
      ],
      traits: [
        'Innovative',
        'Revolutionary',
        'Unpredictable',
        'Independent',
        'Eccentric',
        'Technological',
        'Detached',
        'Idealistic',
      ],
      daysOfWeek: ['Wednesday'],
      colors: ['Electric Blue', 'Light Blue', 'Silver'],
      metals: ['Uranium'],
    },
    {
      name: 'Neptune',
      symbol: '♆',
      description:
        'Neptune is the planet of dreams, spirituality, intuition, and illusion. It represents imagination, mysticism, and connection to the spiritual realm.',
      meaning:
        'Neptune is about dreams, spirituality, and transcendence. It represents intuition, imagination, and the dissolution of boundaries. Neptune can be inspiring or deceptive.',
      rulesOver: [
        'Dreams',
        'Spirituality',
        'Intuition',
        'Illusion',
        'Imagination',
        'Mysticism',
        'Compassion',
      ],
      traits: [
        'Spiritual',
        'Intuitive',
        'Imaginative',
        'Compassionate',
        'Dreamy',
        'Illusory',
        'Mystical',
        'Escapist',
      ],
      daysOfWeek: ['Thursday'],
      colors: ['Sea Green', 'Purple', 'Light Blue'],
      metals: [],
    },
    {
      name: 'Pluto',
      symbol: '♇',
      description:
        'Pluto is the planet of transformation, death and rebirth, power, and the subconscious. It represents deep change and the uncovering of hidden truths.',
      meaning:
        'Pluto is about transformation through destruction and rebirth. It represents power, control, and the uncovering of hidden truths. Pluto brings profound change and psychological depth.',
      rulesOver: [
        'Transformation',
        'Death/Rebirth',
        'Power',
        'Subconscious',
        'Hidden truths',
        'Regeneration',
        'Control',
      ],
      traits: [
        'Powerful',
        'Transformative',
        'Secretive',
        'Intense',
        'Magnetic',
        'Obsessive',
        'Psychological',
        'Controlling',
      ],
      daysOfWeek: ['Tuesday'],
      colors: ['Deep Red', 'Black', 'Dark Red'],
      metals: ['Plutonium'],
    },
  ];

  for (const planet of planets) {
    await prisma.planetInfo.create({
      data: planet as any,
    });
  }

  console.log('✓ Planets seeded');

  ////////////////////////
  // HOUSES
  ////////////////////////

  const houses = [
    {
      houseNumber: 1,
      description:
        'The First House is the house of self, representing your appearance, personality, and the way others perceive you. It is your immediate environment and first impressions.',
      meaning:
        'The 1st House is about your identity and how you present yourself to the world. It governs your physical appearance, personality traits, and the impression you make on others. This is your ascending sign or Ascendant.',
      theme: 'Self, Identity, Appearance',
      governs: [
        'Appearance',
        'Personality',
        'First impressions',
        'Identity',
        'Physical body',
        'Self-presentation',
      ],
      traits: [
        'Personal identity',
        'Physical appearance',
        'Confidence',
        'Initiative',
        'Personality traits',
      ],
    },
    {
      houseNumber: 2,
      description:
        'The Second House is the house of material possessions, values, and self-worth. It governs finances, money, and what you value in life.',
      meaning:
        'The 2nd House represents your values and possessions. It is about money, material security, and your sense of self-worth. This house shows how you relate to material resources and what you truly value.',
      theme: 'Values, Money, Self-Worth',
      governs: [
        'Money',
        'Possessions',
        'Values',
        'Self-worth',
        'Finances',
        'Talents',
        'Resources',
      ],
      traits: [
        'Financial security',
        'Material possessions',
        'Self-esteem',
        'Values',
        'Earning potential',
      ],
    },
    {
      houseNumber: 3,
      description:
        'The Third House is the house of communication, learning, and siblings. It governs how you communicate, think, and process information.',
      meaning:
        'The 3rd House is about communication, learning, and information exchange. It rules your thinking processes, writing, speaking, and relationships with siblings and neighbors. This is the realm of the mind.',
      theme: 'Communication, Learning, Thinking',
      governs: [
        'Communication',
        'Learning',
        'Siblings',
        'Short journeys',
        'Thinking',
        'Writing',
        'Speaking',
      ],
      traits: [
        'Communication style',
        'Mental abilities',
        'Siblings',
        'Education',
        'Curiosity',
        'Neighbors',
      ],
    },
    {
      houseNumber: 4,
      description:
        'The Fourth House is the house of home and family. It represents your private self, your roots, and your connection to family and ancestors.',
      meaning:
        'The 4th House (Imum Coeli) is about home, family, and private life. It represents your roots, your relationship with your parents, and the foundation of your life. This is the most private area of the chart.',
      theme: 'Home, Family, Roots',
      governs: [
        'Home',
        'Family',
        'Father/Mother',
        'Property',
        'Privacy',
        'Roots',
        'Childhood',
      ],
      traits: [
        'Family relationships',
        'Home environment',
        'Private self',
        'Ancestral heritage',
        'Emotional foundation',
      ],
    },
    {
      houseNumber: 5,
      description:
        'The Fifth House is the house of creativity, self-expression, romance, and children. It governs pleasure, creativity, and personal joy.',
      meaning:
        'The 5th House is about self-expression, creativity, and pleasure. It rules romance, children, and creative pursuits. This house shows how you express yourself artistically and romantically.',
      theme: 'Creativity, Romance, Children',
      governs: [
        'Creativity',
        'Romance',
        'Children',
        'Self-expression',
        'Pleasure',
        'Hobbies',
        'Talent',
      ],
      traits: [
        'Creative expression',
        'Romantic style',
        'Children',
        'Artistic talent',
        'Joy and pleasure',
        'Risk-taking',
      ],
    },
    {
      houseNumber: 6,
      description:
        'The Sixth House is the house of work, health, and service. It governs daily routines, work environment, and health matters.',
      meaning:
        'The 6th House is about work, health, and daily routines. It represents your job, your relationship with work, and your physical health. This house shows your ability to serve and maintain order.',
      theme: 'Work, Health, Service',
      governs: [
        'Work',
        'Health',
        'Service',
        'Daily routines',
        'Habits',
        'Employees',
        'Pets',
      ],
      traits: [
        'Work habits',
        'Health practices',
        'Organization',
        'Service orientation',
        'Cleanliness',
        'Daily routines',
      ],
    },
    {
      houseNumber: 7,
      description:
        'The Seventh House is the house of partnerships and marriage. It represents relationships, contracts, and how you relate to others on a one-to-one basis.',
      meaning:
        'The 7th House (Descendant) is about relationships and partnerships. It represents marriage, business partnerships, and close relationships. This house shows the qualities you seek in a partner.',
      theme: 'Marriage, Partnerships, Relationships',
      governs: [
        'Marriage',
        'Partnerships',
        'Relationships',
        'Contracts',
        'Open enemies',
        'Divorce',
      ],
      traits: [
        'Partner qualities sought',
        'Marriage potential',
        'Business partnerships',
        'Relationship patterns',
        'Diplomacy',
      ],
    },
    {
      houseNumber: 8,
      description:
        'The Eighth House is the house of transformation, shared resources, sexuality, and deep psychology. It represents death, rebirth, and taboo subjects.',
      meaning:
        'The 8th House is about transformation and deep issues. It rules sexuality, shared finances, inheritances, and psychological transformation. This is the house of occult knowledge and hidden truths.',
      theme: 'Transformation, Sexuality, Shared Resources',
      governs: [
        'Transformation',
        'Sexuality',
        'Shared resources',
        'Inheritances',
        'Occult',
        'Death',
        'Rebirth',
        'Psychology',
      ],
      traits: [
        'Transformation ability',
        'Sexual nature',
        'Psychological depth',
        'Intuition',
        'Financial security',
      ],
    },
    {
      houseNumber: 9,
      description:
        'The Ninth House is the house of philosophy, higher learning, and long-distance travel. It represents spirituality, beliefs, and the pursuit of truth.',
      meaning:
        'The 9th House is about philosophy, spirituality, and higher learning. It rules long journeys, higher education, and the search for meaning. This house shows your beliefs and spiritual path.',
      theme: 'Philosophy, Higher Learning, Spirituality',
      governs: [
        'Philosophy',
        'Higher learning',
        'Spirituality',
        'Long journeys',
        'Religion',
        'Foreign countries',
        'Ethics',
      ],
      traits: [
        'Spiritual beliefs',
        'Educational pursuits',
        'Philosophical nature',
        'Travel interests',
        'Belief systems',
      ],
    },
    {
      houseNumber: 10,
      description:
        'The Tenth House is the house of career and public image. It represents your professional life, reputation, and achievements in the world.',
      meaning:
        'The 10th House (Midheaven) is about career and public image. It represents your profession, reputation, and social status. This house shows your achievements and how the world perceives you.',
      theme: 'Career, Public Image, Authority',
      governs: [
        'Career',
        'Reputation',
        'Public image',
        'Authority',
        'Mother/Father',
        'Achievement',
        'Legacy',
      ],
      traits: [
        'Career path',
        'Professional reputation',
        'Ambition',
        'Public standing',
        'Leadership ability',
      ],
    },
    {
      houseNumber: 11,
      description:
        'The Eleventh House is the house of friendship, groups, and collective activities. It represents your hopes, wishes, and humanitarian ideals.',
      meaning:
        'The 11th House is about friendship and groups. It represents your social circles, hopes and wishes, and humanitarian ideals. This house shows your role in community and group dynamics.',
      theme: 'Friendship, Groups, Wishes',
      governs: [
        'Friendship',
        'Groups',
        'Hopes',
        'Wishes',
        'Technology',
        'Humanitarian causes',
        'Community',
      ],
      traits: [
        'Friendship style',
        'Group involvement',
        'Hopes and dreams',
        'Social ideals',
        'Innovation',
      ],
    },
    {
      houseNumber: 12,
      description:
        'The Twelfth House is the house of the subconscious, spirituality, and hidden enemies. It represents what is hidden, secret, and spiritual.',
      meaning:
        'The 12th House is about spirituality and the subconscious. It represents hidden influences, secret enemies, and spiritual matters. This house shows your connection to the spiritual realm and what is hidden from view.',
      theme: 'Spirituality, Subconscious, Hidden',
      governs: [
        'Spirituality',
        'Subconscious',
        'Hidden enemies',
        'Prisons',
        'Karma',
        'Secrets',
        'Isolation',
      ],
      traits: [
        'Spiritual connection',
        'Intuition',
        'Privacy needs',
        'Hidden talents',
        'Compassion',
        'Escapism',
      ],
    },
  ];

  for (const house of houses) {
    await prisma.houseInfo.create({
      data: house as any,
    });
  }

  console.log('✓ Houses seeded');

  ////////////////////////
  // ASPECTS
  ////////////////////////

  const aspects = [
    {
      name: 'Conjunction',
      symbol: '☌',
      angle: 0,
      description:
        'A Conjunction occurs when two planets are at the same degree of the zodiac. The planets merge their energies, creating an intense fusion.',
      meaning:
        'Conjunctions represent blending and amplification. The two planets work as one force, intensifying each other. The influence depends on which planets are involved—some conjunctions are harmonious, others challenging.',
      influence: 'Intense/Neutral (depends on planets)',
      traits: [
        'Fusion of energies',
        'Amplification',
        'Intensity',
        'Unity',
        'Combined force',
        'Merging',
      ],
    },
    {
      name: 'Sextile',
      symbol: '⚹',
      angle: 60,
      description:
        'A Sextile occurs when two planets are 60 degrees apart. This is one of the most harmonious aspects, representing ease and natural support.',
      meaning:
        'Sextiles are supportive and encouraging. They represent talents that come naturally and opportunities that flow with ease. Sextiles are gifts that you can develop with effort.',
      influence: 'Harmonious',
      traits: [
        'Ease',
        'Natural talent',
        'Support',
        'Opportunity',
        'Flow',
        'Encouragement',
      ],
    },
    {
      name: 'Square',
      symbol: '□',
      angle: 90,
      description:
        'A Square occurs when two planets are 90 degrees apart. This is a challenging aspect that creates friction, but also motivation for growth.',
      meaning:
        'Squares represent challenges and tensions that demand resolution. They create friction that motivates action and growth. Squares are uncomfortable but transformative if channeled constructively.',
      influence: 'Challenging',
      traits: [
        'Tension',
        'Challenge',
        'Friction',
        'Growth opportunity',
        'Motivation',
        'Conflict',
      ],
    },
    {
      name: 'Trine',
      symbol: '△',
      angle: 120,
      description:
        'A Trine occurs when two planets are 120 degrees apart. This is the most harmonious aspect, representing flowing ease and natural talents.',
      meaning:
        'Trines are the most fortunate aspects, bringing ease, talent, and luck. They represent areas where things come naturally to you. Trines are gifts that you already possess.',
      influence: 'Harmonious',
      traits: [
        'Ease',
        'Luck',
        'Talent',
        'Flow',
        'Grace',
        'Natural ability',
        'Fortune',
      ],
    },
    {
      name: 'Opposition',
      symbol: '☍',
      angle: 180,
      description:
        'An Opposition occurs when two planets are 180 degrees apart, directly across the zodiac. This creates tension and polarity that requires balance.',
      meaning:
        'Oppositions represent polarities and the need for balance. The two planets are opposing forces that must be integrated. Oppositions create awareness through confrontation and need for balance.',
      influence: 'Challenging',
      traits: [
        'Polarity',
        'Opposition',
        'Tension',
        'Awareness',
        'Balance needed',
        'Projection',
        'Integration',
      ],
    },
  ];

  for (const aspect of aspects) {
    await prisma.aspectInfo.create({
      data: aspect as any,
    });
  }

  console.log('✓ Aspects seeded');

  ////////////////////////
  // NUMEROLOGY
  ////////////////////////

  const numerology = [
    {
      number: 1,
      name: 'Number 1 - The Leader',
      description:
        'Number 1 is the pioneer and leader. It represents independence, originality, and ambition. Those with Life Path 1 are trailblazers who create new paths.',
      meaning:
        'The number 1 is about new beginnings, independence, and leadership. It is the most masculine, active, and pioneering of all numbers. Life Path 1 individuals are meant to lead and innovate.',
      traits: [
        'Leadership',
        'Independence',
        'Originality',
        'Ambition',
        'Courage',
        'Initiative',
        'Determination',
      ],
      strengths: [
        'Natural leadership',
        'Independence',
        'Originality',
        'Courage',
        'Ambition',
        'Determination',
      ],
      weaknesses: [
        'Arrogance',
        'Selfishness',
        'Impatience',
        'Domination',
        'Rigidity',
      ],
      lifeTheme: 'Pioneering new paths and creating leadership',
      lifeLesson:
        'Learning to lead without being domineering and developing balance between independence and cooperation',
      compatibleNumbers: [3, 5, 7, 9],
      luckyColors: ['Red', 'Orange'],
      luckyDays: ['Sunday', 'Monday'],
      personality:
        'Natural leaders with strong will and determination. You are independent, ambitious, and enjoy taking charge. You are courageous and willing to pioneer new territory.',
      career:
        'Entrepreneurship, management, leadership positions. You thrive when creating something new or being in charge. Avoid positions that require following others.',
      relationships:
        'You need independence in relationships and a partner who respects your autonomy. You are protective and take charge, but must learn to listen.',
    },
    {
      number: 2,
      name: 'Number 2 - The Diplomat',
      description:
        'Number 2 is the diplomat and peacemaker. It represents balance, cooperation, and intuition. Those with Life Path 2 are sensitive, supportive partners.',
      meaning:
        'The number 2 is about duality, balance, and partnership. It is the feminine, receptive, and cooperative number. Life Path 2 individuals are meant to support, balance, and bring harmony.',
      traits: [
        'Cooperation',
        'Balance',
        'Diplomacy',
        'Sensitivity',
        'Intuition',
        'Support',
        'Gentleness',
      ],
      strengths: [
        'Diplomacy',
        'Sensitivity',
        'Cooperation',
        'Intuition',
        'Balance',
        'Patience',
      ],
      weaknesses: [
        'Indecision',
        'Dependence',
        'Hypersensitivity',
        'Timidity',
        'Passivity',
      ],
      lifeTheme: 'Creating balance, harmony, and partnerships',
      lifeLesson:
        'Learning to stand up for yourself while maintaining harmony and developing confidence in your intuition',
      compatibleNumbers: [1, 4, 7, 8],
      luckyColors: ['White', 'Green'],
      luckyDays: ['Monday', 'Friday'],
      personality:
        'Sensitive, intuitive, and naturally diplomatic. You are good listeners and peacemakers. You prefer cooperation over competition and seek balance in all things.',
      career:
        'Counseling, mediation, partnership roles, human resources. You excel in environments that value cooperation and teamwork. Avoid highly competitive environments.',
      relationships:
        'You are a devoted and intuitive partner. You are sensitive to your partner\'s needs and seek harmony. You must avoid becoming too dependent and learn to express your own needs.',
    },
    {
      number: 3,
      name: 'Number 3 - The Creator',
      description:
        'Number 3 is the creator and communicator. It represents self-expression, creativity, and optimism. Those with Life Path 3 are natural communicators and artists.',
      meaning:
        'The number 3 is about self-expression, creativity, and communication. It is optimistic, social, and joyful. Life Path 3 individuals are meant to express themselves and bring joy to others.',
      traits: [
        'Creativity',
        'Communication',
        'Self-expression',
        'Optimism',
        'Sociability',
        'Artistry',
        'Joy',
      ],
      strengths: [
        'Creativity',
        'Communication',
        'Optimism',
        'Social skills',
        'Artistry',
        'Joy',
      ],
      weaknesses: [
        'Scattered energy',
        'Lack of focus',
        'Superficiality',
        'Exaggeration',
        'Inconsistency',
      ],
      lifeTheme: 'Expressing creativity and bringing joy through communication',
      lifeLesson:
        'Learning to focus your scattered energy and bring your creative projects to completion',
      compatibleNumbers: [1, 6, 9],
      luckyColors: ['Yellow', 'Pink'],
      luckyDays: ['Thursday', 'Friday'],
      personality:
        'Creative, expressive, and optimistic. You have a natural gift for communication and self-expression. You are social, enthusiastic, and enjoy bringing joy to others.',
      career:
        'Arts, writing, teaching, communication, entertainment. You excel in creative and expressive fields. You need freedom to express yourself and be appreciated for your talents.',
      relationships:
        'You are fun, expressive, and socially active. You bring joy and lightheartedness to relationships. You must avoid superficiality and work on emotional depth.',
    },
    {
      number: 4,
      name: 'Number 4 - The Builder',
      description:
        'Number 4 is the builder and organizer. It represents stability, structure, and hard work. Those with Life Path 4 are dependable and practical.',
      meaning:
        'The number 4 is about structure, stability, and building solid foundations. It is practical, methodical, and grounded. Life Path 4 individuals are meant to create security and order.',
      traits: [
        'Stability',
        'Structure',
        'Hard work',
        'Practicality',
        'Dependability',
        'Organization',
        'Honesty',
      ],
      strengths: [
        'Reliability',
        'Practicality',
        'Organization',
        'Hard work',
        'Honesty',
        'Stability',
      ],
      weaknesses: [
        'Rigidity',
        'Stubbornness',
        'Limitation',
        'Dullness',
        'Lack of flexibility',
      ],
      lifeTheme: 'Building solid foundations and creating security',
      lifeLesson:
        'Learning to be flexible and embrace change while maintaining your stability and groundedness',
      compatibleNumbers: [2, 6, 8],
      luckyColors: ['Green', 'Blue'],
      luckyDays: ['Thursday', 'Friday'],
      personality:
        'Practical, reliable, and hardworking. You are organized, methodical, and value stability. You are honest, dependable, and build strong foundations.',
      career:
        'Engineering, administration, construction, finance. You excel in structured environments that reward hard work and reliability. You need clear systems and organization.',
      relationships:
        'You are steady, reliable, and devoted. You provide stability and security. You can be stubborn and must learn to be more flexible and spontaneous.',
    },
    {
      number: 5,
      name: 'Number 5 - The Adventurer',
      description:
        'Number 5 is the adventurer and freedom-lover. It represents change, adaptability, and versatility. Those with Life Path 5 seek variety and new experiences.',
      meaning:
        'The number 5 is about freedom, change, and adventure. It is versatile, curious, and dynamic. Life Path 5 individuals are meant to explore, experience, and adapt.',
      traits: [
        'Freedom',
        'Adventure',
        'Versatility',
        'Adaptability',
        'Curiosity',
        'Energy',
        'Restlessness',
      ],
      strengths: [
        'Adaptability',
        'Versatility',
        'Curiosity',
        'Energy',
        'Resourcefulness',
        'Social',
      ],
      weaknesses: [
        'Restlessness',
        'Inconsistency',
        'Irresponsibility',
        'Impulsiveness',
        'Instability',
      ],
      lifeTheme: 'Experiencing freedom and embracing change',
      lifeLesson:
        'Learning to channel your restlessness into productive pursuits and develop focus and stability',
      compatibleNumbers: [1, 3, 7],
      luckyColors: ['Blue', 'Green'],
      luckyDays: ['Wednesday', 'Friday'],
      personality:
        'Adventurous, versatile, and freedom-loving. You have a natural curiosity and love trying new things. You are adaptable, energetic, and enjoy variety.',
      career:
        'Sales, travel, journalism, entertainment, entrepreneurship. You need variety and stimulation in your work. Routine jobs will make you restless and unhappy.',
      relationships:
        'You need freedom and variety in relationships. You are fun, social, and adventurous. You must avoid commitment issues and learn to balance freedom with stability.',
    },
    {
      number: 6,
      name: 'Number 6 - The Nurturer',
      description:
        'Number 6 is the nurturer and caregiver. It represents responsibility, service, and love. Those with Life Path 6 are natural healers and caregivers.',
      meaning:
        'The number 6 is about responsibility, care, and service. It is loving, nurturing, and family-oriented. Life Path 6 individuals are meant to nurture, heal, and serve others.',
      traits: [
        'Responsibility',
        'Nurturing',
        'Love',
        'Service',
        'Compassion',
        'Family-oriented',
        'Harmony',
      ],
      strengths: [
        'Responsibility',
        'Compassion',
        'Nurturing',
        'Loyalty',
        'Love',
        'Harmony-seeking',
      ],
      weaknesses: [
        'Self-sacrifice',
        'Worry',
        'Control',
        'Dependence',
        'Meddling',
      ],
      lifeTheme: 'Service, responsibility, and unconditional love',
      lifeLesson:
        'Learning to balance serving others with taking care of yourself and setting healthy boundaries',
      compatibleNumbers: [2, 3, 4, 9],
      luckyColors: ['Green', 'Blue'],
      luckyDays: ['Wednesday', 'Friday'],
      personality:
        'Nurturing, responsible, and compassionate. You care deeply about family and those in need. You are a natural caregiver and healer. You seek harmony and peace.',
      career:
        'Healthcare, counseling, teaching, social work, caregiving. You excel in roles that allow you to serve and help others. You need meaningful work that contributes to others.',
      relationships:
        'You are devoted, loving, and deeply committed to family. You are the caregiver and peacekeeper. You must avoid self-sacrifice and set healthy boundaries.',
    },
    {
      number: 7,
      name: 'Number 7 - The Seeker',
      description:
        'Number 7 is the seeker and mystic. It represents spirituality, analysis, and introspection. Those with Life Path 7 are natural philosophers and spiritual seekers.',
      meaning:
        'The number 7 is about spirituality, wisdom, and introspection. It is analytical, intuitive, and mysterious. Life Path 7 individuals are meant to seek truth and spiritual understanding.',
      traits: [
        'Spirituality',
        'Analysis',
        'Intuition',
        'Wisdom',
        'Introspection',
        'Mystery',
        'Contemplation',
      ],
      strengths: [
        'Intuition',
        'Analysis',
        'Wisdom',
        'Spirituality',
        'Intelligence',
        'Insight',
      ],
      weaknesses: [
        'Isolation',
        'Cynicism',
        'Overthinking',
        'Skepticism',
        'Secretiveness',
      ],
      lifeTheme: 'Spiritual awakening and seeking truth',
      lifeLesson:
        'Learning to share your spiritual insights with others and balance introspection with engagement in the world',
      compatibleNumbers: [2, 5, 7],
      luckyColors: ['Purple', 'Blue'],
      luckyDays: ['Saturday', 'Sunday'],
      personality:
        'Spiritual, analytical, and introspective. You have a natural intuition and seek deeper truths. You are intelligent, thoughtful, and enjoy solitude for reflection.',
      career:
        'Research, spirituality, psychology, academia, mysticism. You excel in fields that allow for deep thinking and spiritual exploration. You need time for introspection.',
      relationships:
        'You are private, deep, and spiritual. You seek meaningful connections with others who understand your spiritual nature. You can be withdrawn and must work on intimacy.',
    },
    {
      number: 8,
      name: 'Number 8 - The Achiever',
      description:
        'Number 8 is the achiever and powerhouse. It represents abundance, power, and material success. Those with Life Path 8 are natural leaders in business.',
      meaning:
        'The number 8 is about power, abundance, and material success. It is ambitious, confident, and action-oriented. Life Path 8 individuals are meant to achieve and manifest abundance.',
      traits: [
        'Ambition',
        'Power',
        'Success',
        'Confidence',
        'Abundance',
        'Leadership',
        'Materialism',
      ],
      strengths: [
        'Ambition',
        'Power',
        'Leadership',
        'Financial acumen',
        'Confidence',
        'Manifesting',
      ],
      weaknesses: [
        'Materialism',
        'Ruthlessness',
        'Obsession with power',
        'Greed',
        'Arrogance',
      ],
      lifeTheme: 'Achieving success and manifesting abundance',
      lifeLesson:
        'Learning that true power comes from integrity and using your power for good, not just personal gain',
      compatibleNumbers: [2, 4, 6],
      luckyColors: ['Black', 'Purple'],
      luckyDays: ['Saturday', 'Thursday'],
      personality:
        'Ambitious, powerful, and success-oriented. You have strong leadership abilities and natural talent for business. You are confident and driven to achieve material success.',
      career:
        'Business, finance, management, executive roles. You excel in positions of power and authority. You are natural leaders with strong business acumen.',
      relationships:
        'You are powerful, driven, and success-oriented. You seek a partner who respects your ambition. You must balance career with personal relationships.',
    },
    {
      number: 9,
      name: 'Number 9 - The Humanitarian',
      description:
        'Number 9 is the humanitarian and completion number. It represents compassion, wisdom, and universal love. Those with Life Path 9 are natural healers of the world.',
      meaning:
        'The number 9 is about completion, compassion, and universal understanding. It is wise, compassionate, and idealistic. Life Path 9 individuals are meant to serve humanity and bring healing.',
      traits: [
        'Compassion',
        'Wisdom',
        'Humanitarianism',
        'Universal love',
        'Idealism',
        'Forgiveness',
        'Completion',
      ],
      strengths: [
        'Compassion',
        'Wisdom',
        'Humanitarianism',
        'Idealism',
        'Forgiveness',
        'Global perspective',
      ],
      weaknesses: [
        'Scattered energy',
        'Lack of boundaries',
        'Idealistic naivety',
        'Emotional overwhelm',
        'Melancholy',
      ],
      lifeTheme: 'Compassion, universal love, and serving humanity',
      lifeLesson:
        'Learning to focus your scattered energy and complete your projects while maintaining your compassion for all',
      compatibleNumbers: [3, 6, 9],
      luckyColors: ['Red', 'Purple'],
      luckyDays: ['Tuesday', 'Friday'],
      personality:
        'Compassionate, wise, and humanitarian. You have universal love and deep compassion. You are idealistic and want to make the world a better place.',
      career:
        'Humanitarian work, teaching, healing, counseling, social service. You excel in roles that allow you to serve and help others. You are motivated by meaningful work.',
      relationships:
        'You are compassionate, forgiving, and universally loving. You seek deep, meaningful connections. You must learn to set boundaries and focus your energy.',
    },
    {
      number: 11,
      name: 'Master Number 11 - The Illuminator',
      description:
        'Master Number 11 is the illuminator and spiritual messenger. It represents intuition, insight, and spiritual awakening. Those with 11 are natural spiritual guides.',
      meaning:
        'The master number 11 is about intuition, inspiration, and spiritual insight. It is the number of the visionary and the spiritual awakener. 11 individuals are meant to illuminate and guide others spiritually.',
      traits: [
        'Intuition',
        'Inspiration',
        'Spiritual insight',
        'Sensitivity',
        'Idealism',
        'Visionary',
        'Illumination',
      ],
      strengths: [
        'Intuition',
        'Spiritual insight',
        'Inspiration',
        'Idealism',
        'Vision',
        'Sensitivity',
      ],
      weaknesses: [
        'Nervousness',
        'Oversensitivity',
        'Impracticality',
        'Self-doubt',
        'Instability',
      ],
      lifeTheme: 'Spiritual awakening and intuitive guidance',
      lifeLesson:
        'Learning to ground your spiritual insights and manifest them in the physical world for the benefit of others',
      compatibleNumbers: [2, 4, 7],
      luckyColors: ['Purple', 'White'],
      luckyDays: ['Sunday', 'Monday'],
      personality:
        'Intuitive, spiritual, and idealistic. You are sensitive to the spiritual realm and have natural psychic abilities. You are a spiritual messenger and guide.',
      career:
        'Spirituality, counseling, healing, psychology, coaching. You excel in roles that allow you to guide and inspire others. You need meaningful spiritual work.',
      relationships:
        'You are intuitive, spiritual, and deeply sensitive. You seek meaningful spiritual connection. You can be nervous and must work on grounding and practical expression.',
    },
    {
      number: 22,
      name: 'Master Number 22 - The Master Builder',
      description:
        'Master Number 22 is the master builder. It represents the ability to turn dreams into reality on a large scale. Those with 22 are natural manifesto-makers.',
      meaning:
        'The master number 22 is about manifesting visions into reality. It is the highest vibrational number with the greatest potential. 22 individuals are meant to build and manifest on a grand scale.',
      traits: [
        'Manifestation',
        'Vision',
        'Leadership',
        'Practicality',
        'Ambition',
        'Building',
        'Master energy',
      ],
      strengths: [
        'Vision',
        'Manifestation ability',
        'Leadership',
        'Practicality',
        'Ambition',
        'Building',
      ],
      weaknesses: [
        'Overwhelm',
        'Perfectionism',
        'Stubbornness',
        'Burden of responsibility',
        'Skepticism',
      ],
      lifeTheme: 'Manifesting grand visions and building legacy',
      lifeLesson:
        'Learning to trust your vision and balance your idealism with practical action to create lasting change',
      compatibleNumbers: [4, 6, 8],
      luckyColors: ['Purple', 'Blue'],
      luckyDays: ['Thursday', 'Saturday'],
      personality:
        'Visionary, practical, and ambitious. You have the rare ability to turn dreams into large-scale reality. You are a natural leader with master-level capabilities.',
      career:
        'Large-scale projects, entrepreneurship, leadership, architecture. You excel in roles that allow you to build and create on a grand scale with lasting impact.',
      relationships:
        'You are ambitious and visionary. You seek a partner who supports your grand dreams. You must balance work with personal relationships.',
    },
    {
      number: 33,
      name: 'Master Number 33 - The Master Teacher',
      description:
        'Master Number 33 is the master teacher and healer. It represents compassion on a universal scale and spiritual teaching. Those with 33 are natural teachers and healers.',
      meaning:
        'The master number 33 is about compassion, teaching, and healing on a universal level. It is the highest expression of love and compassion. 33 individuals are meant to teach and heal on a global scale.',
      traits: [
        'Compassion',
        'Teaching',
        'Healing',
        'Love',
        'Idealism',
        'Service',
        'Master healer',
      ],
      strengths: [
        'Compassion',
        'Teaching ability',
        'Healing',
        'Love',
        'Idealism',
        'Service',
      ],
      weaknesses: [
        'Self-sacrifice',
        'Overwhelm',
        'Difficulty saying no',
        'Unrealistic idealism',
        'Exhaustion',
      ],
      lifeTheme: 'Compassionate teaching and universal healing',
      lifeLesson:
        'Learning to balance serving others with self-care and recognizing that you cannot heal everyone',
      compatibleNumbers: [3, 6, 9],
      luckyColors: ['Blue', 'Pink'],
      luckyDays: ['Wednesday', 'Friday'],
      personality:
        'Supremely compassionate, loving, and idealistic. You are a natural teacher and healer with a calling to serve humanity. You radiate love and compassion.',
      career:
        'Teaching, healing, spiritual work, counseling, humanitarian projects. You are drawn to meaningful work that serves humanity on a large scale.',
      relationships:
        'You are deeply loving, compassionate, and idealistic. You seek to heal and teach through relationships. You must learn to set boundaries and value yourself.',
    },
  ];

  for (const num of numerology) {
    await prisma.numerologyInfo.create({
      data: num as any,
    });
  }

  console.log('✓ Numerology seeded');

  console.log(
    '✅ All reference data seeded successfully! Ready to calculate user data.'
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });