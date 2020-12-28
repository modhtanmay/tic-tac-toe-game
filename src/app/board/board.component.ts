import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

    squares: any[];
    xIsNext: boolean;
    winner: string;

    constructor() { }

    ngOnInit(): void {
        this.newGame();
    }

    newGame() {
        this.squares = Array(9).fill(null);
        this.winner = null;
        this.xIsNext = true;
    }

    // XisNext determines which player is currently using the GameBoard
    get player() {
        return this.xIsNext ? 'X' : 'O';
    }

    // method serve as a event handler - when user clicks on one of the buttons to make a move
    // when that click event happens we will chack the index in the array that they clicked on
    // if that square is already been clicked then we wont do anything
    // if its empty or null then we will splice in the index of the square user clicked on with the current player
    makeMove(idx: number) {
        if (!this.squares[idx]) {
            this.squares.splice(idx, 1, this.player);
            this.xIsNext = !this.xIsNext;
        }

        this.winner = this.calculateWinner();
    }


    calculateWinner() {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (
                this.squares[a] &&
                this.squares[a] === this.squares[b] &&
                this.squares[a] === this.squares[c]
            ) {
                return this.squares[a];
            }
        }
        return null;
    }
}
