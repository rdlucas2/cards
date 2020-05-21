import { Card } from './Card';

export interface CardView {
    render(card: Card): void;
}