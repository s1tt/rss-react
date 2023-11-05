export interface IPagination {
  setCurrentPage: (num: number) => void;
  totalCards: number;
  perPage: number;
  currentPage: number;
}
