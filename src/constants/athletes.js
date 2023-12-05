
import AmericanFootballImage from '../assets/american_football_men.webp';

export const ATHLETES_HEADER_TEXT = 'ATHLETS';
export const ATHLETES_PREVIEW_IMG = AmericanFootballImage;
export const ATHLETES_IMAGE_CONFIG = {
  sm: {
    lineBg: {
      top: '8px',
      left: 'calc(50% - 10px)',
      height: '70%'
    },
    image: {
      height: '281px'
    }
  },
  md: {
    lineBg: {
      top: '8px',
      left: 'calc(50% - 57px)',
      height: '70%'
    },
    image: {
      height: '699px'
    }
  }
};
export const ATHLETES_PLUS_DISPLAY_CONFIG = {
  sm: true,
  md: true,
  lg: false,
};
export const ATHLETES_LINE_DISPLAY_CONFIG = {
  sm: true,
  md: true,
  lg: false,
};
export const ATHLETES_ITEMS = [
  {
    title: 'CONNECTION',
    description: 'Connect with coaches directly, you can ping coaches to view profile.',
    bgColor: '#FFFFFF'
  },
  {
    title: 'COLLABORATION',
    description: 'Work with other student athletes to increase visability. When you share and like other players videos it will increase your visability as a player. This is the team work aspect to Surface 1.',
    bgColor: '#F5F4F9'
  },
  {
    title: 'GROWTH',
    description: 'Resources and tools for you to get better as a student Athelte. Access to training classes, tutor sessions, etc',
    bgColor: '#5E3DB3'
  },
];