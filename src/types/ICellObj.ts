export interface ICellObj {
  id: number;
  completedUser: number | null;
  completed: boolean;

  neighbours: Record<TDirections, boolean>;
  lines: Record<TDirections, boolean>;

  row: number;
  col: number;
}
