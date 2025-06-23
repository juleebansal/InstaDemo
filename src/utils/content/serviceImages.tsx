import { Body, FullFace, Brow, logo, Back, Arm, Nose, Lip, Leg, Butt, Eyebrow, Chin, Sideburn, Cheeks, Ears, BrazilianCat, Stomach, Chest, Arms } from '../../assets/Images';

type ServiceImageMap = {
  [key: string]: any;
};

export const SERVICE_IMAGES: ServiceImageMap = {
  body: Body,
  'full face': FullFace,
  face: FullFace,
  brow: Brow,
  brazilian: BrazilianCat,
  leg: Leg,
  back: Back,
  arm: Arm,
  'arm + underarm': Arms,
  underarm: Arms,
  nose: Nose,
  lip: Lip,
  butt: Butt,
  'back + shoulder': Back,
  eyebrows: Eyebrow,
  chin: Chin,
  'sideburn + hairline': Sideburn,
  cheek: Cheeks,
  ear: Ears,
  chest: Chest,
  stomach: Stomach,
};

export const getServiceImage = (serviceName: string) => {
  if (!serviceName) return logo;
  const normalizedKey = serviceName.toLowerCase();
  return SERVICE_IMAGES[normalizedKey] || logo;
};