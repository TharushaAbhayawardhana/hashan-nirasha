export const WEDDING_DATE = new Date('2026-09-24T10:00:00');

export const COUPLE = {
  groom: 'Hashan',
  bride: 'Nirasha',
  hashtag: '#HashanAndNirasha',
};

export const VENUE = {
  name: 'The Royal Rose Garden Estate',
  address: '45 Blossom Lane, Colombo 07',
  mapUrl: 'https://maps.google.com',
  ceremony: {
    time: '10:00 AM',
    location: 'Rose Garden Pavilion',
  },
  reception: {
    time: '6:00 PM',
    location: 'Grand Ballroom',
  },
};

export const FAMILY = [
  {
    side: "Groom's Family",
    members: [
      { name: 'Mr. & Mrs. Perera', relation: "Hashan's Parents" },
      { name: 'Sachini Perera', relation: "Sister of the Groom" },
      { name: 'Kasun Perera', relation: "Brother of the Groom" },
    ],
  },
  {
    side: "Bride's Family",
    members: [
      { name: 'Mr. & Mrs. Silva', relation: "Nirasha's Parents" },
      { name: 'Dinusha Silva', relation: "Sister of the Bride" },
      { name: 'Nuwan Silva', relation: "Brother of the Bride" },
    ],
  },
];
