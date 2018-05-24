import {Component, Input, OnInit} from '@angular/core';
import {BandaService} from "../entities/banda";
import {Principal, User} from "../shared";

@Component({
  selector: 'rocktionary-bar-rating',
  templateUrl: './bar-rating.component.html'
})
export class BarRatingComponent implements OnInit {

  @Input() bandaName: string;

  public rate: number;
  public puntuationSuccess: boolean;

  constructor(private bandaService: BandaService, private principal: Principal) { }

  ngOnInit() {
      this.bandaService.getRating()
          .subscribe(res => this.rate = Number(res))
  }

  onRateChange (newRating) {
      this.bandaService.updateRating(newRating, this.bandaName)
          .subscribe(response => {
              this.puntuationSuccess = true;
              setTimeout(() => this.puntuationSuccess = false, 1500)
          })
  }

}
