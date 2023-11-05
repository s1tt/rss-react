export type BeerCardProps = {
  id: number;
  title: string;
  img: string;
  description: string;
  setIsOutletOpened: (bool: boolean) => void;
  isOutletOpened: boolean;
};
