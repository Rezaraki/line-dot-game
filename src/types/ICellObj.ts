import { TDirections } from './TDirections';
import { TUsers } from './TUsers';

export interface ICellObj {
  id: number;
  completedUser: number | null;
  completed: boolean;

  neighbours: Record<TDirections, boolean>;
  lines: Record<TDirections, boolean>;

  row: number;
  col: number;

  updateLine(direction: TDirections, user: TUsers, updateTo?: boolean): void;
}
