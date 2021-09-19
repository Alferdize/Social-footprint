import { Component, OnInit } from '@angular/core';
import { BlockData } from './block-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  blocks: BlockData[];

  ngOnInit() {
    this.blocks = [];
  }

  addCard() {
    console.log("here")
    this.blocks.push({
      blockHash: Math.random().toString(36).substring(2),
      blockNumber: this.blocks.length + 1,
      previousBlock: "0000",
      transactions: [
        {
          sender: 'sender',
          recipient: 'recipient',
          amount: 1,
          fee: 200
        }
      ]
    });
  }

  clearCards() {
    this.blocks.length = 0;
  }

}
