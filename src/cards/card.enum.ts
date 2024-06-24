export enum cardType {
  MONSTER = 'monster',
  SPELL = 'spell',
  TRAP = 'trap',
}

export enum cardElement {
  FIRE = 'fire',
  WATER = 'water',
  EARTH = 'earth',
  WIND = 'wind',
  LIGHT = 'light',
  DARK = 'dark',
  NEUTRAL = 'neutral',
}

export interface CardCost {
  [key: string]: number;
}
